import OrderModel from '@/models/Order';
import Stripe from 'stripe';
import nodemailer from "nodemailer";
import dbConnect from '@/lib/dbConnect';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
   await dbConnect();
    try {
        const body = await req.json();
        const { sessionId } = body;

        if (!sessionId) {
            return new Response(JSON.stringify({ success: false, message: "Missing session ID" }), { status: 400 });
        }


        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const paymentIntentId = session.payment_intent;

        

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      


        const customerEmail = session.customer_details?.email;
            const order = await OrderModel.findOne({
            "shippingData.email": customerEmail,
            paymentStatus: "pending",
            });

            if (!order) {
            console.warn("Order not found for completed session:", session.id);
            return;
            }

        if (paymentIntent.status === 'succeeded') {
            order.paymentStatus = "succeeded";
            await order.save();


            const transporter = nodemailer.createTransport({
                service: "Gmail", // or use host, port, etc. for other services
                auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS,
                },
              });


            await transporter.sendMail({
      from: `"Thaseen Collection" <${process.env.EMAIL_USER}>`,
      to: customerEmail, 
      subject: "New Order Message",
   html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2 style="color: #2563eb; border-bottom: 1px solid #ddd; padding-bottom: 10px;">🛍️ Thank You for Your Order!</h2>
      
      <p style="font-size: 16px; margin-top: 20px;">Hi <strong>${order.shippingData.name}</strong>,</p>
      <p style="font-size: 16px;">Thank you for shopping with <strong>Thaseen Collection</strong>! We’re excited to let you know that we’ve received your order.</p>
      
      <table style="width: 100%; margin-top: 20px;">
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">Order ID:</td>
          <td style="padding: 8px 0;">T-${order.orderId}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">Customer Email:</td>
          <td style="padding: 8px 0;">${customerEmail}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 16px;">
        We'll send another email once your order is shipped. In the meantime, if you have any questions, feel free to reply to this message.
      </p>

      <p style="margin-top: 30px; font-size: 14px; color: #888;">Thanks again, <br/>The Thaseen Collection Team</p>
    </div>
  </div>
`


    });
            return new Response(JSON.stringify({ success: true, message: 'Payment succeeded', order, paymentIntent }), { status: 200 });
        } else if (['requires_action', 'requires_payment_method'].includes(paymentIntent.status)) {
            order.paymentStatus = "failed";
            await order.save();
            return new Response(JSON.stringify({ success: false, message: 'Payment requires further action', paymentIntent }), { status: 400 });
        } else {
            order.paymentStatus = "failed";
            await order.save();
            return new Response(JSON.stringify({ success: false, message: 'Payment not successful', paymentIntent }), { status: 200 });
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}

import OrderModel from '@/models/Order';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
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

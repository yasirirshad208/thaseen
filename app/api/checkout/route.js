// import OrderModel from "@/models/Order";
// import Stripe from "stripe";


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2023-10-16",
// });

// export async function POST(req) {
//   try {
//     const { cart, shippingData, totalAmount } = await req.json();


//     const order = await OrderModel.create({
//       shippingData: shippingData,
//       cart:cart,
//       totalAmount: totalAmount,
//       paymentStatus: 'pending',
//     });

   
//     const cartMetadata = JSON.stringify(cart).slice(0, 490);


//     const lineItems = cart.map((item) => ({
//       price_data: {
//         currency: "aed",
//         product_data: {
//           name: item.name.slice(0, 99), // Trimmed name
//           images: item.imageSrc ? [item.imageSrc] : [],
//           metadata: {
//             productId: item.id,
//             size: item.size ? item.size.slice(0, 50) : "N/A",
//             measurements: JSON.stringify(item.measurements || {}).slice(0, 99),
//             additionalInstructions: item.additionalInstructions
//               ? item.additionalInstructions.slice(0, 99)
//               : "N/A",
//           },
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));


//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       billing_address_collection: "required",
//       shipping_address_collection: { allowed_countries: [      "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ",
//         "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS",
//         "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO",
//         "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER",
//         "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL",
//         "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID",
//         "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI",
//         "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV",
//         "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT",
//         "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU",
//         "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA",
//         "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL",
//         "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ",
//         "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA",
//         "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"] },
//       phone_number_collection: { enabled: true },
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/canceled`,
//       metadata: {
//         cart: cartMetadata, 
//       },
//     });

//     return new Response(JSON.stringify({ url: session.url }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Error creating Stripe Checkout session:", err.message);
//     return new Response(JSON.stringify({ error: err.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }



// // export const config = {
// //   api: {
// //       bodyParser: false,
// //   },
// // };


// export const routeSegmentConfig = {
//   api: {
//       bodyParser: false,
//   },
// };


// export async function POST(req, res) {
//   if (req.method === 'POST') {
//       let event;

//       const buf = await buffer(req);
//       const sig = req.headers['stripe-signature'];

//       try {
//           event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET);
//       } catch (err) {
//           console.error(`Webhook Error: ${err.message}`);
//           return res.status(400).send(`Webhook Error: ${err.message}`);
//       }

//       if (event.type === 'checkout.session.completed') {
//           const session = event.data.object;
//           await handleCompletedCheckoutSession(session);
//           res.json({ received: true });
//       } else {
//           console.warn(`Unhandled event type ${event.type}`);
//           res.json({ received: true });
//       }
//   } else {
//       res.setHeader('Allow', 'POST');
//       res.status(405).end('Method Not Allowed');
//   }
// }



// async function handleCompletedCheckoutSession(session) {
//   try {
//       console.log('Checkout session completed:', session);
//       await saveOrder(session);
//       await notifyCustomer(session);
//   } catch (err) {
//       console.error('Error in handling checkout session:', err);
//       throw err;
//   }
// }




import OrderModel from "@/models/Order";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  try {
    const { cart, shippingData, totalAmount } = await req.json();

    // Save the order to MongoDB
     await OrderModel.create({
      shippingData,
      cart,
      totalAmount,
      paymentStatus: 'pending',
    });

    // Limit cart data to fit Stripe metadata size
    const cartMetadata = JSON.stringify(cart).slice(0, 490);

    // Prepare line items for Stripe Checkout
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "aed",
        product_data: {
          name: item.name.slice(0, 99),
          images: item.imageSrc ? [item.imageSrc] : [],
          metadata: {
            productId: item.id,
            size: item.size ? item.size.slice(0, 50) : "N/A",
            measurements: JSON.stringify(item.measurements || {}).slice(0, 99),
            additionalInstructions: item.additionalInstructions
              ? item.additionalInstructions.slice(0, 99)
              : "N/A",
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: [
          "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ",
          "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS",
          "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO",
          "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER",
          "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL",
          "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID",
          "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI",
          "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV",
          "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT",
          "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU",
          "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA",
          "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL",
          "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ",
          "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA",
          "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"
        ]
      },
      phone_number_collection: { enabled: true },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/canceled`,
      metadata: {
        cart: cartMetadata,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Error creating Stripe Checkout session:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Disable Next.js bodyParser for this route to allow raw Stripe webhooks if needed
export const routeSegmentConfig = {
  api: {
    bodyParser: false,
  },
};

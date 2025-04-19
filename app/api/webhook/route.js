// import Stripe from 'stripe';


// app.use(require('body-parser').text({type: '*/*'}));

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// app.post('/webhook', function(request, response) {
//   const sig = request.headers['stripe-signature'];
//   const body = request.body;

//   let event = null;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     // invalid signature
//     response.status(400).end();
//     return;
//   }

//   let intent = null;
//   switch (event['type']) {
//     case 'payment_intent.succeeded':
//       intent = event.data.object;
//       console.log("Succeeded:", intent.id);
//       break;
//     case 'payment_intent.payment_failed':
//       intent = event.data.object;
//       const message = intent.last_payment_error && intent.last_payment_error.message;
//       console.log('Failed:', intent.id, message);
//       break;
//   }

//   response.sendStatus(200);
// });




import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe webhook handler
export async function POST(req) {
  const sig = req.headers.get('stripe-signature');

  let event = null;

  // Read the raw body as a string
  const rawBody = await req.text();

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    // Invalid signature
    console.error('Webhook signature verification failed:', err);
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  // Handle the event
  let intent = null;
  switch (event.type) {
    case 'payment_intent.succeeded':
      intent = event.data.object;
      console.log("Payment succeeded:", intent.id);
      break;
    case 'payment_intent.payment_failed':
      intent = event.data.object;
      const message = intent.last_payment_error?.message;
      console.log('Payment failed:', intent.id, message);
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }

  // Return a response acknowledging receipt of the event
  return new Response('Event received', { status: 200 });
}


import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
    if (req.method === 'POST') {
        const { paymentIntentId } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({ error: 'PaymentIntentId is required' });
        }

        try {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            return res.status(200).json({ status: paymentIntent.status });
        } catch (error) {
            console.error("Error fetching payment intent from Stripe:", error);
            return res.status(500).json({ error: 'Failed to fetch payment intent' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}

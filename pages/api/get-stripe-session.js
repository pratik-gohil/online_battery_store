import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    res.status(200).json(session);
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}

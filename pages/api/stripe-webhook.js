import { buffer } from "micro";
import Cors from "micro-cors";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../fireabase.config";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function webhookHandler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.NEXT_PUBLIC_WEB_HOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const uid = session.client_reference_id;

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );

        await addDoc(collection(db, "orders"), {
          checkoutSessionId: session.id,
          shippingInfo: session.shipping,
          amountTotal: session.amount_total,
          paymentStatus: session.payment_status,
          products: lineItems.data,
          uid,
        });
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default cors(webhookHandler);

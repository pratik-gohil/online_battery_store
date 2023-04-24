import { buffer } from "micro";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../fireabase.config";

import Cors from "micro-cors";

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
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed.", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const uid = session.client_reference_id;

        addDoc(collection(db, "orders"), {
          checkoutSessionId: session.id,
          shippingInfo: session.shipping,
          amountTotal: session.amount_total,
          paymentStatus: session.payment_status,
          uid,
        });
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default cors(webhookHandler);

import { buffer } from "micro";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../fireabase.config";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let event;

    try {
      const whSec = process.env.NEXT_PUBLIC_WEB_HOOK_SECRET;
      const buf = await buffer(req);

      event = stripe.webhooks.constructEvent(
        buf,
        req.headers["stripe-signature"],
        whSec
      );
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed.", err.message);
      // res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const uid = session.client_reference_id;

        await addDoc(collection(db, "orders"), {
          checkoutSessionId: session.id,
          shippingInfo: session.shipping,
          amountTotal: session.amount_total,
          paymentStatus: session.payment_status,
          uid,
        });
      }
    }

    // const res = await stripe.checkout.sessions.retrieve();
    //   event.data.object.id
    //   {
    //     expand: ["line_items"],
    //   }
    // );

    // console.log(res);

    res.status(200).end();
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

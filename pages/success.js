import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const { setCartItems, setTotalPrice } = useStateContext();

  useEffect(async () => {
    if (!router.isReady) return;

    const session_id = router.query.session_id;

    if (!!session_id) {
      fetch(`/api/get-stripe-session?session_id=${session_id}`)
        .then((res) => res.json())
        .then((session) => setSession(session));
    }
  }, [router.isReady]);

  useEffect(() => {
    localStorage.removeItem("cart-items");
    setCartItems([]);
    setTotalPrice(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@online-battery-store.com">
            order@online-battery-store.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;

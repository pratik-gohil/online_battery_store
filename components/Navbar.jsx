import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../fireabase.config";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const { showCart, setShowCart, cartItems } = useStateContext();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(
      auth,
      provider.setCustomParameters({ prompt: "select_account" })
    )
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        window.dispatchEvent(new Event("user-change"));
        setTimeout(() => {
          router.push("/");
        }, 1500);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    window.addEventListener("user-change", () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    });
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    setShowCart(!!router.query.cartopen);
  }, [router.isReady]);

  return (
    <div className="navbar-container">
      <div>
        <Link href="/">
          <div className="logo">
            <img
              className="logo-img"
              src="/assets/logo.svg"
              width={80}
              height={80}
            />
            <img
              className="logo-txt"
              src="/assets/logo_text.svg"
              width={220}
              height={100}
            />
          </div>
        </Link>
      </div>

      <div className="navbar-right">
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping color="white" />
          <span className="cart-item-qty">{cartItems.length}</span>
        </button>

        {user ? (
          <img
            className="user-img"
            loading="lazy"
            src={user.image}
            referrerpolicy="no-referrer"
          />
        ) : (
          <div className="login-btn" onClick={handleLogin}>
            LOGIN
          </div>
        )}
      </div>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlineLogout,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
// import { useRouter } from "next/router";

import handleLogin from "../lib/login";
import usePopup from "../hooks/usePopup";

const Navbar = () => {
  // const router = useRouter();
  const [user, setUser] = useState();
  const { showCart, setShowCart, cartItems } = useStateContext();
  const profileImageRef = useRef();
  const profilePopupRef = useRef();
  const [showPopup] = usePopup(profilePopupRef, profileImageRef, [user]);

  // useEffect(() => {
  //   router.query.showcart = showCart;
  //   router.push(router);
  // }, [showCart]);

  // useEffect(() => {
  //   if (!router.isReady) return;

  //   setShowCart(!!router.query.showcart);
  // }, [router.isReady]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    window.addEventListener("user-change", () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    });
  }, []);

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
          <>
            <img
              className="user-img"
              loading="lazy"
              src={user.image}
              referrerPolicy="no-referrer"
              ref={profileImageRef}
            />
            <div
              ref={profilePopupRef}
              className={`popup ${showPopup ? "show" : "hide"}`}
            >
              <Link href="/profile">
                <a className="nav-popuop-link">
                  <span className="icon">
                    <AiOutlineUser />
                  </span>
                  <span className="text">Profile</span>
                </a>
              </Link>
              <Link href="/logout">
                <a className="nav-popuop-link">
                  <span className="icon">
                    <AiOutlineLogout />
                  </span>
                  <span className="text">Logout</span>
                </a>
              </Link>
            </div>
          </>
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

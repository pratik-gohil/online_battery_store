import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, cartItems } = useStateContext();

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
              src="/assets/old_logo.svg"
              width={220}
              height={100}
            />
          </div>
        </Link>
      </div>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping color="white" />
        <span className="cart-item-qty">{cartItems.length}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;

import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, cartItems } = useStateContext();

  return (
    <div className="navbar-container">
      <div style={{ width: "100px" }}>
        <Link href="/">
          <img
            src="/assets/logo.svg"
            className="logo"
            width={220}
            height={100}
          />
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

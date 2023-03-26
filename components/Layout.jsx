import React, { useEffect } from "react";
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateContext } from "../context/StateContext";

const Layout = ({ children }) => {
  const { showCart } = useStateContext();

  useEffect(() => {
    showCart
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showCart]);

  return (
    <div className={showCart || "layout"}>
      <Head>
        <title>Shivsai Batteries</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;

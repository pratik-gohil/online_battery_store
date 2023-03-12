import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Shivsai Batteries All rights reserverd</p>
      <p className="icons">
        <a
          target="_blank"
          href="https://www.instagram.com/shivsai_battries_67"
          rel="noopener noreferrer"
        >
          <AiFillInstagram />
        </a>
        {/* <AiOutlineTwitter /> */}
      </p>
    </div>
  );
};

export default Footer;

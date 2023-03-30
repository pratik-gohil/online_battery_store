import React, { useEffect, useState } from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlinePhone,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { client } from "../lib/client";

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState();

  useEffect(async () => {
    const socialLinksQuery = '*[_type == "social_links"]';
    const social_links = await client.fetch(socialLinksQuery);

    setSocialLinks(social_links[0]);
  }, []);

  return (
    <div className="footer-container">
      <p>2022 Shivsai Batteries All rights reserverd</p>
      <p className="icons">
        {socialLinks?.instagram && (
          <a
            target="_blank"
            href={socialLinks?.instagram}
            rel="noopener noreferrer"
          >
            <AiOutlineInstagram />
          </a>
        )}
        {socialLinks?.twitter && (
          <a
            target="_blank"
            href={socialLinks?.twitter}
            rel="noopener noreferrer"
          >
            <AiOutlineTwitter />
          </a>
        )}
        {socialLinks?.facebook && (
          <a
            target="_blank"
            href={socialLinks.facebook}
            rel="noopener noreferrer"
          >
            <AiOutlineFacebook />
          </a>
        )}
        {socialLinks?.whatsapp_number && (
          <a
            target="_blank"
            href={"https://wa.me/" + socialLinks.whatsapp_number}
            rel="noopener noreferrer"
          >
            <AiOutlineWhatsApp />
          </a>
        )}
        {socialLinks?.whatsapp_number && (
          <a href={"tel:+91" + socialLinks.whatsapp_number}>
            <AiOutlinePhone />
          </a>
        )}
      </p>
    </div>
  );
};

export default Footer;

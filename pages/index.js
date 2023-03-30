import React from "react";

import { client } from "../lib/client";
import { Product, Banner } from "../components";

const Home = ({ products, bannerData }) => (
  <div>
    <Banner bannerData={bannerData.length && bannerData[0]} />
    <div className="products-heading">
      <h1>Best Seller Products</h1>
      <i>The powerful battery range for the long-lasting performance</i>
    </div>

    <div className="products-container">
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>

    <div className="about-section">
      <img src="https://www.batteryboss.in/assets/images/about-us.png" />
      <div>
        <h1>Online Battery Store - Car & Inverter Batteries Online</h1>
        <p>
          Online-battery-shop.in a leading online battery store in India, is
          created as a simple and quick method for one to purchase batteries at
          competitive costs either online or via phone. Our costs quoted by web
          or by phone are completely inclusive of GST. We import batteries
          directly from the certified suppliers, enabling the consumer, you, to
          reap the benefits of not only exceptionally competitive costs but also
          by having direct access to superior quality products.
        </p>
        <p>
          We’re among the India’s fastest growing stored energy suppliers and
          we’re committed to supplying complete advice as well as an excellent
          product variety in a price point that is highly competitive.
        </p>
        <p>
          Purchasing a car battery with us could not be more easy, we plan to
          make the procedure straight forward and as easy as possible. We pride
          ourselves in supplying our quality products across a wide selection of
          applications and customers. We work hard to furnish an efficient
          service to all our customers, from large industrial organisations and
          battery wholesalers.
        </p>
      </div>
    </div>
  </div>
);

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;

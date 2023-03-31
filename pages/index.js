import React, { useEffect, useState } from "react";

import { client } from "../lib/client";
import { Product, Banner } from "../components";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

const Home = ({ products, bannerData }) => {
  const [searchLoading, setSearchLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    setSearchLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        const searchQuery = `*[_type == 'product' && name match '${searchTerm}**']`;
        const searchResult = await client.fetch(searchQuery);

        setSearchProducts(searchResult);
        setSearchLoading(false);
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div>
      <div className="search-wrapper">
        <div className="search-container">
          <AiOutlineSearch color="var(--secondary)" fontSize={20} />
          <input
            className="search-input"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value.trim())}
          />
        </div>
        {searchTerm && (
          <div className="search-products">
            {searchLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {searchProducts?.map((product) => (
                  <Link
                    key={product.slug.current}
                    href={`/product/${product.slug.current}`}
                  >
                    <p className="search-product">{product.name}</p>
                  </Link>
                ))}
                <p>
                  {searchTerm && !searchProducts?.length ? "Not Found" : ""}
                </p>
              </>
            )}
          </div>
        )}
      </div>
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
            created as a simple and quick method for one to purchase batteries
            at competitive costs either online or via phone. Our costs quoted by
            web or by phone are completely inclusive of GST. We import batteries
            directly from the certified suppliers, enabling the consumer, you,
            to reap the benefits of not only exceptionally competitive costs but
            also by having direct access to superior quality products.
          </p>
          <p>
            We’re among the India’s fastest growing stored energy suppliers and
            we’re committed to supplying complete advice as well as an excellent
            product variety in a price point that is highly competitive.
          </p>
          <p>
            Purchasing a car battery with us could not be more easy, we plan to
            make the procedure straight forward and as easy as possible. We
            pride ourselves in supplying our quality products across a wide
            selection of applications and customers. We work hard to furnish an
            efficient service to all our customers, from large industrial
            organisations and battery wholesalers.
          </p>
        </div>
      </div>
    </div>
  );
};

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

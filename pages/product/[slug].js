import React, { useEffect, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { calculateDiscount } from "../../lib/calculateDiscount";

const ProductDetails = ({ product, products }) => {
  const {
    image,
    name,
    details,
    price,
    rating: ratings,
    discount,
    capacity,
  } = product;
  const [rating, setRating] = useState(0);
  const totalStars = 5;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const [hasOldBattery, setHasOldBattery] = useState(false);

  useEffect(() => {
    setRating((ratings.reduce((a, r) => a + r, 0) / 3).toFixed(2));
  }, [ratings]);

  const handleAdd = () => {
    onAdd(
      {
        ...product,
        price: calculateDiscount(
          price,
          discount[hasOldBattery ? "with_old_battery" : "without_old_battery"]
        ).discount,
      },
      qty
    );
  };

  const handleBuyNow = () => {
    handleAdd();

    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              {[...new Array(totalStars)].map((_, i) => {
                return (
                  <span key={i}>
                    {i + 1 <= rating ? (
                      <BsStarFill />
                    ) : rating < i + 1 && rating > i ? (
                      <BsStarHalf />
                    ) : (
                      <BsStar />
                    )}
                  </span>
                );
              })}
            </div>
            <p>({ratings.length})</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p>
            <span className="price">
              ₹
              {
                calculateDiscount(
                  price,
                  discount[
                    hasOldBattery ? "with_old_battery" : "without_old_battery"
                  ]
                ).discount
              }
            </span>
            <br />
            <span className="old-price">
              Old Price: <span>₹{price}</span>
            </span>
            <br />
            <span>
              Save: ₹
              {
                calculateDiscount(
                  price,
                  discount[
                    hasOldBattery ? "with_old_battery" : "without_old_battery"
                  ]
                ).save
              }{" "}
              (
              {
                discount[
                  hasOldBattery ? "with_old_battery" : "without_old_battery"
                ]
              }
              %)
            </span>
          </p>
          <div className="with-battery-options">
            <span>Capacity: {capacity}AH</span>
            <br />
            <label>
              <input
                type="radio"
                name="with-battery"
                checked={hasOldBattery}
                onChange={() => setHasOldBattery(true)}
              />{" "}
              With Old Battery(same AH)
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="with-battery"
                checked={!hasOldBattery}
                onChange={() => setHasOldBattery(false)}
              />{" "}
              Without Old Battery
            </label>
          </div>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => handleAdd()}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;

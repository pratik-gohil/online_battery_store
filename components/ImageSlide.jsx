import React, { useEffect, useRef, useState } from "react";

function ImageSlide({ images }) {
  const slideRef = useRef();

  // useEffect(() => {
  //   let index = 0;
  //   const slideIntervaal = setInterval(() => {
  //     if (slideRef && slideRef.current && slideRef.current.clientWidth) {
  //       const slideWidth = slideRef.current.clientWidth;
  //       slideRef.current.scrollTo({
  //         left: slideWidth * index,
  //         behavior: index ? "smooth" : "instant",
  //       });
  //       index < images.length ? index++ : (index = 0);
  //     }
  //   }, 3000);

  //   return () => clearInterval(slideIntervaal);
  // }, []);

  return (
    <div className="image-slide" ref={slideRef}>
      {images &&
        images.map((image, i) => <img key={i} className="slide" src={image} />)}
    </div>
  );
}

export default ImageSlide;

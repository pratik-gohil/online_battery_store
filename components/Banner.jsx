import React, { useEffect, useState } from "react";

import { urlFor } from "../lib/client";
import ImageSlide from "./ImageSlide";

import BannerCss from "../styles/Banner.module.css";

import modelsJSON from "../public/json/models.json";

const Banner = ({ bannerData }) => {
  const [make, setMake] = useState(null);
  const [models, setModels] = useState(null);
  const [model, setModel] = useState(null);
  const [brand, setBrand] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const images = bannerData.image.map((banner) => urlFor(banner));

  useEffect(() => {
    setModels(modelsJSON[make]);
  }, [make]);

  const handleFind = () => {
    console.log();
  };

  const getCityByState = () => {
    switch (state) {
      case "Maharashtra":
        return (
          <>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Thane">Thane</option>
            <option value="Nashik">Nashik</option>
            <option value="Navi Mumbai">Navi Mumbai</option>
            <option value="Kalyan">Kalyan</option>
            <option value="Virar">Virar</option>
            <option value="Lonavala">Lonavala</option>
            <option value="Dombivali">Dombivali</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Barmati">Baramati</option>
            <option value="Kolhapur">Kolhapur</option>
            <option value="Uran">Uran</option>
          </>
        );
    }
  };

  return (
    <div className={BannerCss.banner_wrapper}>
      <div className="banner-container">
        <ImageSlide images={images} />
        <form className={BannerCss.search_form} onSubmit={handleFind}>
          <div>
            <label>Car Make *</label>
            <select
              name="make"
              id="make"
              onChange={(e) => setMake(e.target.value)}
              required
            >
              <option value="">Select Manufacturer</option>
              <option value="maruti-suzuki">Maruti Suzuki</option>
              <option value="tata-motors">Tata Motors</option>
              <option value="kia">KIA</option>
              <option value="mg-hector">MG HECTOR</option>
              <option value="hyundai">Hyundai</option>
              <option value="honda">Honda</option>
              <option value="volkswagen">Volkswagen</option>
              <option value="toyota">Toyota</option>
              <option value="mahindra">Mahindra</option>
              <option value="nissan">Nissan</option>
              <option value="renault">Renault</option>
            </select>
          </div>
          <div>
            <label>Car Model *</label>
            <select
              name="model"
              id="model"
              onChange={(e) => setModel(e.target.value)}
              required
            >
              <option value="">Select Model</option>
              {models?.map((model) => (
                <option key={model.slug} value={model.make_name}>
                  {model.make_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Battery Brand</label>
            <select
              name="brand"
              id="bbrand"
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">All Brand</option>
              <option value="2">Amaron</option>
              <option value="1">Exide </option>
              <option value="144">PowerZONE</option>
              <option value="202">SF Sonic</option>
              <option value="145">Dynex (Manufacturing by Exide Ind)</option>
              <option value="24">AC Delco</option>
              <option value="219">BOSCH</option>
              <option value="125">Livfast</option>
            </select>
          </div>
          <div>
            <label>State *</label>
            <select
              name="state"
              id="bstate"
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              {/* <option value="Delhi">Delhi</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Telangana">Telangana</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Haryana">Haryana</option>
            <option value="Jarkhand">Jharkhand</option>
            <option value="Gujrat">Gujarat</option>
            <option value="Goa">Goa</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Tamil Nadu">Tamil Nadu</option> */}
            </select>
          </div>
          <div>
            <label>City *</label>
            <select
              name="city"
              id="bcity"
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Select City</option>
              {getCityByState()}
            </select>
          </div>
          <button type="submit" id="search-battery" className="btn">
            Find
          </button>
        </form>
      </div>
      <div className={BannerCss.banner_row}>
        <div>
          <div className={`${BannerCss.icon} ${BannerCss.icon_free}`}></div>
          <p>Free Shipping</p>
        </div>
        <div>
          <div
            className={`${BannerCss.icon} ${BannerCss.icon_installation}`}
          ></div>
          <p>Free Installation</p>
        </div>
        <div>
          <div className={`${BannerCss.icon} ${BannerCss.icon_prices}`}></div>
          <p>Best Prices</p>
        </div>
        <div>
          <div className={`${BannerCss.icon} ${BannerCss.icon_cash}`}></div>
          <p>Cash on Delivery</p>
        </div>
        <div>
          <div className={`${BannerCss.icon} ${BannerCss.icon_pay}`}></div>
          <p>Pay by Credit card</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;

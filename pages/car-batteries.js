import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { client } from "../lib/client";
import Product from "../components/Product";
import { getCityByState } from "../components/Banner";
import modelsJSON from "../public/json/models.json";

import BannerCss from "../styles/Banner.module.css";

function CarBatteries() {
  const router = useRouter();
  const [make, setMake] = useState(null);
  const [models, setModels] = useState(null);
  const [model, setModel] = useState(null);
  const [brand, setBrand] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [batteries, setBatteries] = React.useState([]);
  const {
    brand: queryBrand,
    model: queryModel,
    make: queryMake,
  } = router.query;

  useEffect(async () => {
    if (router.isReady) {
      const searchQuery = `*[_type == 'product' && name match '${queryBrand}' && '${queryMake}' in compatible_models]`;
      const searchResult = await client.fetch(searchQuery);

      setBatteries(searchResult);
    }
  }, [router.isReady]);

  useEffect(() => {
    setModels(modelsJSON[make]);
  }, [make]);

  return (
    <div className="car-batteries-container">
      <div className="main-section">
        <div className="car-batteries-filter-container">
          <form className={BannerCss.search_form} action="/car-batteries">
            <h4 className="filter-title">Filter by:</h4>
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
                <option value="amaron">Amaron</option>
                <option value="exide">Exide </option>
                <option value="power-zone">PowerZONE</option>
                <option value="sf-sonic">SF Sonic</option>
                <option value="dynex">
                  Dynex (Manufacturing by Exide Ind)
                </option>
                <option value="ac-delco">AC Delco</option>
                <option value="bosch">BOSCH</option>
                <option value="livfast">Livfast</option>
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
                {getCityByState(state)}
              </select>
            </div>
            <button type="submit" id="search-battery" className="btn btn-full">
              Find
            </button>
          </form>
        </div>
        <div>
          <h3>{queryModel} Batteries</h3>
          <div className="products-container">
            {batteries?.map((battery) => (
              <Product key={battery._id} product={battery} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarBatteries;

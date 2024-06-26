import React, { useState } from "react";
import Calculator from "./calculator";

function Trade() {
  const [obj, setObj] = useState({
    supply: "",
    demand: "",
    contractPrice: "",
    marketPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });
  };

  return (
    <>
      <h2 className="text-center my-4">Trade & Settlement Calculations</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div style={{ width: "25%" }} className="input_label_div">
          <div>
            <p>IPP Supply:</p>
            <input
              type="number"
              name="supply"
              placeholder="IPP Supply"
              onChange={handleChange}
              value={obj.supply}
            />{" "}
            MWh
          </div>
          <div>
            <p>RES Demand:</p>
            <input
              type="number"
              name="demand"
              placeholder="RES Demand"
              onChange={handleChange}
              value={obj.demand}
            />{" "}
            MWh
          </div>
          <div>
            <p>Contract Price:</p>
            <input
              type="number"
              name="contractPrice"
              placeholder="Contract Price"
              onChange={handleChange}
              value={obj.contractPrice}
            />{" "}
            €/MWh
          </div>
          <div>
            <p>Market Price:</p>
            <input
              type="number"
              name="marketPrice"
              placeholder="Market Price"
              onChange={handleChange}
              value={obj.marketPrice}
            />{" "}
            €/MWh
          </div>
        </div>
        <div style={{ width: "60%" }}>
          <Calculator obj={obj} />
        </div>
      </div>
    </>
  );
}

export default Trade;

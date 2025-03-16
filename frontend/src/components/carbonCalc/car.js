import React, { useState } from "react";
import { Button } from "../button";

const CarCarbonEmissionCalculator = () => {
  const [distance, setDistance] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [fuelType, setFuelType] = useState("petrol");
  const [carbonEmission, setCarbonEmission] = useState(null);

  const emissionFactors = {
    petrol: 2.31,
    diesel: 2.68,
    cng: 2.68,
    electric: 0,
  };

  const calculateEmission = () => {
    if (distance && fuelEfficiency && fuelType) {
      const emissionFactor = emissionFactors[fuelType];

      const emission =
        (parseFloat(distance) / parseFloat(fuelEfficiency)) * emissionFactor;

      setCarbonEmission(emission.toFixed(2));
    } else {
      setCarbonEmission(null);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        width: "30%",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}>
      <h4 style={{ color: "green", textAlign: "center" }}>CAR</h4>

      <label>Distance Traveled (km):</label>
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="Enter distance in km"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <label>Fuel Efficiency (km/l):</label>
      <input
        type="number"
        value={fuelEfficiency}
        onChange={(e) => setFuelEfficiency(e.target.value)}
        placeholder="Enter fuel efficiency in km/l"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <label>Fuel Type:</label>
      <select
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="cng">CNG</option>
        <option value="electric">Electric</option>
      </select>
      <Button clickHandler={calculateEmission} />

      {carbonEmission !== null && (
        <div
          style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
          <p>
            Carbon Emission:{" "}
            <span style={{ color: "#d9534f" }}>{carbonEmission} kg CO₂</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CarCarbonEmissionCalculator;

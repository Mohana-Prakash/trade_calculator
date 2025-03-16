import React, { useState } from "react";
import FlightEmissionCalculator from "./flight";
import CarCarbonEmissionCalculator from "./car";

function CarbonEmissionCalc() {
  const [calc, setCalc] = useState("flight");

  // Function to render selected calculator
  const renderCalculator = () => {
    switch (calc) {
      case "flight":
        return <FlightEmissionCalculator />;
      case "car":
        return <CarCarbonEmissionCalculator />;
      default:
        return <p>Please select a valid option.</p>;
    }
  };

  return (
    <div style={{ padding: "15px", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <h3>Carbon Emission Calculator</h3>
        <select
          style={{ margin: "0 10px 0" }}
          onChange={(e) => setCalc(e.target.value)}>
          <option value="flight">Flight</option>
          <option value="car">Car</option>
          <option value="ship">Shipment</option>
          <option value="train">Train</option>
        </select>
      </div>
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}>
        {renderCalculator()}
      </div>
    </div>
  );
}

export default CarbonEmissionCalc;

import React, { useState } from "react";
import { Button } from "../button";

const FlightEmissionCalculator = () => {
  const [distance, setDistance] = useState("");
  const [flightClass, setFlightClass] = useState("economy");
  const [passengers, setPassengers] = useState(1);
  const [emissions, setEmissions] = useState(null);

  // Updated Emission factors (kg CO₂ per passenger per km)
  const emissionFactors = {
    economy: 0.12, // Economy Class
    premiumEconomy: 0.16, // Premium Economy (Updated)
    business: 0.21, // Business Class (Updated)
    firstClass: 0.3, // First Class (Updated)
  };

  const RADIATIVE_FORCING_FACTOR = 1.9; // Accounts for high-altitude emissions

  const calculateEmissions = () => {
    if (!distance || distance <= 0 || passengers <= 0) {
      alert("Please enter valid values");
      return;
    }

    const factor = emissionFactors[flightClass];
    const totalEmissions =
      distance * factor * passengers * RADIATIVE_FORCING_FACTOR;

    setEmissions((totalEmissions / 1000).toFixed(4)); // Round to 2 decimal places
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
      <h4 style={{ color: "green", textAlign: "center" }}>FLIGHT</h4>

      <label>Flight Distance (km):</label>
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="Enter flight distance"
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <label>Flight Class:</label>
      <select
        value={flightClass}
        onChange={(e) => setFlightClass(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}>
        <option value="economy">Economy</option>
        <option value="premiumEconomy">Premium Economy</option>
        <option value="business">Business</option>
        <option value="firstClass">First Class</option>
      </select>

      <label>Number of Passengers:</label>
      <input
        type="number"
        value={passengers}
        onChange={(e) => setPassengers(e.target.value)}
        min="1"
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <Button clickHandler={calculateEmissions} />

      {emissions !== null && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          Estimated CO₂ Emissions: {emissions} tCO₂-e
        </div>
      )}
    </div>
  );
};

export default FlightEmissionCalculator;

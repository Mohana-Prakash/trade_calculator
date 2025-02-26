import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          if (position.coords.speed !== null) {
            setSpeed(position.coords.speed * 3.6); // Convert m/s to km/h
          }
        },
        (err) => {
          setError(err.message);
        },
        { enableHighAccuracy: true, maximumAge: 1000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>GPS Speedometer</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ReactSpeedometer
          maxValue={200}
          value={speed}
          startColor="green"
          endColor="red"
          segments={10}
          needleTransitionDuration={4000}
          needleTransition="easeElastic"
        />
      )}
      <p style={{ fontSize: "30px" }}>{speed}</p>
    </div>
  );
};

export default Speedometer;

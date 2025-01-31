import React, { useEffect, useState } from "react";
import "./App.css";
import Trade from "./components/trade";
import Navbar from "./components/nav";
import NewDash from "./components/newDash";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Unzip from "./components/unzip";
import axios from "axios";
import RadiusMeter from "./components/radiusMeter";
import Time_Zone_Clock from "./components/clock";
import CarbonEmissionCalc from "./components/carbonCalc";

function App() {
  // const [content, setContent] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/fetch-murli");
  //       console.log(response);
  //       setContent(response.data);
  //     } catch (error) {
  //       console.error("Error fetching the data", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Trade />} />
          <Route path="/ipp_res_dash" exact element={<NewDash />} />
          <Route path="/upzip_file" exact element={<Unzip />} />
          <Route path="/radius_meter" exact element={<RadiusMeter />} />
          <Route path="/clock" exact element={<Time_Zone_Clock />} />
          <Route
            path="/carbon_emission"
            exact
            element={<CarbonEmissionCalc />}
          />
        </Routes>
      </Router>
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ width: "49%", textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: content.tamil }}
        />
        <div
          style={{ width: "49%", textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: content.english }}
        />
      </div> */}
    </div>
  );
}

export default App;

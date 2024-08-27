import React from "react";
import "./App.css";
import Trade from "./components/trade";
import Navbar from "./components/nav";
import NewDash from "./components/newDash";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Unzip from "./components/unzip";
import Time_Zone_Clock from "./components/clock";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Trade />} />
        <Route path="/ipp_res_dash" exact element={<NewDash />} />
        <Route path="/upzip_file" exact element={<Unzip />} />
        <Route path="/clock" exact element={<Time_Zone_Clock />} />
      </Routes>
    </Router>
  );
}

export default App;

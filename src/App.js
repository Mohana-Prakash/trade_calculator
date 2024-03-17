import React from "react";
import "./App.css";
import Trade from "./components/trade";
import Navbar from "./components/nav";
import NewDash from "./components/newDash";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Trade />} />
        <Route path="/ipp_res_dash" exact element={<NewDash />} />
      </Routes>
    </Router>
  );
}

export default App;

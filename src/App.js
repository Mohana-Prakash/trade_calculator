import React from "react";
import "./App.css";
import Trade from "./components/trade";
import Navbar from "./components/nav";
import NewDash from "./components/newDash";

function App() {
  return (
    <>
      <Navbar />
      {/* <Trade /> */}
      <NewDash />
    </>
  );
}

export default App;

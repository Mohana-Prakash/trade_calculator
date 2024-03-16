import React from "react";
function Navbar() {
  return (
    <div className="nav_div">
      <div style={{ width: "12%" }}>
        <img src="./asset/logo.png" style={{ width: "100%" }} />
      </div>
      <div className="nav_menu">
        <p>Trade & Settlement</p>
        <p>P&L and VAR Calculation</p>
      </div>
    </div>
  );
}

export default Navbar;

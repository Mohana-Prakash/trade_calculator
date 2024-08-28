import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="nav_div">
      <div style={{ width: "12%" }}>
        <img src="./asset/logo.png" style={{ width: "100%" }} alt="" />
      </div>
      <div className="nav_menu">
        <p className="m-0">
          <Link to="/" className="nav_menu_link">
            Trade & Settlement
          </Link>
        </p>
        <p className="m-0">
          <Link to="/ipp_res_dash" className="nav_menu_link">
            P&L and VAR
          </Link>
        </p>
        <p className="m-0">
          <Link to="/radius_meter" className="nav_menu_link">
            Radius Meter
          </Link>
        </p>
        {/* <p className="m-0">
          <Link to="/upzip_file" className="nav_menu_link">
            Unzip File
          </Link>
        </p>
        <p className="m-0">
          <Link to="/clock" className="nav_menu_link">
            Clock
          </Link>
        </p>
        </p> */}
      </div>
    </div>
  );
}

export default Navbar;

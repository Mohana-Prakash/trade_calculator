import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const menu_arr = [
    {
      path: "/",
      menuName: "Trade & Settlement",
    },
    {
      path: "/ipp_res_dash",
      menuName: "P&L and VAR",
    },
    {
      path: "/speedometer",
      menuName: "Speedometer",
    },
    // {
    //   path: "/radius_meter",
    //   menuName: "Radius Meter",
    // },
    {
      path: "/carbon_emission",
      menuName: "Carbon Emission Calculator",
    },
    {
      path: "/time_calc",
      menuName: "GreytHr Time Calculator",
    },
  ];
  return (
    <div className="nav_div">
      {/* <div style={{ width: "12%" }}>
        <img
          src="https://s3.jp-tok.cloud-object-storage.appdomain.cloud/big-issue-main-bucket/GET_ENERGY/USER_AUTHORISED_SIGN/1032142f-2bc7-4d64-842c-d941197818f7/image_2024_07_17T06_21_56_545Z.png"
          style={{ width: "100%" }}
          alt=""
        />
      </div> */}
      <div className="nav_menu">
        {menu_arr.map((e) => {
          return (
            <p className="m-0" key={e.menuName}>
              <Link to={e.path} className="nav_menu_link">
                {e.menuName}
              </Link>
            </p>
          );
        })}
        {/* <p className="m-0">
          <Link to="/upzip_file" className="nav_menu_link">
            Unzip File
          </Link>
        </p>
        <p className="m-0">
          <Link to="/clock" className="nav_menu_link">
            Clock
          </Link>
        </p> */}
      </div>
    </div>
  );
}

export default Navbar;

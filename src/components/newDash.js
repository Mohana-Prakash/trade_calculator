import React, { useState } from "react";

function NewDash() {
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const [omipPrice, setOmipPrice] = useState(0);
  const [calcBoolean, setCalcBoolean] = useState(false);
  const totalHours = year % 4 === 0 ? "8784" : "8760";
  const profileVolume = (50 * totalHours * 18) / 100;
  const fixedDailyProduction = 45 * profileVolume;
  const dailyProduction = omipPrice * profileVolume;
  const difference =
    fixedDailyProduction > dailyProduction
      ? Math.round(fixedDailyProduction - dailyProduction)
      : Math.round(dailyProduction - fixedDailyProduction);
  const positionReturnPercent =
    Math.round((dailyProduction / fixedDailyProduction) * 100 * 100) / 100;
  const diffPercent =
    fixedDailyProduction > dailyProduction
      ? 100 - positionReturnPercent
      : positionReturnPercent - 100;
  const profit_or_loss =
    fixedDailyProduction > dailyProduction ? "LOSS" : "PROFIT";
  const color = profit_or_loss === "LOSS" ? "#ff3a3a" : "rgb(88 255 155)";
  return (
    <>
      <h2 className="text-center my-4">P&L and VAR Calculations</h2>
      <div
        className="w-50 m-auto p-3"
        style={{ backgroundColor: "rgb(41, 75, 117)" }}>
        <p>
          Choose year{" "}
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </p>
        <p>
          Forecasted (unhedged) Merchant Production per annum = <b>50</b> MWh
        </p>
        <p>
          Cap.factor = <b>18</b> %
        </p>
        <p>
          Total Hrs per annum = <b>{totalHours}</b>
        </p>
        <p>
          Profile expected production (Volume) = (50 * {totalHours}) * 18% ={" "}
          <b>{profileVolume}</b> MWh per annum
        </p>
      </div>
      <div
        style={{
          width: "80%",
          backgroundColor: "rgb(41, 75, 117)",
          height: "46vh",
        }}
        className="d-flex justify-conten-between mx-auto my-2">
        <div className="p-3 border-right" style={{ width: "45%" }}>
          <p className="text-center font-weight-bold">Fixed PPA Power Price</p>
          <p>
            OMIP Baseload €/MWh (hist) price = <b>45</b> €/MWh
          </p>
          <p className="border-bottom">
            Forecasted production daily return = <b>€ {45 * profileVolume}</b>
            <h6 className="text-left" style={{ fontSize: "12px" }}>
              <i>(OMIP Price * Profile Volume)</i>
            </h6>
          </p>
          {calcBoolean && (
            <div>
              <div className="d-flex justify-content-between">
                <p className="text-center font-weight-bold">Calculations</p>
                <p
                  className="font-weight-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => setCalcBoolean(false)}>
                  X
                </p>
              </div>
              <div>
                <img style={{ width: "100%" }} src="./asset/pl_var_calc.png" />
              </div>
            </div>
          )}
        </div>
        <div className="p-3" style={{ width: "55%" }}>
          <p>
            OMIP Baseload €/MWh (hist) price ={" "}
            <input
              type="text"
              value={omipPrice}
              onChange={(e) => setOmipPrice(e.target.value)}
            />{" "}
            €/MWh
          </p>
          <p>
            Forecasted production daily return ={" "}
            <b>€ {Math.round(omipPrice * profileVolume)}</b>
          </p>
          <p>
            Position return ={" "}
            <b style={{ color: color }}>
              {omipPrice !== 0 ? positionReturnPercent : 0}
            </b>{" "}
            %
          </p>
          <p>
            MTM Profit/Loss ={" "}
            <b style={{ color: color }}>
              {omipPrice !== 0 ? Math.round(diffPercent * 100) / 100 : 0}
            </b>{" "}
            %
          </p>
          <p>
            MTM Profit/Loss ={" "}
            <b style={{ color: color }}> {omipPrice !== 0 ? difference : 0}</b>{" "}
            €
          </p>
          {omipPrice !== 0 && (
            <p className="text-right font-weight-bold">
              <span style={{ color: color }}>({profit_or_loss})</span>
              <span
                onClick={() => setCalcBoolean(true)}
                className="font-italic text-primary"
                style={{
                  marginLeft: "10px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}>
                View Calculations
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default NewDash;

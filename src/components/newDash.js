import React, { useState } from "react";

function NewDash() {
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const [omipPrice, setOmipPrice] = useState(0);
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
    fixedDailyProduction > dailyProduction ? "Loss" : "Profit";
  const color = profit_or_loss === "Loss" ? "red" : "green";
  return (
    <>
      <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
        P&L and VAR Calculations
      </h2>
      <div
        style={{
          width: "50%",
          margin: "auto",
          padding: "10px",
          backgroundColor: "#c7c7c7",
        }}
      >
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
          width: "70%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1rem auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#c7c7c7",
            textAlign: "center",
            padding: "0px 10px",
            height: "46vh",
          }}
        >
          <p style={{ fontWeight: "700" }}>Fixed PPA Power Price</p>
          <p>
            OMIP Baseload €/MWh (hist) price = <b>45</b> €/MWh
          </p>
          <p>
            Forecasted production daily return = <b>€ {45 * profileVolume}</b>
          </p>
        </div>
        <div style={{ backgroundColor: "#c7c7c7", height: "46vh" }}>
          <div
            style={{
              padding: "10px",
            }}
          >
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
              Position return % ={" "}
              <b style={{ color: color }}>
                {omipPrice !== 0 ? positionReturnPercent : 0}
              </b>{" "}
              %
            </p>
            <p>
              MTM Profit/Loss % ={" "}
              <b style={{ color: color }}>
                {omipPrice !== 0 ? Math.round(diffPercent * 100) / 100 : 0}
              </b>{" "}
              %
            </p>
            <p>
              MTM Profit/Loss ={" "}
              <b style={{ color: color }}>
                € {omipPrice !== 0 ? difference : 0}
              </b>
            </p>
          </div>
          {omipPrice !== 0 && (
            <p
              style={{
                backgroundColor: color,
                padding: "5px",
                margin: "0px",
                color: "white",
                textAlign: "center",
              }}
            >
              {profit_or_loss}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default NewDash;

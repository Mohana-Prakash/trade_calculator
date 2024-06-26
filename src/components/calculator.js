import React from "react";

function Calculator({ obj }) {
  const { supply, demand, contractPrice, marketPrice } = obj;
  const ippDeservedPrice = Number(supply) * Number(contractPrice);
  const ippReceivedPrice = Number(supply) * Number(marketPrice);
  const refundPrice =
    Number(contractPrice) < Number(marketPrice)
      ? ippReceivedPrice - ippDeservedPrice
      : ippDeservedPrice - ippReceivedPrice;
  const resDemandPrice = Number(demand) * Number(marketPrice);
  return (
    <div className="calculator">
      {/* <div className="basic_details">
        <div>
          <p>
            IPP Supply: <b>{Number(supply)}</b> MWh
          </p>
        </div>
        <p>
          RES Demand: <b>{Number(demand)}</b> MWh
        </p>
        <p>
          Contract Price: <b>{Number(contractPrice)}</b> €/MWh
        </p>
        <p>
          Market Price: <b>{Number(marketPrice)}</b> €/MWh
        </p>
      </div> */}
      <div>
        <p>
          Contracted Price (IPP Supply * Contract Price):{" "}
          <b>{ippDeservedPrice.toFixed(2)}</b> €
        </p>
        <p>
          Revenue Per Hour (IPP Supply * Market Price):{" "}
          <b>{ippReceivedPrice.toFixed(2)}</b> €
        </p>
        <p>
          Financial PPA Settlement{" "}
          {refundPrice > 0 && (
            <span style={{ fontWeight: "600", fontSize: "17px" }}>
              (
              {Number(contractPrice) < Number(marketPrice)
                ? "IPP pay to RES"
                : "RES pay to IPP"}
              )
            </span>
          )}
          : <b>{refundPrice.toFixed(2)}</b> €
        </p>
        <p>
          OMIE Sourcing Cost (RES Demand * Market Price):{" "}
          <b>{resDemandPrice.toFixed(2)}</b> €
        </p>
        <p>
          {}
          Total Energy Cost of RES:{" "}
          <b>
            {Number(contractPrice) < Number(marketPrice)
              ? (resDemandPrice - refundPrice).toFixed(2)
              : (resDemandPrice + refundPrice).toFixed(2)}
          </b>{" "}
          €
        </p>
      </div>
    </div>
  );
}

export default Calculator;

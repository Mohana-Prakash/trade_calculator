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
      <div className="basic_details">
        <p>
          IPP Supply: <b>{Number(supply)}</b> MWh
        </p>
        <p>
          RES Demand: <b>{Number(demand)}</b> MWh
        </p>
        <p>
          Contract Price: <b>{Number(contractPrice)}</b> €/MWh
        </p>
        <p>
          Market Price: <b>{Number(marketPrice)}</b> €/MWh
        </p>
      </div>
      <div>
        <p>
          IPP Deserved Price (IPP Supply * Contract Price):{" "}
          <b>{ippDeservedPrice}</b> €/MWh
        </p>
        <p>
          IPP Received Price (IPP Supply * Market Price):{" "}
          <b>{ippReceivedPrice}</b> €/MWh
        </p>
        <p>
          Price Difference{" "}
          {refundPrice > 0 && (
            <span>
              ( Note :{" "}
              {Number(contractPrice) < Number(marketPrice)
                ? "IPP need to pay excess price to RES"
                : "RES need to pay deficit price to IPP"}
              )
            </span>
          )}
          : <b>{refundPrice}</b> €/MWh
        </p>
        <p>
          RES Demand Energy Price (RES Demand * Market Price):{" "}
          <b>{resDemandPrice}</b> €/MWh
        </p>
        <p>
          {}
          RES Total Payment to OMIE:{" "}
          <b>
            {Number(contractPrice) < Number(marketPrice)
              ? resDemandPrice - refundPrice
              : resDemandPrice + refundPrice}
          </b>{" "}
          €/MWh
        </p>
      </div>
    </div>
  );
}

export default Calculator;

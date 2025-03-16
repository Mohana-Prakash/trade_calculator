import React, { useState } from "react";
import CreatePayment from "./createPayment";
import ConfirmPayment from "./confirmPayment";

function Stripe() {
  const [comp, setComp] = useState(false);
  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h1>Stripe</h1>
      <button onClick={() => setComp(!comp)}>Change Payment Mode</button>
      <p>{!comp ? "Confirm Payment" : "Create Payment"}</p>
      <div style={{ marginTop: "1rem" }}>
        {comp ? <CreatePayment /> : <ConfirmPayment />}
      </div>
    </div>
  );
}

export default Stripe;

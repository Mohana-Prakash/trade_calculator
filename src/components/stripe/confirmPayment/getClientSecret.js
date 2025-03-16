import React, { useState, useEffect } from "react";
import CheckoutForm from "./checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51R2yb9GXi2AZuvbSlXhBG7a9XQWkJyL6EyOnKVnQO8RW9NWmO6sGZAGn3Yj2RUx4CvTuFCpZSM8CFkW2lP4arUE700G0qF90Uo"
);

const GetClientSecret = () => {
  const [data, setData] = useState({
    clientSecret: null,
    paymentIntentId: null,
  });
  const [error, setError] = useState("");

  const options = {
    appearance: { theme: "stripe" },
    paymentMethodOrder: ["card"],
    clientSecret: data.clientSecret,
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 5000, currency: "usd" }),
          }
        );

        const data = await response.json();
        console.log(data);

        if (data.clientSecret && data.paymentIntentId) {
          setData({
            clientSecret: data.clientSecret,
            paymentIntentId: data.paymentIntentId,
          });
        } else {
          throw new Error("clientSecret or paymentIntentId is missing.");
        }
      } catch (err) {
        setError("Failed to load payment form.");
      }
    };

    fetchClientSecret();
  }, []); // Only depends on `loading`

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data.clientSecret)
    return <p style={{ color: "red" }}>Error: Missing clientSecret</p>;

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm paymentIntentId={data.paymentIntentId} />
    </Elements>
  );
};

export default GetClientSecret;

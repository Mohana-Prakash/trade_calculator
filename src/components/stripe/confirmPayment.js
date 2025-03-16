import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51R2yb9GXi2AZuvbSlXhBG7a9XQWkJyL6EyOnKVnQO8RW9NWmO6sGZAGn3Yj2RUx4CvTuFCpZSM8CFkW2lP4arUE700G0qF90Uo"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not ready. Please wait.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Step 1: Create a PaymentIntent
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {}, // ❌ No need for return_url
        redirect: "if_required", // ✅ Avoids unnecessary redirects
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setPaymentIntentId(paymentIntent.id);

        // ✅ Step 2: Send paymentIntentId to backend for processing
        const response = await fetch("http://localhost:5000/process-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId }),
        });

        const data = await response.json();
        console.log(data, paymentIntent);
        // fetchPaymentDetails(paymentIntent.id);
        fetchPaymentDetails2(paymentIntent.id);
        // if (data.success) {
        //   alert("Payment Successful!");
        // } else {
        //   setErrorMessage("Payment failed: " + data.message);
        // }
      }
    } catch (err) {
      setErrorMessage("Server error: " + err.message);
    }

    setLoading(false);
  };
  const fetchPaymentDetails = async (id) => {
    const response = await fetch(
      `http://localhost:5000/get-payment-intent/${id}`
    );
    const data = await response.json();
    console.log(data);
  };

  const fetchPaymentDetails2 = async (paymentIntentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/get-payment-details/${paymentIntentId}`
      );
      const data = await response.json();
      console.log("Payment Details:", data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Submit Payment"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {paymentIntentId && <p>Payment Intent ID: {paymentIntentId}</p>}
    </form>
  );
};

const ConfirmPayment = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: 5000,
              currency: "usd",
              name: "Vijay Kumar", // ✅ Send Name
              email: "iasmohan96@gmail.com", // ✅ Send Email
              phone: "91594 54554", // ✅ Send Phone
            }),
          }
        );

        const data = await response.json();
        console.log(data);

        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setLoading(false);
        } else {
          throw new Error("clientSecret is missing.");
        }
      } catch (err) {
        setError("Failed to load payment form.");
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, []);

  if (loading) return <p>Loading Payment Form...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!clientSecret)
    return <p style={{ color: "red" }}>Error: Missing clientSecret</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default ConfirmPayment;

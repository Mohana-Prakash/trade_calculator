import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ paymentIntentId }) => {
  console.log("checkoutform", paymentIntentId);

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     setLoading(true);
  //     setErrorMessage("");

  //     if (!stripe || !elements) {
  //       setErrorMessage("Stripe is not ready. Please wait.");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       // ✅ Step 1: Retrieve PaymentIntent Status
  //       const statusResponse = await fetch(
  //         `http://localhost:5000/get-payment-intent/${paymentIntentId}`
  //       );
  //       const { status } = await statusResponse.json();

  //       if (status === "succeeded") {
  //         setErrorMessage("Payment already completed.");
  //         setLoading(false);
  //         return;
  //       }

  //       // ✅ Step 2: Confirm Payment Only If Needed
  //       if (
  //         status === "requires_payment_method" ||
  //         status === "requires_confirmation"
  //       ) {
  //         const { error, paymentIntent } = await stripe.confirmPayment({
  //           elements,
  //           confirmParams: {},
  //           redirect: "if_required",
  //         });

  //         if (error) {
  //           setErrorMessage(error.message);
  //           setLoading(false);
  //           return;
  //         }

  //         // ✅ Step 3: Notify Backend of Successful Payment
  //         const response = await fetch("http://localhost:5000/confirm-payment", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
  //         });

  //         const data = await response.json();
  //         console.log(data);

  //         if (data.success) {
  //           alert("Payment Successful!");
  //         } else {
  //           setErrorMessage("Payment failed: " + data.message);
  //         }
  //       }
  //     } catch (err) {
  //       setErrorMessage("Server error: " + err.message);
  //     }

  //     setLoading(false);
  //   };

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
      // ✅ Step 1: Retrieve PaymentIntent Status
      const statusResponse = await fetch(
        `http://localhost:5000/get-payment-intent/${paymentIntentId}`
      );
      const { status } = await statusResponse.json();

      if (status === "succeeded") {
        setErrorMessage("Payment already completed.");
        setLoading(false);
        return;
      }

      // ✅ Step 2: Confirm Payment Only If Needed
      if (
        status === "requires_payment_method" ||
        status === "requires_confirmation"
      ) {
        // const { error, paymentIntent } = await stripe.confirmPayment({
        //   elements,
        //   confirmParams: {},
        //   redirect: "if_required",
        // });

        // if (error) {
        //   setErrorMessage(error.message);
        //   setLoading(false);
        //   return;
        // }

        // ✅ Step 3: Notify Backend (Only for Logging, No Confirmation)
        const response = await fetch("http://localhost:5000/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId: paymentIntentId }),
        });

        const data = await response.json();
        console.log(data);

        if (data.success) {
          alert("Payment Successful!");
        } else {
          setErrorMessage("Payment failed: " + data.message);
        }
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

export default CheckoutForm;

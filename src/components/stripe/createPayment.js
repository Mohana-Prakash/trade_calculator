import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
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
  const [paymentMethodId, setPaymentMethodId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
      });
      console.log(error, paymentMethod);

      if (!error) {
        setPaymentMethodId(paymentMethod.id);
      }
    } catch (err) {}

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Card Number:</label>
      <CardNumberElement />
      <label>Expiry:</label>
      <CardExpiryElement />
      <label>CVV:</label>
      <CardCvcElement />
      <button type="submit">
        {loading ? "Processing..." : "Submit Payment"}
      </button>
      {paymentMethodId && <p>Payment Method ID: {paymentMethodId}</p>}
    </form>
  );
};

const CreatePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CreatePayment;

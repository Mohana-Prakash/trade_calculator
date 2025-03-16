const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe(
  "sk_test_51R2yb9GXi2AZuvbSM3xcwpckLyXnnZtYcegRAWfnwHdx4rYsfUF4QVrBfvnoniIwjS9ZZCQ2cRzhKrlQvymAN7K500iuNeIk3b"
); // Replace with your secret key

app.use(cors());
app.use(express.json());

// ✅ Create PaymentIntent (Returns clientSecret)
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Process Payment (No return_url needed)
app.post("/process-payment", async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: "Missing paymentIntentId." });
    }

    // ✅ Confirm the payment
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/get-payment-intent/:id", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
    res.json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-payment-details/:paymentIntentId", async (req, res) => {
  try {
    // ✅ Step 1: Retrieve the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.params.paymentIntentId
    );

    if (!paymentIntent.payment_method) {
      return res.status(404).json({ error: "Payment method not found." });
    }

    // ✅ Step 2: Retrieve Payment Method Details
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentIntent.payment_method
    );

    res.json({
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      card: {
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
        exp_month: paymentMethod.card.exp_month,
        exp_year: paymentMethod.card.exp_year,
      },
      billing_details: paymentMethod.billing_details, // Name, Email, Phone, Address
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe(
  "sk_test_51R2yb9GXi2AZuvbSM3xcwpckLyXnnZtYcegRAWfnwHdx4rYsfUF4QVrBfvnoniIwjS9ZZCQ2cRzhKrlQvymAN7K500iuNeIk3b"
); // Replace with your secret key

app.use(cors());
app.use(express.json());

const paymentIntentsCache = {};

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { previousPaymentIntentId } = req.body;

    // Step 1: Check for reusable PaymentIntent
    if (
      previousPaymentIntentId &&
      paymentIntentsCache[previousPaymentIntentId]
    ) {
      const existingIntent = await stripe.paymentIntents.retrieve(
        previousPaymentIntentId
      );

      if (
        ["requires_payment_method", "requires_confirmation"].includes(
          existingIntent.status
        )
      ) {
        return res.json({
          clientSecret: existingIntent.client_secret,
          paymentIntentId: existingIntent.id, // ✅ Reuse the existing PaymentIntent
        });
      }
    }

    // Step 2: Create a new PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Store PaymentIntent in cache for reuse
    paymentIntentsCache[paymentIntent.id] = true;

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Process Payment (No return_url needed)
app.post("/confirm-payment", async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: "PaymentIntent ID is required" });
    }

    // Retrieve the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log(`${paymentIntentId} : paymentIntent`);

    // Check if it's already confirmed
    if (paymentIntent.status === "succeeded") {
      return res.json({
        success: true,
        message: "Payment already succeeded",
        paymentIntent,
      });
    } else if (paymentIntent.status === "requires_confirmation") {
      // Only confirm if it requires confirmation
      const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
        paymentIntentId
      );
      return res.json({ success: true, paymentIntent: confirmedPaymentIntent });
    } else {
      return res.json({
        success: false,
        message: "PaymentIntent is not ready for confirmation",
        status: paymentIntent.status,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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

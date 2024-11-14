const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stripe = require("stripe")(
    process.env.VITE_STRIPE_KEY
);
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Firebase!");
});

app.post("/payment/create", async (req, res) => {
  const totalPrice = parseInt(req.query.totalPrice);
  
  if (totalPrice > 0) {
    console.log("totalPrice", totalPrice);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "usd",
    });
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(402).json("Payment failed");
  }
});

exports.api = onRequest(app);
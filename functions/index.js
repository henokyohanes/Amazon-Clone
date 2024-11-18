const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.VITE_STRIPE_KEY);
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Root endpoint for testing API connectivity
app.get("/", (req, res) => {
    res.send("Hello from Firebase!");
});

// Endpoint to create a payment intent with Stripe
app.post("/payment/create", async (req, res) => {
    const totalPrice = parseInt(req.query.totalPrice);

    // Create a payment intent using Stripe API
    if (totalPrice > 0) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice,
            currency: "usd",
        });
        // Respond with the client secret of the created payment intent
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
    } else {
        // Respond with an error if totalPrice is invalid or non-positive
        res.status(402).json("Payment failed");
    }
});

// Exporting the Express app as a Firebase Cloud Function
exports.api = onRequest(app);

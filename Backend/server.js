require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Resend } = require("resend");
const OpenAI = require("openai"); // ✅ ADDED

const Booking = require("./models/Booking");

const app = express();

app.use(cors());
app.use(express.json());

// ================= OPENAI SETUP =================

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ================= RESEND EMAIL SETUP =================

const resend = new Resend(process.env.RESEND_API_KEY);

// ================= CHATBOT ROUTE =================
// NEW ROUTE ADDED HERE

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a professional hotel assistant. Help users with booking, room availability, pricing, check-in and check-out details."
                },
                {
                    role: "user",
                    content: message
                }
            ],
        });

        res.json({
            reply: response.choices[0].message.content
        });

    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Chatbot failed" });
    }
});

// ================= BOOKING ROUTE =================

app.post("/api/bookings", async (req, res) => {
    try {
        const { name, email, checkIn, checkOut, guests } = req.body;

        const bookingId = "HB-" + Date.now();

        const nights = Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        );

        const newBooking = new Booking({
            bookingId,
            name,
            email,
            checkIn,
            checkOut,
            guests
        });

        await newBooking.save();

        try {
            // ADMIN EMAIL
            await resend.emails.send({
                from: "Hotel Booking <onboarding@resend.dev>",
                to: process.env.EMAIL_USER,
                subject: `New Booking Received - ${bookingId}`,
                html: `
                    <h2>New Booking Received</h2>
                    <p><strong>Booking ID:</strong> ${bookingId}</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Guests:</strong> ${guests}</p>
                    <p><strong>Check-in:</strong> ${checkIn}</p>
                    <p><strong>Check-out:</strong> ${checkOut}</p>
                    <p><strong>Total Nights:</strong> ${nights}</p>
                `
            });

            // CUSTOMER EMAIL
            await resend.emails.send({
                from: "Hotel Booking <onboarding@resend.dev>",
                to: email,
                subject: `Your Booking Confirmation - ${bookingId}`,
                html: `
                    <h2>Booking Confirmed ✅</h2>
                    <p>Dear ${name},</p>
                    <p>Your booking has been confirmed.</p>
                    <p><strong>Booking ID:</strong> ${bookingId}</p>
                    <p><strong>Check-in:</strong> ${checkIn}</p>
                    <p><strong>Check-out:</strong> ${checkOut}</p>
                    <p><strong>Guests:</strong> ${guests}</p>
                    <p><strong>Total Nights:</strong> ${nights}</p>
                `
            });

            console.log("Emails sent successfully ✅");

        } catch (emailError) {
            console.log("Email failed but booking saved:", emailError.message);
        }

        res.status(200).json({
            message: "Booking successful ✅",
            bookingId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// ================= ROOT =================

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// ================= MONGO =================

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
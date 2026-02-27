require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Resend } = require("resend");

const Booking = require("./models/Booking");

const app = express();

app.use(cors());
app.use(express.json());

// ================= RESEND EMAIL SETUP =================

const resend = new Resend(process.env.RESEND_API_KEY);


// ================= BOOKING ROUTE =================

app.post("/api/bookings", async (req, res) => {
    try {

        const { name, email, checkIn, checkOut, guests } = req.body;

        const bookingId = "HB-" + Date.now();

        const nights = Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) /
            (1000 * 60 * 60 * 24)
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
                <p><b>Booking ID:</b> ${bookingId}</p>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Guests:</b> ${guests}</p>
                <p><b>Check-in:</b> ${checkIn}</p>
                <p><b>Check-out:</b> ${checkOut}</p>
                <p><b>Total Nights:</b> ${nights}</p>
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
                <p>Your booking is confirmed.</p>
                <p><b>Booking ID:</b> ${bookingId}</p>
                <p><b>Check-in:</b> ${checkIn}</p>
                <p><b>Check-out:</b> ${checkOut}</p>
                <p><b>Guests:</b> ${guests}</p>
                <p><b>Total Nights:</b> ${nights}</p>
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

// ================= SERVER START =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
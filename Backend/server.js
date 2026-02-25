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

const sendBookingEmail = async (bookingData) => {
    await resend.emails.send({
        from: "Hotel Booking <onboarding@resend.dev>",  // default test sender
        to: process.env.EMAIL_USER,  // your email (add this in environment)
        subject: "New Hotel Booking 🏨",
        html: `
            <div style="font-family: Arial; padding:20px;">
                <h2 style="color:#2c3e50;">New Booking Received</h2>
                <p><strong>Name:</strong> ${bookingData.name}</p>
                <p><strong>Email:</strong> ${bookingData.email}</p>
                <p><strong>Check-in:</strong> ${bookingData.checkIn}</p>
                <p><strong>Check-out:</strong> ${bookingData.checkOut}</p>
                <p><strong>Guests:</strong> ${bookingData.guests}</p>
                <hr/>
                <p style="color:gray;">This booking was submitted from your hotel website.</p>
            </div>
        `
    });
};

// ================= ROUTE =================

app.post("/api/bookings", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        // Send email (but don't break booking if email fails)
        try {
            await sendBookingEmail(req.body);
            console.log("Email sent successfully ✅");
        } catch (emailError) {
            console.log("Email failed but booking saved:", emailError.message);
        }

        res.status(200).json({ message: "Booking successful ✅" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// ================= MONGO =================

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});
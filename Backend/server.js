require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const Booking = require("./models/Booking");

const app = express();

app.use(cors());
app.use(express.json());

// ================= EMAIL FUNCTION =================

const sendBookingEmail = async (bookingData) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Hotel Booking 🏨",
        html: `
            <h2>New Booking Received</h2>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Phone:</strong> ${bookingData.phone}</p>
            <p><strong>Check-in:</strong> ${bookingData.checkIn}</p>
            <p><strong>Check-out:</strong> ${bookingData.checkOut}</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

// ================= ROUTE =================

app.post("/api/bookings", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        // Try sending email but don't fail booking if email fails
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
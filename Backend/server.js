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
        const { name, email, checkIn, checkOut, guests } = req.body;

        // Generate unique booking ID
        const bookingId = "HB-" + Date.now();

        // Calculate total nights
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

        // ================= SEND ADMIN EMAIL =================

        try {
            await resend.emails.send({
                from: "Hotel Booking <onboarding@resend.dev>",
                to: process.env.EMAIL_USER,
                subject: `New Booking Received - ${bookingId}`,
                html: `
                    <div style="font-family:Arial;padding:30px;background:#f4f6f9;">
                        <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:10px;">
                            <h2 style="color:#2c3e50;">🏨 New Booking Received</h2>
                            <p><strong>Booking ID:</strong> ${bookingId}</p>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Guests:</strong> ${guests}</p>
                            <p><strong>Check-in:</strong> ${checkIn}</p>
                            <p><strong>Check-out:</strong> ${checkOut}</p>
                            <p><strong>Total Nights:</strong> ${nights}</p>
                            <hr/>
                            <p style="color:gray;font-size:14px;">
                                This booking was submitted from your hotel website.
                            </p>
                        </div>
                    </div>
                `
            });

            // ================= SEND CUSTOMER EMAIL =================

            await resend.emails.send({
                from: "Hotel Booking <onboarding@resend.dev>",
                to: email,
                subject: `Your Booking Confirmation - ${bookingId}`,
                html: `
                    <div style="font-family:Arial;padding:30px;background:#f4f6f9;">
                        <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:10px;">
                            <h2 style="color:#27ae60;">✅ Booking Confirmed</h2>
                            <p>Dear ${name},</p>
                            <p>Thank you for choosing our hotel! Your booking has been confirmed.</p>

                            <div style="background:#f9fafb;padding:15px;border-radius:8px;margin-top:15px;">
                                <p><strong>Booking ID:</strong> ${bookingId}</p>
                                <p><strong>Check-in:</strong> ${checkIn}</p>
                                <p><strong>Check-out:</strong> ${checkOut}</p>
                                <p><strong>Guests:</strong> ${guests}</p>
                                <p><strong>Total Nights:</strong> ${nights}</p>
                            </div>

                            <p style="margin-top:20px;">
                                We look forward to welcoming you! 🏨
                            </p>

                            <p style="color:gray;font-size:14px;">
                                If you have any questions, simply reply to this email.
                            </p>
                        </div>
                    </div>
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
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const bookingRoutes = require("./routes/bookingRoutes");
const Booking = require("./models/Booking"); // make sure this exists

const app = express();

// ✅ CORS Configuration
app.use(cors());
app.use(express.json());

// ================= EMAIL FUNCTION =================

const sendBookingEmail = async (bookingData) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lakshitkumarsingh.lks02@gmail.com", // 👈 replace
            pass: "wvrvzwpbjxdxfjdw"     // 👈 replace with Gmail App Password
        }
    });

    const mailOptions = {
        from: "yourgmail@gmail.com",
        to: "yourgmail@gmail.com",
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

// ================= BOOKING ROUTE WITH EMAIL =================

app.post("/api/bookings", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        // ✅ Send email after saving
        await sendBookingEmail(req.body);

        res.status(200).json({ message: "Booking successful & email sent ✅" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// ================= MONGO CONNECTION =================

mongoose.connect("mongodb+srv://hoteladmin:Hotel2.0@cluster0.w16ofm7.mongodb.net/hotelwebsite?appName=Cluster0")
    .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => console.log(err));

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});
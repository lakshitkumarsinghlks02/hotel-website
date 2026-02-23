const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();   // ✅ app initialized FIRST

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);

// MongoDB Connection
mongoose.connect("mongodb+srv://hoteladmin:Hotel2.0@cluster0.w16ofm7.mongodb.net/hotelwebsite?appName=Cluster0")
    .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => console.log(err));

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
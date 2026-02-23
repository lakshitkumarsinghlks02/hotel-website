const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  try {
    const { name, email, checkIn, checkOut, guests } = req.body;

    const newBooking = new Booking({
      name,
      email,
      checkIn,
      checkOut,
      guests,
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking successful!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
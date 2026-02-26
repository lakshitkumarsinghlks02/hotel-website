const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true
  },
  name: String,
  email: String,
  checkIn: Date,
  checkOut: Date,
  guests: Number
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
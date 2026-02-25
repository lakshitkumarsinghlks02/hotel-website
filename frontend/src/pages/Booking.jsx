import React, { useState } from "react";
import axios from "axios";

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://hotel-website-hyqt.onrender.com/api/bookings",
        formData
      );

      alert("Booking Successful 🎉");

      setFormData({
        name: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
      });
    } catch (error) {
      alert("Booking Failed ❌");
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501117716987-c8e1ecb2100d?w=1600&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Glass Card */}
      <div className="relative z-10 bg-white/20 backdrop-blur-lg p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-lg text-white border border-white/30">
        <h2 className="text-3xl font-bold text-center mb-6">
          Book Your Stay
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/30 placeholder-white focus:outline-none"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/30 placeholder-white focus:outline-none"
          />

          {/* Date Section (FIXED RESPONSIVE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Check In */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Check In</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/30 focus:outline-none"
              />
            </div>

            {/* Check Out */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Check Out</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/30 focus:outline-none"
              />
            </div>

          </div>

          {/* Guests */}
          <input
            type="number"
            name="guests"
            placeholder="Guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            required
            className="w-full p-3 rounded-lg bg-white/30 placeholder-white focus:outline-none"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 transition p-3 rounded-lg font-semibold text-black"
          >
            Confirm Booking
          </button>

        </form>
      </div>
    </div>
  );
}

export default Booking;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


function Navbar() {


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-white">

        {/* Logo */}
        <h1 className="text-xl font-semibold tracking-wide">
          LuxuryStay
        </h1>

        {/* Links */}
        <div className="space-x-6 hidden md:flex items-center text-sm">
          <a href="/" className="hover:text-yellow-400 transition">
            Home
          </a>
          <Link to="/gallery" className="hover:text-yellow-400 transition">
            Gallery
          </Link>
          <a
            href="/booking"
            className="px-4 py-1.5 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition text-sm font-medium"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${scrolled ? "bg-black/80" : "bg-black/30"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-white">

        {/* Logo */}
        <h1 className="text-xl font-semibold tracking-wide">
          LuxuryStay
        </h1>

        {/* Links */}
        <div className="space-x-6 hidden md:flex items-center text-sm">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <Link to="/gallery" className="hover:text-yellow-400 transition">
            Gallery
          </Link>

          <Link
            to="/booking"
            className="px-4 py-1.5 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition text-sm font-medium"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
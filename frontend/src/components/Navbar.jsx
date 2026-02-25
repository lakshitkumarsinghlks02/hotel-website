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

        {/* Links (Visible on both mobile & desktop) */}
        <div className="flex items-center space-x-3 text-xs md:text-sm">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <Link to="/gallery" className="hover:text-yellow-400 transition">
            Gallery
          </Link>

          <Link
            to="/booking"
            className="px-3 py-1 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition font-medium"
          >
            Book
          </Link>
        </div>

      </div> {/* ✅ CLOSED PROPERLY */}
    </nav>
  );
}

export default Navbar;
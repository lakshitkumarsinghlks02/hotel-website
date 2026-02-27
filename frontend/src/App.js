import ChatBot from "./components/ChatBot";
import Gallery from "./pages/Gallery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>

      {/* MUST BE HERE */}
      <ChatBot />

    </Router>
  );
}

export default App;
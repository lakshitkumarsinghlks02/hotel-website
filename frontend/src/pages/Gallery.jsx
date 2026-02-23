import { motion } from "framer-motion";

function Gallery() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
      location: "Maldives Beach Resort",
      detail: "Luxury overwater villas with breathtaking ocean views."
    },
    {
      src: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=1200&q=80",
      location: "Dubai Skyline Hotel",
      detail: "Premium suites overlooking the iconic city skyline."
    },
    {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      location: "Swiss Alpine Retreat",
      detail: "Cozy mountain escape surrounded by snow-capped peaks."
    },
    {
      src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
      location: "Bali Tropical Villa",
      detail: "Private infinity pools nestled in lush greenery."
    },
    {
      src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      location: "Santorini Cliff Hotel",
      detail: "Elegant white architecture with sunset sea views."
    },
    {
      src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
      location: "New York Grand Palace",
      detail: "Sophisticated luxury in the heart of Manhattan."
    }
  ];

  return (
    <div
      className="min-h-screen py-28 px-6"
      style={{ backgroundColor: "rgb(229, 231, 235)" }}
    >
      <div className="max-w-6xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16 text-gray-900"
        >
          Our Hotel Gallery
        </motion.h1>

        {/* 2 Photos Per Row */}
        <div className="grid md:grid-cols-2 gap-10">

          {images.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <img
                src={item.src}
                alt={item.location}
                className="w-full h-96 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {item.location}
                </h2>
                <p className="text-gray-600 mt-2">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Gallery;
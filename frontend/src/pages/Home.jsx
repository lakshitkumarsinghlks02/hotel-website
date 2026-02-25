import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { motion } from "framer-motion";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

        <div className="relative text-center text-white px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-7xl font-bold leading-tight"
          >
            Discover Timeless Luxury
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-base md:text-lg text-gray-300"
          >
            Where elegance meets comfort and unforgettable experiences await.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 px-8 md:px-10 py-3 md:py-4 bg-yellow-500 text-black font-semibold rounded-full shadow-lg"
          >
            Explore Rooms
          </motion.button>
        </div>
      </div>

      {/* ROOMS SECTION */}
      <section className="py-16 md:py-24 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16">
            Our Luxury Rooms
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">

            {/* Room 1 */}
            <RoomCard
              name="Deluxe Room"
              img="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80"
            />

            {/* Room 2 */}
            <RoomCard
              name="Premium Suite"
              img="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
            />

            {/* Room 3 */}
            <RoomCard
              name="Presidential Suite"
              img="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80"
            />

            {/* Room 4 - MOBILE ONLY */}
            <div className="md:hidden">
              <RoomCard
                name="Royal Suite"
                img="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80"
              />
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-black via-[#111111] to-black text-white relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-6xl font-bold mb-12 md:mb-20">
            What Our Guests Say
          </h2>

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            spaceBetween={50}
            slidesPerView={1}
          >
            {[
              {
                text: "Absolutely breathtaking experience. The service, ambience and comfort were world-class.",
                name: "Happy Guest",
              },
              {
                text: "Luxury at its finest. I felt like royalty during my entire stay.",
                name: "Happy Guest",
              },
              {
                text: "An unforgettable experience. Elegant interiors and exceptional hospitality.",
                name: "Happy Guest",
              },
            ].map((review, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl">
                  <p className="text-base md:text-2xl text-gray-300 leading-relaxed mb-6 md:mb-8">
                    “{review.text}”
                  </p>
                  <h4 className="text-yellow-400 font-semibold text-base md:text-lg">
                    – {review.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* PARALLAX SECTION */}
      <section
        className="h-[50vh] md:h-[70vh] bg-fixed bg-center bg-cover flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501117716987-c8e1ecb21089?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center text-white px-4">
          <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">
            Experience Unmatched Luxury
          </h2>
          <p className="text-sm md:text-lg max-w-2xl mx-auto text-gray-300">
            Discover elegance, comfort and world-class hospitality.
          </p>
        </div>
      </section>
    </>
  );
}

/* Reusable Room Card Component */
const RoomCard = ({ name, img }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg md:shadow-xl hover:shadow-2xl transition duration-500 group">
    <img
      src={img}
      alt={name}
      className="h-40 md:h-64 w-full object-cover group-hover:scale-110 transition duration-500"
    />

    <div className="p-4 md:p-6">
      <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-3">
        {name}
      </h3>
      <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
        Experience unmatched comfort and modern elegance.
      </p>
      <button className="text-yellow-500 font-semibold text-sm md:text-base hover:underline">
        View Details →
      </button>
    </div>
  </div>
);

export default Home;
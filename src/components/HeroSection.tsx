"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* === Background Image === */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/truck3.png')", // ✅ Static background image
        }}
      />

      {/* === Maroon Overlay Tint === */}
      <div className="absolute inset-0 bg-[#800000]/45" />

      {/* === Foreground Content === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 px-6 sm:px-12"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Revolutionizing Logistics in Kenya
        </h1>

        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Connecting shippers and truckers with speed, transparency, and
          technology.
        </p>

        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          className="bg-white text-[#800000] font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Learn More
        </motion.a>
      </motion.div>
    </section>
  );
}

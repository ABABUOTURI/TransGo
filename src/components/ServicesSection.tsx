"use client";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      title: "For Shippers",
      desc: "Easily post loads, get instant quotes, and track your deliveries in real time. Reliable trucks and transparent pricing.",
      icon: "🚚",
    },
    {
      title: "For Carriers",
      desc: "Access thousands of loads daily, get paid faster, and plan your routes smartly with our technology.",
      icon: "📦",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white text-center px-6 sm:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold text-[#800000] mb-12"
      >
        Our Services
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {services.map((s, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold text-[#800000] mb-2">
              {s.title}
            </h3>
            <p className="text-gray-700">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

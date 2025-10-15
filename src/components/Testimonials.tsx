"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "James Mwangi",
    role: "Fleet Owner, Nairobi",
    text: "TransGo has simplified my business! I now get consistent jobs and fast payments.",
  },
  {
    name: "Grace Njeri",
    role: "Logistics Manager, Mombasa",
    text: "The tracking and transparency are unmatched. I always know where my shipments are.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50 text-center px-6">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold text-[#800000] mb-12"
      >
        What Our Partners Say
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <p className="text-gray-700 italic mb-4">“{t.text}”</p>
            <h4 className="text-[#800000] font-semibold">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

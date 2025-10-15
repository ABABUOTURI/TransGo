"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section id="contact" className="py-20 bg-white text-center px-6 sm:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold text-[#800000] mb-12"
      >
        Get In Touch
      </motion.h2>

      <div className="max-w-3xl mx-auto">
        <form className="space-y-4">
          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-[#800000]"
          />
          <input
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-[#800000]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg h-32 focus:outline-[#800000]"
          />
          <button
            type="submit"
            className="bg-[#800000] text-white px-6 py-3 rounded-lg hover:bg-[#9b0000] transition font-semibold"
          >
            Send Message
          </button>
        </form>

        <a
          href="https://wa.me/254712345678"
          target="_blank"
          className="mt-6 inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          💬 Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";

const steps = [
  { title: "1️⃣ Post a Load", desc: "Shippers post what they need to transport." },
  { title: "2️⃣ Get Matched", desc: "We connect you with verified truckers nearby." },
  { title: "3️⃣ Track in Real-Time", desc: "Know where your shipment is every moment." },
  { title: "4️⃣ Get Paid Fast", desc: "Carriers receive instant digital payments." },
];

export default function HowItWorks() {
  return (
    <section
      id="howitworks"
      className="py-20 bg-gray-50 text-center px-6 sm:px-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold text-[#800000] mb-12"
      >
        How It Works
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-[#800000] mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

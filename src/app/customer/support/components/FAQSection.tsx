"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How can I book a truck for transport?",
    answer:
      "Go to the 'Book a Trip' page, select your pickup and destination on the map, choose your preferred vehicle type, and confirm your booking.",
  },
  {
    question: "Can I track my goods in real time?",
    answer:
      "Yes! After booking, go to the 'Tracking' page to view your shipment’s live location and estimated delivery time.",
  },
  {
    question: "What payment methods do you support?",
    answer:
      "We currently support M-Pesa, bank transfers, and debit/credit cards. Your wallet also allows easy balance management.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Visit the 'Support' page and use the live chat feature or submit feedback through the form. We’ll respond as soon as possible.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 space-y-4 text-white">
      <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>

      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-white/10 pb-3">
          <button
            onClick={() => toggle(index)}
            className="flex justify-between items-center w-full text-left py-3"
          >
            <span className="font-medium">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                activeIndex === index ? "rotate-180 text-[#7B1E2D]" : "text-gray-300"
              }`}
            />
          </button>

          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-300 text-sm pl-1 pb-3"
              >
                {faq.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, HelpCircle, CheckCircle2 } from "lucide-react";

export default function DriverSupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    { q: "How do I start a trip?", a: "Go to the Trips page and click 'Start Trip' for any assigned trip." },
    { q: "How is my earnings calculated?", a: "Earnings are based on completed trips and any bonuses assigned per trip." },
    { q: "How do I update my vehicle info?", a: "Go to the Vehicle page and update your details." },
    { q: "Who do I contact for urgent help?", a: "You can submit a message through this Help Center or call the support hotline." },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubject("");
      setMessage("");
    }, 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <HelpCircle className="w-6 h-6 text-[#7B1E2D]" />
        <h1 className="text-2xl font-semibold text-[#7B1E2D]">
          Help Center
        </h1>
      </div>
      <p className="text-gray-600">
        Find answers or contact support for any issues.
      </p>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm border p-5 space-y-3">
        <h2 className="text-lg font-medium text-gray-800 mb-3">Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} className="border-b last:border-b-0 pb-2">
            <summary className="cursor-pointer font-medium text-gray-700">{faq.q}</summary>
            <p className="mt-1 text-gray-600">{faq.a}</p>
          </details>
        ))}
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-xl shadow-sm border p-5 space-y-4">
        <h2 className="text-lg font-medium text-gray-800 mb-2 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#7B1E2D]" /> Contact Support
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#7B1E2D] text-white rounded hover:bg-[#651926] transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Submission confirmation */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 right-5 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 shadow-lg"
        >
          <CheckCircle2 className="w-5 h-5" />
          Message sent successfully!
        </motion.div>
      )}
    </motion.div>
  );
}

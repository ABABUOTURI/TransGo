"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !feedback.trim()) return;
    setSubmitted(true);

    // Later → send to backend
    setTimeout(() => {
      setFeedback("");
      setRating(0);
      setSubmitted(false);
      alert("✅ Feedback sent successfully. Thank you!");
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col gap-6 text-white"
    >
      <h2 className="text-xl font-semibold">Send Feedback</h2>

      {/* Star Rating */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={26}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className={`cursor-pointer transition-all ${
              (hoverRating || rating) >= star
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Feedback textarea */}
      <textarea
        placeholder="Tell us about your experience..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={4}
        className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7B1E2D]"
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={submitted}
        className={`flex items-center justify-center gap-2 w-full bg-[#7B1E2D] hover:bg-[#6a1a27] rounded-xl py-2.5 font-medium transition ${
          submitted ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        <Send size={18} />
        {submitted ? "Sending..." : "Submit Feedback"}
      </button>
    </motion.div>
  );
}

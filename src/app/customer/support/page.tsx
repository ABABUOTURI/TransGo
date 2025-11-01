"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ChatBox from "./components/ChatBox";
import FeedbackForm from "./components/FeedbackForm";
import FAQSection from "./components/FAQSection";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "feedback" | "faq">("chat");

  const tabs = [
    { id: "chat", label: "Live Chat 💬" },
    { id: "feedback", label: "Feedback 📝" },
    { id: "faq", label: "FAQs ❓" },
  ];

  return (
    <div className="p-6 md:p-10 space-y-6">
      <h1 className="text-2xl font-semibold text-[#7B1E2D]">Customer Support</h1>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-white/20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[#7B1E2D]/40 text-white"
                : "text-gray-300 hover:bg-[#7B1E2D]/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg"
      >
        {activeTab === "chat" && <ChatBox />}
        {activeTab === "feedback" && <FeedbackForm />}
        {activeTab === "faq" && <FAQSection />}
      </motion.div>
    </div>
  );
}

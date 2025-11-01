"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  sender: "user" | "support";
  text: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "support", text: "Hello 👋! How can we help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg: Message = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulated support reply
    setTimeout(() => {
      const replies = [
        "Got it! We'll get back to you shortly.",
        "Can you share your booking ID?",
        "Our team is checking your request 🚚",
        "Please hold on a moment while we look into it.",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [...prev, { sender: "support", text: reply }]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[70vh] md:h-[75vh] bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-4"
    >
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                msg.sender === "user"
                  ? "bg-[#7B1E2D]/70 text-white"
                  : "bg-white/10 text-gray-100 border border-white/10"
              }`}
            >
              {msg.text}
            </motion.div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-center gap-3 mt-4 border-t border-white/10 pt-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-white/10 text-white rounded-xl px-4 py-2 outline-none placeholder-gray-400"
        />
        <button
          onClick={sendMessage}
          className="bg-[#7B1E2D] hover:bg-[#6a1a27] text-white p-2 rounded-xl transition"
        >
          <Send size={20} />
        </button>
      </div>
    </motion.div>
  );
}

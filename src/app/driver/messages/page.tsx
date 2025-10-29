"use client";

import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface Message {
  id: number;
  sender: "Admin" | "Driver";
  content: string;
  timestamp: string;
}

export default function MessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Admin",
      content: "Reminder: Always confirm cargo pickup before departure.",
      timestamp: "2025-10-27 09:12 AM",
    },
    {
      id: 2,
      sender: "Driver",
      content: "Confirmed. Heading to warehouse now.",
      timestamp: "2025-10-27 09:15 AM",
    },
    {
      id: 3,
      sender: "Admin",
      content: "Good. Please update once delivery starts.",
      timestamp: "2025-10-27 09:18 AM",
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "Driver",
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto mt-2 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>

          {/* Chat Container */}
          <div className="flex flex-col h-[70vh] bg-white border rounded-xl shadow-sm overflow-hidden">
            {/* Messages list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "Driver" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-sm ${
                      msg.sender === "Driver"
                        ? "bg-[#7B1E2D] text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-[11px] text-gray-300 mt-1 text-right">
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <form
              onSubmit={handleSend}
              className="flex items-center border-t p-3 bg-gray-50"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B1E2D]"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-[#7B1E2D] text-white rounded-lg hover:bg-[#651926] flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

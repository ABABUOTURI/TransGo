"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export default function NotificationsPage() {
  // Dummy notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Trip Assigned",
      message: "You have a new trip from Nairobi to Mombasa.",
      date: "2025-10-28",
      read: false,
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Your last trip payment of Ksh45 has been processed.",
      date: "2025-10-27",
      read: true,
    },
    {
      id: 3,
      title: "Profile Update",
      message: "Your driver profile has been approved.",
      date: "2025-10-25",
      read: true,
    },
  ]);

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-800 flex items-center gap-2">
          <Bell className="w-6 h-6" /> Notifications
        </h1>
        <button
          onClick={markAllAsRead}
          className="text-sm text-red-700 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl border ${
              n.read ? "bg-gray-50 border-gray-200" : "bg-red-50 border-red-300"
            } shadow-sm`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-gray-800">{n.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{n.message}</p>
              </div>
              <span className="text-xs text-gray-400">{n.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

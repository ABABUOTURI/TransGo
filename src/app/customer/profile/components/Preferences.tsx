"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Bell } from "lucide-react";

export default function Preferences() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [defaultPage, setDefaultPage] = useState("dashboard");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white mt-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-4">Preferences</h3>

      <div className="space-y-4">
        {/* Theme Switch */}
        <div className="flex items-center justify-between">
          <span>Theme Mode</span>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-lg hover:bg-white/20 transition"
          >
            {theme === "light" ? (
              <>
                <Sun size={16} /> Light
              </>
            ) : (
              <>
                <Moon size={16} /> Dark
              </>
            )}
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <span>Enable Notifications</span>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${
              notifications
                ? "bg-[#7B1E2D] border-[#7B1E2D]"
                : "bg-white/10 border-white/20"
            } transition`}
          >
            <Bell size={16} />
            {notifications ? "On" : "Off"}
          </button>
        </div>

        {/* Default Page */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Default Landing Page</label>
          <select
            value={defaultPage}
            onChange={(e) => setDefaultPage(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#7B1E2D]"
          >
            <option value="dashboard">Dashboard</option>
            <option value="book">Book a Trip</option>
            <option value="tracking">Tracking</option>
            <option value="payments">Payments</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}

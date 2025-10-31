"use client";

import { Menu, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 w-full flex items-center justify-between p-4 md:p-6
        bg-[#7B1E2D]/30 backdrop-blur-xl border-b border-white/10 shadow-md"
    >
      {/* === Left Section (Menu + Logo) === */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-full hover:bg-white/10 transition"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-lg md:text-xl font-semibold text-white">
          Customer Dashboard
        </h2>
      </div>

      {/* === Middle Section (Search) === */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search bookings, trips..."
            className="w-full bg-white/10 text-white placeholder-gray-300
              rounded-xl pl-4 pr-10 py-2 outline-none border border-white/20
              focus:border-white/40 transition-all backdrop-blur-md"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>

      {/* === Right Section (Notifications + Profile) === */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-white/10 transition">
          <Bell className="w-6 h-6 text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="p-1 rounded-full border-2 border-white/20 hover:border-white/40 transition">
          <User className="w-7 h-7 text-white" />
        </button>
      </div>
    </motion.header>
  );
}

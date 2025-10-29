"use client";

import { Menu, Bell } from "lucide-react";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-[#7B1E2D] shadow-sm h-16 flex items-center px-4 md:px-6 justify-between text-white">
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-[#641824]"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        {/* this should fetch name  */}
        <h1 className="text-lg md:text-xl font-semibold text-white">
        Welcome, Legend 👋
        </h1>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-md hover:bg-[#641824]">
          <Bell className="w-5 h-5 text-white" />
          {/* Dummy red dot for unread notifications */}
          <span className="absolute top-1.5 right-1.5 block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <img
            src="/driver-avatar.png"
            alt="Driver Avatar"
            className="w-9 h-9 rounded-full border border-white object-cover"
          />
        </div>
      </div>
    </header>
  );
}

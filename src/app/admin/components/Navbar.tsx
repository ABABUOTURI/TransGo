"use client";

import { Menu, Bell, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#7B1E2D] shadow-sm flex items-center justify-between px-4 md:px-8 z-40">
      {/* === Left side (menu + title) === */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-[#8d2233] transition"
        >
          <Menu size={22} className="text-white" />
        </button>

        {/* Page title or brand */}
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white whitespace-nowrap">
          Welcome, <span className="text-gray-200">Legend 👋</span>
        </h1>
      </div>

      {/* === Right side (actions) === */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          onClick={() => router.push("/admin/notifications")}
          className="relative p-2 rounded-full hover:bg-[#8d2233] transition"
        >
          <Bell size={20} className="text-white" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-white rounded-full"></span>
        </button>

        {/* User profile */}
        <div
          onClick={() => router.push("/admin/profile")}
          className="flex items-center gap-2 cursor-pointer hover:bg-[#8d2233] rounded-full px-2 py-1 transition"
        >
          <div className="w-8 h-8 rounded-full bg-white text-[#7B1E2D] flex items-center justify-center font-semibold">
            L
          </div>
          <span className="hidden sm:inline text-sm font-medium text-white">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}

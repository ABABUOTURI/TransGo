"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function TopNav({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[96%] rounded-xl transition-all duration-300 shadow-md 
        ${scrolled ? "bg-[#7B1E2D]/90 backdrop-blur-md" : "bg-[#7B1E2D]/80 backdrop-blur-sm"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-white">
        {/* === Left: Mobile Menu Button === */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded hover:bg-white/10 transition"
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* === Center: Dashboard Title === */}
        <h1 className="text-base sm:text-lg md:text-xl font-semibold tracking-wide text-center flex-1 md:flex-none">
          Fleet Management Dashboard
        </h1>

        {/* === Right: Fleet Owner Info (Desktop) === */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-sm">
            Welcome, <strong>Fleet Owner</strong>
          </span>
          <div className="w-9 h-9 rounded-full bg-white text-[#7B1E2D] flex items-center justify-center font-bold">
            FO
          </div>
        </div>

        {/* === Right: Close Menu Icon (Mobile, when sidebar open) === */}
        <div className="md:hidden">
          <X className="hidden" /> {/* Placeholder to keep spacing consistent */}
        </div>
      </div>
    </nav>
  );
}

"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
          <img src="/logo.png" alt="TransGo Logo" className="w-8 sm:w-10" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-[#800000] font-medium">
          {["About", "How It Works", "Services", "Testimonials", "Contact"].map((item) => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase().replace(/\s/g, ""))}>
              {item}
            </button>
          ))}
          <a href="/auth/login" className="text-sm font-semibold border border-[#800000] px-3 py-1 rounded hover:bg-[#800000] hover:text-white transition">
            Login
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-[#800000]" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="flex flex-col bg-white md:hidden px-6 py-4 border-t border-gray-200">
          {["About", "How It Works", "Services", "Testimonials", "Contact"].map((item) => (
            <button
              key={item}
              className="py-2 text-left text-[#800000]"
              onClick={() => scrollToSection(item.toLowerCase().replace(/\s/g, ""))}
            >
              {item}
            </button>
          ))}
          <a href="/auth/login" className="mt-3 border border-[#800000] text-center py-2 rounded font-semibold text-[#800000] hover:bg-[#800000] hover:text-white transition">
            Login
          </a>
        </div>
      )}
    </nav>
  );
}

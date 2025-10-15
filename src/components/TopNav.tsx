"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] rounded-xl transition-all duration-300 ${
        scrolled
          ? "bg-black/40 backdrop-blur-md shadow-lg"
          : "bg-black/20 backdrop-blur-sm shadow"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 text-white">
        {/* === Logo === */}
<div
  className="flex items-center gap-2 cursor-pointer"
  onClick={() => scrollToSection("hero")}
>
  <img
    src="/logo.png"
    alt="TransGo Logo"
    className="w-14 scale-180 sm:w-4 md:w-8 invert brightness-0 transition-transform duration-300 "
  />
</div>


        {/* === Desktop Menu === */}
        <div className="hidden md:flex items-center gap-10 font-medium">
          {["Home", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() =>
                scrollToSection(item.toLowerCase().replace(/\s/g, ""))
              }
              className="relative group"
            >
              <span className="hover:text-gray-200 transition">{item}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </button>
          ))}

          {/* === Login Dropdown === */}
          <div className="relative">
            <button
              onClick={() => setShowLoginDropdown((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-semibold border border-white/70 px-5 py-2 rounded-full hover:bg-white/10 transition-all"
            >
              Login <ChevronDown size={16} />
            </button>

            {showLoginDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
                {["Login", "Customer Signup", "Fleet Owner Signup", "Admin Panel", "Driver Portal"].map((role) => (
                  <a
                    key={role}
                    href={`/auth/login?role=${role.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-white hover:bg-white/20 transition"
                    onClick={() => setShowLoginDropdown(false)}
                  >
                    {role}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* === Mobile Menu Icon === */}
        <button
          className="md:hidden text-white hover:text-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* === Mobile Dropdown === */}
      {open && (
        <div className="md:hidden px-6 py-4 border-t border-white/10 bg-black/70 backdrop-blur-md">
          <div className="flex flex-col space-y-3 text-white">
            {["Home", "Contact"].map((item) => (
              <button
                key={item}
                className="py-2 text-left hover:text-gray-300 transition"
                onClick={() =>
                  scrollToSection(item.toLowerCase().replace(/\s/g, ""))
                }
              >
                {item}
              </button>
            ))}

            {/* Mobile Login Dropdown */}
            <div className="mt-3">
              <button
                onClick={() => setShowLoginDropdown((prev) => !prev)}
                className="w-full flex justify-between items-center border border-white/70 py-2 px-4 rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                Login <ChevronDown size={16} />
              </button>

              {showLoginDropdown && (
                <div className="mt-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
                  {["Admin", "Driver", "Client"].map((role) => (
                    <a
                      key={role}
                      href={`/auth/login?role=${role.toLowerCase()}`}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/20 transition"
                      onClick={() => {
                        setShowLoginDropdown(false);
                        setOpen(false);
                      }}
                    >
                      {role} Login
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

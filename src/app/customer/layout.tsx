"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#2b0a0e] via-[#4b0f18] to-[#7B1E2D] text-white">
      {/* === Sidebar === */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* === Main Content Area === */}
      <div className="flex-1 flex flex-col md:ml-56 transition-all duration-300">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Background overlay for effects */}
      <div className="fixed inset-0 -z-10 bg-[url('/truck-bg.png')] bg-cover bg-center opacity-10"></div>
    </div>
  );
}

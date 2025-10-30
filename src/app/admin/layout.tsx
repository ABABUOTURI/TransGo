// src/app/admin/layout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

/**
 * Admin layout
 * - Holds Sidebar + Navbar
 * - Provides a responsive content area for admin pages
 * - Keeps sidebar open state here and passes handlers down
 *
 * Note: Sidebar and Navbar are expected at ./components/*
 */

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar (off-canvas on mobile) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Page content */}
      <div className="md:pl-56"> {/* leave space for sidebar on md+ */}
        {/* Top navbar (fixed) */}
        <Navbar onMenuClick={() => setSidebarOpen((s) => !s)} />

        {/* Main content area — add top padding equal to navbar height */}
        <main className="pt-20 px-4 md:px-8 pb-8 min-h-[calc(100vh-5rem)]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

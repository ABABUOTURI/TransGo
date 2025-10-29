"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

/**
 * Driver layout: sidebar (collapsible) + header
 * - Keeps header fixed and adds top padding to content to avoid overlap
 * - Sidebar collapses on small screens and can be toggled from Header
 */

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex flex-col min-h-screen md:pl-64">
        {/* Header (fixed) */}
        <Header onMenuClick={() => setSidebarOpen((s) => !s)} />

        {/* Page content: add top padding equal to header height so content doesn't get overlapped */}
        <main className="pt-20 pb-10 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}

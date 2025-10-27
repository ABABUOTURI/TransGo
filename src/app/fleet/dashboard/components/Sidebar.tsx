"use client";

import { motion } from "framer-motion";
import { X, Truck, Users, Settings, BarChart3, Map } from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: BarChart3 },
    { key: "vehicles", label: "Vehicles", icon: Truck },
    { key: "drivers", label: "Drivers", icon: Users },
    { key: "trips", label: "Trips", icon: Map },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* === Overlay (Mobile) === */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* === Sidebar === */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "tween" }}
        className="fixed md:static top-0 left-0 h-full w-64 bg-white text-gray-800 shadow-md z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-[#7B1E2D]">TransGo</h2>
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col mt-4">
          {menuItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-6 py-3 text-left transition ${
                activeTab === key
                  ? "bg-[#7B1E2D] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}

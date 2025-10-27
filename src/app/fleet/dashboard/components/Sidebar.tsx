"use client";

import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* === Overlay === */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* === Glassmorphism Sidebar Dropdown === */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="absolute top-16 right-6 w-64 rounded-2xl z-50 overflow-hidden 
              bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col py-2">
              {menuItems.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 px-5 py-3 text-left transition-all duration-150 rounded-none 
                    ${
                      activeTab === key
                        ? "bg-white/20 text-white font-medium"
                        : "hover:bg-white/10 text-gray-200"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

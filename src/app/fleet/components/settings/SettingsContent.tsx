"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileSettings from "./ProfileSettings";
import FleetPreferences from "./FleetPreferences";
import NotificationSettings from "./NotificationSettings";
import DisplaySettings from "./DisplaySettings";
import SubscriptionCard from "./SubscriptionCard";

/**
 * Main settings container with responsive sidebar and toast
 */

const TABS = [
  { key: "profile", label: "Profile" },
  { key: "fleet", label: "Fleet" },
  { key: "notifications", label: "Notifications" },
  { key: "display", label: "Display" },
  { key: "subscription", label: "Subscription" },
];

export default function SettingsContent() {
  const [active, setActive] = useState<string>("profile");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  }

  return (
    <div className="w-full max-w-6xl mx-auto pt-20 px-3 sm:px-4 pb-8">
      <header className="mb-6 text-center md:text-left">
        <h1 className="text-2xl font-bold text-[#7B1E2D]">Settings & Preferences</h1>
        <p className="text-sm text-gray-600 mt-1 max-w-2xl mx-auto md:mx-0">
          Configure your fleet profile, preferences, notifications, and display options.
        </p>
      </header>

      {/* Tabs layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* === Sidebar (responsive) === */}
        <nav className="md:w-56 w-full bg-black/40 rounded-xl shadow p-3 md:p-4">
          {/* Small screen toggle button */}
          <div className="md:hidden flex justify-between items-center mb-2">
            <span className="text-white font-medium text-sm">Menu</span>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-white text-sm bg-[#7B1E2D] px-3 py-1 rounded"
            >
              {menuOpen ? "Close" : "Open"}
            </button>
          </div>

          {/* Menu list */}
          <ul
            className={`transition-all duration-200 ease-in-out overflow-hidden ${
              menuOpen ? "max-h-[500px]" : "max-h-0 md:max-h-none"
            } md:max-h-none md:block`}
          >
            {TABS.map((t) => (
              <li key={t.key} className="my-1">
                <button
                  onClick={() => {
                    setActive(t.key);
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                    active === t.key
                      ? "bg-[#7B1E2D] text-white"
                      : "text-gray-200 hover:bg-gray-700/40"
                  }`}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* === Main content === */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-2xl shadow p-4 sm:p-6 overflow-hidden"
            >
              {active === "profile" && (
                <ProfileSettings onSaved={() => showToast("Profile saved")} />
              )}
              {active === "fleet" && (
                <FleetPreferences onSaved={() => showToast("Fleet preferences saved")} />
              )}
              {active === "notifications" && (
                <NotificationSettings
                  onSaved={() => showToast("Notification settings saved")}
                />
              )}
              {active === "display" && (
                <DisplaySettings onSaved={() => showToast("Display settings saved")} />
              )}
              {active === "subscription" && (
                <SubscriptionCard
                  onContact={() => showToast("Support contacted (simulated)")}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* === Toast message === */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="fixed right-4 bottom-6 z-50"
          >
            <div className="bg-[#7B1E2D] text-white px-4 py-3 rounded-lg shadow-lg text-sm">
              {toastMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

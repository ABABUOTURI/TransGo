"use client";

import { useState } from "react";
import { User, Lock, Sliders, Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("light");

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "preferences", label: "Preferences", icon: <Sliders className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    { id: "appearance", label: "Appearance", icon: <Moon className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-[#7B1E2D]">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 w-full text-left border-b border-gray-100 last:border-none transition-all ${
                activeTab === tab.id
                  ? "bg-[#7B1E2D]/10 text-[#7B1E2D] font-medium"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Settings Panel */}
        <div className="flex-1 bg-black/40 rounded-xl shadow p-6">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "preferences" && <SystemPreferences />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "appearance" && (
            <AppearanceSettings theme={theme} setTheme={setTheme} />
          )}
        </div>
      </div>
    </div>
  );
}

/* === Subcomponents === */

function ProfileSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800">Profile Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#7B1E2D] outline-none"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#7B1E2D] outline-none"
        />
      </div>
      <button className="mt-3 bg-[#7B1E2D] text-white px-4 py-2 rounded-lg hover:bg-[#641824] transition">
        Save Changes
      </button>
    </div>
  );
}

function SystemPreferences() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800">System Preferences</h2>
      <label className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4 accent-[#7B1E2D]" />
        <span>Enable email notifications</span>
      </label>
      <label className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4 accent-[#7B1E2D]" />
        <span>Enable system logs</span>
      </label>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800">Security</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="password"
          placeholder="Current Password"
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#7B1E2D] outline-none"
        />
        <input
          type="password"
          placeholder="New Password"
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#7B1E2D] outline-none"
        />
      </div>
      <button className="mt-3 bg-[#7B1E2D] text-white px-4 py-2 rounded-lg hover:bg-[#641824] transition">
        Update Password
      </button>
    </div>
  );
}

function AppearanceSettings({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (t: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800">Appearance</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
            theme === "light"
              ? "bg-[#7B1E2D]/10 border-[#7B1E2D] text-[#7B1E2D]"
              : "hover:bg-gray-100 border-gray-300"
          }`}
        >
          <Sun className="w-5 h-5" /> Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
            theme === "dark"
              ? "bg-[#7B1E2D]/10 border-[#7B1E2D] text-[#7B1E2D]"
              : "hover:bg-gray-100 border-gray-300"
          }`}
        >
          <Moon className="w-5 h-5" /> Dark
        </button>
      </div>
    </div>
  );
}

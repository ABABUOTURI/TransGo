"use client";

import { useState } from "react";
import { User, Lock, Sliders, Moon, Sun, X } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("light");
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(
    null
  );

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "preferences", label: "Preferences", icon: <Sliders className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    { id: "appearance", label: "Appearance", icon: <Moon className="w-4 h-4" /> },
  ];

  // === Custom Alert Function ===
  const showAlert = (message: string, type: "success" | "error" = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 2500);
  };

  return (
    <div className="space-y-8 relative">
      <h1 className="text-2xl font-semibold text-[#7B1E2D]">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* === Sidebar Tabs === */}
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

        {/* === Main Settings Panel === */}
        <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6 text-white">
          {activeTab === "profile" && <ProfileSettings showAlert={showAlert} />}
          {activeTab === "preferences" && <SystemPreferences showAlert={showAlert} />}
          {activeTab === "security" && <SecuritySettings showAlert={showAlert} />}
          {activeTab === "appearance" && (
            <AppearanceSettings theme={theme} setTheme={setTheme} showAlert={showAlert} />
          )}
        </div>
      </div>

      {/* === Glassmorphism Alert === */}
      {alert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          <div className="bg-black/60 text-white px-6 py-5 rounded-2xl shadow-xl flex flex-col items-center gap-3 border border-white/10 animate-fadeIn w-[90%] max-w-sm">
            <p className="text-center text-sm">{alert.message}</p>
            <button
              onClick={() => setAlert(null)}
              className="bg-[#7B1E2D] hover:bg-[#8d2233] text-white px-4 py-1.5 rounded-lg transition text-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* === Subcomponents === */

function ProfileSettings({ showAlert }: { showAlert: (m: string, t?: "success" | "error") => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Profile Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border px-3 py-2 rounded-lg text-black focus:ring-2 focus:ring-[#7B1E2D] outline-none"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="border px-3 py-2 rounded-lg text-black focus:ring-2 focus:ring-[#7B1E2D] outline-none"
        />
      </div>
      <button
        onClick={() => showAlert("✅ Profile updated successfully!", "success")}
        className="mt-3 bg-[#7B1E2D] text-white px-4 py-2 rounded-lg hover:bg-[#641824] transition"
      >
        Save Changes
      </button>
    </div>
  );
}

function SystemPreferences({ showAlert }: { showAlert: (m: string, t?: "success" | "error") => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">System Preferences</h2>
      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" className="w-4 h-4 accent-[#7B1E2D]" />
        <span>Email notifications</span>
      </label>
      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" className="w-4 h-4 accent-[#7B1E2D]" />
        <span>Enable system logs</span>
      </label>
      <button
        onClick={() => showAlert("✅ Preferences saved!", "success")}
        className="mt-3 bg-[#7B1E2D] text-white px-4 py-2 rounded-lg hover:bg-[#641824] transition"
      >
        Save Preferences
      </button>
    </div>
  );
}

function SecuritySettings({ showAlert }: { showAlert: (m: string, t?: "success" | "error") => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Security</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="password"
          placeholder="Current Password"
          className="border px-3 py-2 rounded-lg text-black focus:ring-2 focus:ring-[#7B1E2D] outline-none"
        />
        <input
          type="password"
          placeholder="New Password"
          className="border px-3 py-2 rounded-lg text-black focus:ring-2 focus:ring-[#7B1E2D] outline-none"
        />
      </div>
      <button
        onClick={() => showAlert("🔐 Password updated successfully!", "success")}
        className="mt-3 bg-[#7B1E2D] text-white px-4 py-2 rounded-lg hover:bg-[#641824] transition"
      >
        Update Password
      </button>
    </div>
  );
}

function AppearanceSettings({
  theme,
  setTheme,
  showAlert,
}: {
  theme: string;
  setTheme: (t: string) => void;
  showAlert: (m: string, t?: "success" | "error") => void;
}) {
  const handleThemeChange = (mode: string) => {
    setTheme(mode);
    showAlert(`🌗 Switched to ${mode} mode`, "success");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Appearance</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleThemeChange("light")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
            theme === "light"
              ? "bg-[#7B1E2D]/10 border-[#7B1E2D] text-white"
              : "hover:bg-white/10 border-white/20 text-white/80"
          }`}
        >
          <Sun className="w-5 h-5" /> Light
        </button>
        <button
          onClick={() => handleThemeChange("dark")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
            theme === "dark"
              ? "bg-[#7B1E2D]/10 border-[#7B1E2D] text-white"
              : "hover:bg-white/10 border-white/20 text-white/80"
          }`}
        >
          <Moon className="w-5 h-5" /> Dark
        </button>
      </div>
    </div>
  );
}

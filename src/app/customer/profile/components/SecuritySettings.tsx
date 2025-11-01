"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Smartphone, Monitor } from "lucide-react";

export default function SecuritySettings() {
  const [twoFA, setTwoFA] = useState(false);

  const recentDevices = [
    { name: "Chrome on Windows", location: "Nairobi, Kenya", time: "2 hrs ago" },
    { name: "Safari on iPhone", location: "Mombasa, Kenya", time: "Yesterday" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white mt-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-4">Security Settings</h3>

      {/* 2FA Toggle */}
      <div className="flex items-center justify-between mb-5">
        <span>Two-Factor Authentication (2FA)</span>
        <button
          onClick={() => setTwoFA(!twoFA)}
          className={`px-3 py-1 rounded-lg border ${
            twoFA
              ? "bg-[#7B1E2D] border-[#7B1E2D]"
              : "bg-white/10 border-white/20"
          } transition`}
        >
          {twoFA ? "Enabled" : "Disabled"}
        </button>
      </div>

      {/* Recent Devices */}
      <div>
        <h4 className="text-sm text-gray-300 mb-3 flex items-center gap-2">
          <Shield size={16} /> Recent Login Devices
        </h4>
        <ul className="space-y-2 text-sm">
          {recentDevices.map((device, i) => (
            <li
              key={i}
              className="flex justify-between bg-white/10 border border-white/10 rounded-lg px-3 py-2 hover:bg-white/20 transition"
            >
              <div className="flex items-center gap-2">
                {device.name.includes("iPhone") ? (
                  <Smartphone size={16} />
                ) : (
                  <Monitor size={16} />
                )}
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-gray-300 text-xs">{device.location}</p>
                </div>
              </div>
              <span className="text-gray-400 text-xs">{device.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

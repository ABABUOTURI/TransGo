"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ProfileSettings({ onSaved }: { onSaved?: () => void }) {
  const [fleetName, setFleetName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    onSaved?.();
  }

  return (
    <motion.div>
      <form
        onSubmit={handleSave}
        className="space-y-5 max-w-3xl mx-auto px-2 sm:px-4"
      >
        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fleet / Company Name
            </label>
            <input
              value={fleetName}
              onChange={(e) => setFleetName(e.target.value)}
              className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#7B1E2D]"
              placeholder="TransGo Logistics Ltd"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Person
            </label>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#7B1E2D]"
              placeholder="John Mwangi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#7B1E2D]"
              placeholder="owner@fleet.co.ke"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#7B1E2D]"
              placeholder="+2547..."
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-24 h-24 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="logo"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-xs text-gray-400">Logo</div>
            )}
          </div>
          <div className="w-full sm:flex-1">
            <label className="text-sm text-gray-700">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogo}
              className="mt-2 w-full text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              PNG or JPEG — recommended 200×200
            </p>
          </div>
        </div>

        {/* Change Password */}
        <details className="bg-gray-50 p-4 rounded-lg">
          <summary className="cursor-pointer font-medium text-gray-700">
            Change password
          </summary>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="password"
              placeholder="Current password"
              className="border rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#7B1E2D]"
            />
            <input
              type="password"
              placeholder="New password"
              className="border rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#7B1E2D]"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="border rounded px-3 py-2 text-sm w-full sm:col-span-2 focus:outline-none focus:ring-1 focus:ring-[#7B1E2D]"
            />
          </div>
        </details>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-[#7B1E2D] text-white text-sm rounded-lg hover:bg-[#651926] transition w-full sm:w-auto"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

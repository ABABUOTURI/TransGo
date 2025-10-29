"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Upload } from "lucide-react";

export default function DriverProfilePage() {
  const [name, setName] = useState("John Mwangi");
  const [email, setEmail] = useState("driver@transgo.co.ke");
  const [phone, setPhone] = useState("+254712345678");
  const [license, setLicense] = useState("DL-2024-56489");
  const [photo, setPhoto] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    alert("Profile saved successfully (demo mode)");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <User className="w-6 h-6 text-[#7B1E2D]" />
        <h1 className="text-2xl font-semibold text-[#7B1E2D]">
          My Profile & Settings
        </h1>
      </div>
      <p className="text-gray-600">
        Manage your personal details and security information
      </p>

      {/* Profile form */}
      <form
        onSubmit={handleSave}
        className="space-y-6 bg-white rounded-xl shadow-sm border p-5"
      >
        {/* Profile photo */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border">
            {photo ? (
              <img
                src={photo}
                alt="Driver profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <User className="w-10 h-10 text-gray-400 absolute inset-0 m-auto" />
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm cursor-pointer bg-gray-50 hover:bg-gray-100 border rounded-lg px-3 py-2 transition">
              <Upload className="w-4 h-4 text-[#7B1E2D]" />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-400 mt-1">
              Max 2MB, formats: PNG/JPG
            </p>
          </div>
        </div>

        {/* Info fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              License Number
            </label>
            <input
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Password section */}
        <details className="bg-gray-50 p-3 rounded">
          <summary className="cursor-pointer font-medium text-gray-800">
            Change Password
          </summary>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="password"
              placeholder="Current password"
              className="border rounded px-3 py-2"
            />
            <input
              type="password"
              placeholder="New password"
              className="border rounded px-3 py-2"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="border rounded px-3 py-2 md:col-span-2"
            />
          </div>
        </details>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#7B1E2D] text-white rounded hover:bg-[#651926] transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

"use client";

import { useState, useRef } from "react";
import { User, Mail, Lock, Save, Camera, XCircle, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Legend");
  const [email, setEmail] = useState("admin@transgo.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      setAlert({ type: "error", message: "❌ Passwords do not match!" });
      return;
    }

    setEditing(false);
    setAlert({ type: "success", message: "✅ Profile updated successfully!" });

    // Hide alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* === Header === */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#7B1E2D]">Profile</h1>
        <p className="text-gray-600">Manage your admin account details</p>
      </div>

      {/* === Profile Card === */}
      <div className="bg-white shadow-md rounded-2xl p-6 max-w-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* === Avatar === */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-[#7B1E2D] text-white flex items-center justify-center text-3xl font-semibold overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile Avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                name.charAt(0)
              )}
            </div>

            {/* Upload overlay */}
            {editing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full"
                title="Change Avatar"
              >
                <Camera className="text-white" size={24} />
              </button>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* === Profile Info === */}
          <div className="flex-1 w-full">
            <form onSubmit={handleSave} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <div
                  className={`flex items-center mt-1 border rounded-lg px-3 py-2 ${
                    editing ? "border-[#7B1E2D]" : "border-gray-300"
                  }`}
                >
                  <User size={18} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly={!editing}
                    className={`w-full outline-none text-gray-800 bg-transparent ${
                      editing ? "cursor-text" : "cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div
                  className={`flex items-center mt-1 border rounded-lg px-3 py-2 ${
                    editing ? "border-[#7B1E2D]" : "border-gray-300"
                  }`}
                >
                  <Mail size={18} className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={!editing}
                    className={`w-full outline-none text-gray-800 bg-transparent ${
                      editing ? "cursor-text" : "cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <div
                  className={`flex items-center mt-1 border rounded-lg px-3 py-2 ${
                    editing ? "border-[#7B1E2D]" : "border-gray-300"
                  }`}
                >
                  <Lock size={18} className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    readOnly={!editing}
                    className={`w-full outline-none text-gray-800 bg-transparent ${
                      editing ? "cursor-text" : "cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              {editing && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="flex items-center mt-1 border border-[#7B1E2D] rounded-lg px-3 py-2">
                    <Lock size={18} className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full outline-none text-gray-800 bg-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end pt-4 gap-3">
                {!editing ? (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-[#7B1E2D] text-white rounded-lg hover:bg-[#8d2233] transition"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* === Custom Glassmorphism Alert === */}
      {alert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          <div className="bg-black/60 text-white px-6 py-5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 animate-fadeIn">
            {alert.type === "success" ? (
              <CheckCircle className="text-green-400 w-6 h-6" />
            ) : (
              <XCircle className="text-red-400 w-6 h-6" />
            )}
            <span className="text-sm">{alert.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

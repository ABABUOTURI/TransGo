"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";

export default function EditProfileForm() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "+254 712 345 678",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Profile updated (frontend only)");
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white mt-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {isEditing ? "Edit Profile" : "Profile Details"}
        </h3>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm bg-[#7B1E2D] hover:bg-[#9e2a3c] px-3 py-1 rounded-lg transition"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#7B1E2D]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#7B1E2D]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#7B1E2D]"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-gray-500/30 px-4 py-2 rounded-lg hover:bg-gray-500/50 transition"
            >
              <X size={16} /> Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-[#7B1E2D] px-4 py-2 rounded-lg hover:bg-[#9e2a3c] transition"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}
      </form>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export default function ProfileAvatarUpload() {
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white shadow-lg"
    >
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#7B1E2D] shadow-lg">
        {avatar ? (
          <img
            src={avatar}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/10 text-gray-400 text-sm">
            No Image
          </div>
        )}
        <label
          htmlFor="avatarUpload"
          className="absolute bottom-0 right-0 bg-[#7B1E2D] hover:bg-[#9e2a3c] p-2 rounded-full cursor-pointer transition"
        >
          <Camera size={16} />
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <p className="mt-3 text-sm text-gray-300">Tap to change profile photo</p>
    </motion.div>
  );
}

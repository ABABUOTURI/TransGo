"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit } from "lucide-react";

export default function ProfileInfo() {
  const [user] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "+254 712 345 678",
    role: "Customer",
    avatar: "/avatar.png", // placeholder in /public
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 text-white shadow-lg"
    >
      {/* Avatar */}
      <div className="relative">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white/20 object-cover"
        />
        <button
          className="absolute bottom-1 right-1 bg-[#7B1E2D] p-2 rounded-full hover:bg-[#9e2a3c] transition"
          title="Edit Profile"
        >
          <Edit size={16} />
        </button>
      </div>

      {/* User Info */}
      <div className="flex-1 space-y-2">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-300">{user.email}</p>
        <p className="text-gray-300">{user.phone}</p>
        <p className="text-sm text-gray-400 mt-1">Role: {user.role}</p>
      </div>
    </motion.div>
  );
}

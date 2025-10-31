"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-[#7B1E2D]/40",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${color} backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-lg 
      flex items-center justify-between hover:scale-[1.03] transition-transform duration-300`}
    >
      <div className="flex flex-col">
        <p className="text-sm text-gray-200">{title}</p>
        <h3 className="text-2xl font-semibold text-white mt-1">{value}</h3>
      </div>

      <div className="p-3 bg-white/10 rounded-xl">
        <Icon size={28} className="text-white" />
      </div>
    </motion.div>
  );
}

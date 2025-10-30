"use client";

import { motion } from "framer-motion";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  bg?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  change,
  bg = "bg-gray-50",
}: DashboardCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`p-5 rounded-xl shadow-sm border border-gray-200 ${bg} cursor-pointer hover:shadow-md transition`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-semibold text-[#7B1E2D] mt-1">{value}</p>
        </div>
        <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
      </div>

      <p className="text-xs text-gray-500 mt-3">{change}</p>
    </motion.div>
  );
}

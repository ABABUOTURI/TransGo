"use client";

import { motion } from "framer-motion";
import { Truck, Users, MapPinned, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardContent() {
  // === Mock Stats ===
  const stats = [
    { label: "Total Vehicles", value: 24, icon: Truck },
    { label: "Active Drivers", value: 18, icon: Users },
    { label: "Trips This Week", value: 52, icon: MapPinned },
    { label: "Revenue (KES)", value: "245,000", icon: DollarSign },
  ];

  // === Mock Data for Chart ===
  const tripData = [
    { day: "Mon", trips: 8 },
    { day: "Tue", trips: 12 },
    { day: "Wed", trips: 9 },
    { day: "Thu", trips: 15 },
    { day: "Fri", trips: 13 },
    { day: "Sat", trips: 6 },
    { day: "Sun", trips: 4 },
  ];

  return (
    // <div className="w-full flex justify-center ">
       <div className="w-fullflex justify-center pt-20 pb-10 px-4">
      {/* Main Content Wrapper */}
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-10 py-8">
        <h2 className="text-2xl font-semibold text-[#7B1E2D] mb-6 text-center">
          Fleet Overview
        </h2>

        {/* === Summary Cards === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center flex-col sm:flex-row sm:justify-start gap-4 hover:shadow-xl transition"
            >
              <div className="bg-[#7B1E2D]/10 text-[#7B1E2D] p-3 rounded-full">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-gray-500 text-sm">{item.label}</p>
                <p className="text-xl font-semibold">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* === Trips Chart === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-lg font-semibold text-[#7B1E2D] mb-4 text-center">
            Weekly Trips Overview
          </h3>

          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tripData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip
                    cursor={{ fill: "#f3f4f6" }}
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <Bar dataKey="trips" fill="#7B1E2D" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

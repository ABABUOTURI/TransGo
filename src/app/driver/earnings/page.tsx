"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import  StatsCard  from "../components/StatsCard";

export default function EarningsPage() {
  // Dummy earnings data
  const [earnings] = useState({
    totalEarnings: 1250,
    tripsCompleted: 42,
    pendingPayments: 150,
    lastMonthEarnings: 600,
    weeklyData: [
      { week: "Week 1", earnings: 120 },
      { week: "Week 2", earnings: 150 },
      { week: "Week 3", earnings: 180 },
      { week: "Week 4", earnings: 150 },
    ],
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-red-800">Earnings Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Earnings" value={`Ksh ${earnings.totalEarnings}`} />
        <StatsCard title="Trips Completed" value={earnings.tripsCompleted} />
        <StatsCard title="Pending Payments" value={`Ksh ${earnings.pendingPayments}`} />
        <StatsCard title="Last Month" value={`Ksh ${earnings.lastMonthEarnings}`} />
      </div>

      {/* Earnings Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-2xl shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Weekly Earnings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earnings.weeklyData}>
            <XAxis dataKey="week" stroke="#888888" />
            <YAxis />
            <Tooltip formatter={(value: number) => `Ksh ${value}`} />
            <Legend />
            <Bar dataKey="earnings" fill="#DC2626" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

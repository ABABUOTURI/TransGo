"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Wallet, MessageSquare } from "lucide-react";
import StatCard from "./components/StatCard";
import Link from "next/link";

export default function CustomerDashboard() {
  const [username, setUsername] = useState("John Doe");

  useEffect(() => {
    // TODO: Replace with JWT/localStorage user fetch
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  return (
    <main className="flex flex-col gap-6 p-6 md:p-10 bg-gradient-to-br from-[#2C0E0E] via-[#4B1A1A] to-[#7B1E2D] min-h-screen text-white">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-1xl font-semibold mb-1">Welcome back, {username} 👋</h1>
          <p className="text-gray-200 text-sm">
            Here’s what’s happening with your goods today
          </p>
        </div>

        <Link
          href="/customer/book"
          className="mt-3 sm:mt-0 bg-[#7B1E2D]/80 hover:bg-[#7B1E2D] text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          Book Transportation
        </Link>
      </motion.div>

      {/* Stats Overview */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Trips"
          value="3"
          icon={Truck}
          color="bg-[#7B1E2D]/40 backdrop-blur-md"
        />
        <StatCard
          title="Completed Trips"
          value="12"
          icon={MapPin}
          color="bg-[#7B1E2D]/40 backdrop-blur-md"
        />
        <StatCard
          title="Wallet Balance"
          value="KES 5,420"
          icon={Wallet}
          color="bg-[#7B1E2D]/40 backdrop-blur-md"
        />
        <StatCard
          title="Feedbacks"
          value="4"
          icon={MessageSquare}
          color="bg-[#7B1E2D]/40 backdrop-blur-md"
        />
      </section>

      {/* Recent Activity */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Recent Bookings</h2>
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg">
          <ul className="divide-y divide-gray-700/50">
            <li className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium">Busia → Nairobi</p>
                <p className="text-xs text-gray-300">Oct 25, 2025 - Pending</p>
              </div>
              <Link
                href="/customer/tracking"
                className="text-[#FFD700] hover:underline text-sm"
              >
                Track
              </Link>
            </li>
            <li className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium">Kisumu → Eldoret</p>
                <p className="text-xs text-gray-300">Oct 20, 2025 - Delivered</p>
              </div>
              <Link
                href="/customer/history"
                className="text-[#FFD700] hover:underline text-sm"
              >
                View
              </Link>
            </li>
            <li className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium">Nakuru → Kakamega</p>
                <p className="text-xs text-gray-300">Oct 18, 2025 - In Transit</p>
              </div>
              <Link
                href="/customer/tracking"
                className="text-[#FFD700] hover:underline text-sm"
              >
                Track
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Map Preview */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Live Map Overview</h2>
        <div className="w-full h-64 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg flex items-center justify-center text-gray-200">
          <p>Map preview (coming soon)</p>
        </div>
      </section>
    </main>
  );
}

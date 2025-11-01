"use client";

import { useState } from "react";
import TripCard from "./components/TripCard";
import TripDetailsModal from "./components/TripDetailsModal";
import { motion } from "framer-motion";

export default function TripHistoryPage() {
  const [filter, setFilter] = useState<"all" | "completed" | "ongoing" | "canceled">("all");
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);

  const trips = [
    {
      id: 1,
      from: "Nairobi",
      to: "Mombasa",
      date: "Oct 25, 2025",
      status: "completed",
      amount: "KES 12,500",
      truck: "Isuzu FSR",
      driver: "Peter Kamau",
      duration: "8h 20m",
    },
    {
      id: 2,
      from: "Kisumu",
      to: "Nakuru",
      date: "Oct 29, 2025",
      status: "ongoing",
      amount: "KES 9,000",
      truck: "Mitsubishi Canter",
      driver: "Samuel Mwangi",
      duration: "5h 45m",
    },
    {
      id: 3,
      from: "Eldoret",
      to: "Nairobi",
      date: "Oct 18, 2025",
      status: "canceled",
      amount: "KES 10,000",
      truck: "Hino 500",
      driver: "James Odhiambo",
      duration: "—",
    },
  ];

  const filteredTrips = filter === "all"
    ? trips
    : trips.filter((t) => t.status === filter);

  return (
    <main className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
      <section className="max-w-5xl mx-auto space-y-6">
        {/* === Header === */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#7B1E2D]">
            Trip History
          </h1>

          {/* === Filters === */}
          <div className="flex items-center gap-3">
            {["all", "completed", "ongoing", "canceled"].map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-xl capitalize transition ${
                  filter === key
                    ? "bg-[#7B1E2D] text-white"
                    : "bg-white text-[#7B1E2D] border border-[#7B1E2D]"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* === Trip Cards === */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTrips.map((trip) => (
            <motion.div key={trip.id} layout>
              <TripCard trip={trip} onClick={() => setSelectedTrip(trip)} />
            </motion.div>
          ))}
        </motion.div>

        {/* === Modal === */}
        {selectedTrip && (
          <TripDetailsModal
            trip={selectedTrip}
            onClose={() => setSelectedTrip(null)}
          />
        )}
      </section>
    </main>
  );
}

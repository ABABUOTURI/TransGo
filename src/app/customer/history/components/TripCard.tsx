"use client";

import { Truck } from "lucide-react";

export default function TripCard({ trip, onClick }: any) {
  const statusColor =
    trip.status === "completed"
      ? "bg-green-500/20 text-green-600"
      : trip.status === "ongoing"
      ? "bg-blue-500/20 text-blue-600"
      : "bg-red-500/20 text-red-600";

  return (
    <div
      onClick={onClick}
      className="p-5 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer transition"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 bg-[#7B1E2D]/30 rounded-full">
          <Truck className="text-[#7B1E2D]" size={22} />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-[#7B1E2D]">
            {trip.from} → {trip.to}
          </h3>
          <p className="text-sm text-gray-500">{trip.date}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {trip.amount}
        </p>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
          {trip.status}
        </span>
      </div>
    </div>
  );
}

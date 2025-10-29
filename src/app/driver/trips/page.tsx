"use client";

import { useState } from "react";
import TripCard from "../components/TripCard";

export default function TripsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const trips = [
    { id: "T001", origin: "Nairobi", destination: "Mombasa", status: "In Transit", date: "2025-10-25" },
    { id: "T002", origin: "Kisumu", destination: "Eldoret", status: "Delivered", date: "2025-10-22" },
    { id: "T003", origin: "Nakuru", destination: "Nairobi", status: "Delivered", date: "2025-10-19" },
    { id: "T004", origin: "Thika", destination: "Nyeri", status: "Pending", date: "2025-10-28" },
  ];

  const filteredTrips = trips.filter((trip) => {
    const matchesFilter = filter === "All" || trip.status === filter;
    const matchesSearch =
      trip.destination.toLowerCase().includes(search.toLowerCase()) ||
      trip.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#7B1E2D]">My Trips</h1>
        <p className="text-gray-600">View and manage all your assigned trips</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          type="text"
          placeholder="Search trips by ID or destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/2"
        />

        <div className="flex gap-2">
          {["All", "In Transit", "Delivered", "Pending"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded text-sm font-medium ${
                filter === s
                  ? "bg-[#7B1E2D] text-white"
                  : "bg-white border text-gray-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Trips List */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTrips.map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          No trips found for this filter.
        </div>
      )}
    </div>
  );
}

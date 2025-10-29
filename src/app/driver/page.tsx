"use client";

import StatsCard from "./components/StatsCard";
import TripCard from "./components/TripCard";

export default function DriverDashboard() {
  // Dummy summary stats
  const stats = [
    { title: "Total Earnings", value: "KES 82,400"},
    { title: "Completed Trips", value: "128" },
    { title: "Ongoing Trips", value: "2" },
    { title: "Distance Covered", value: "54,200 km",},
  ];

  // Dummy recent trips
  const trips = [
    {
      id: "T001",
      origin: "Nairobi",
      destination: "Mombasa",
      status: "In Transit",
      date: "2025-10-25",
    },
    {
      id: "T002",
      origin: "Kisumu",
      destination: "Eldoret",
      status: "Delivered",
      date: "2025-10-22",
    },
    {
      id: "T003",
      origin: "Nakuru",
      destination: "Nairobi",
      status: "Delivered",
      date: "2025-10-19",
    },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#7B1E2D]">
          Driver Dashboard
        </h1>
        <p className="text-gray-600">Overview of your recent activity</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={i} title={s.title} value={s.value}  />
        ))}
      </div>

      {/* Recent Trips */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Recent Trips
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {trips.map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

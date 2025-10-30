"use client";

import { useState } from "react";
import { Search, MoreVertical, Truck } from "lucide-react";

export default function TripTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const trips = [
    {
      id: "T001",
      customer: "John Mwangi",
      origin: "Nairobi",
      destination: "Mombasa",
      driver: "Peter Otieno",
      status: "Delivered",
      date: "2025-09-20",
    },
    {
      id: "T002",
      customer: "Mary Achieng",
      origin: "Kisumu",
      destination: "Nakuru",
      driver: "James Kiptoo",
      status: "In Transit",
      date: "2025-09-22",
    },
    {
      id: "T003",
      customer: "David Kamau",
      origin: "Eldoret",
      destination: "Nairobi",
      driver: "Lucy Njeri",
      status: "Pending",
      date: "2025-09-24",
    },
    {
      id: "T004",
      customer: "Alice Chebet",
      origin: "Nairobi",
      destination: "Kisii",
      driver: "Joseph Mwangi",
      status: "Cancelled",
      date: "2025-09-25",
    },
  ];

  const filtered = trips.filter((trip) => {
    const matchesSearch =
      trip.id.toLowerCase().includes(search.toLowerCase()) ||
      trip.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    Delivered: "bg-green-100 text-green-700",
    "In Transit": "bg-yellow-100 text-yellow-700",
    Pending: "bg-gray-100 text-gray-600",
    Cancelled: "bg-red-100 text-red-700",
  };

  const statuses = ["All", "Pending", "In Transit", "Delivered", "Cancelled"];

  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search */}
        <div className="flex items-center gap-3 border rounded-lg px-3 py-2 w-full md:w-1/3">
          <Search className="w-4 h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search by Trip ID or Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm bg-gray-400 text-white px-2 py-2 border rounded-lg"
          />
        </div>

        {/* Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none bg-gray-400 text-white"
          >
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left bg-[#7B1E2D] ">
              <th className="p-3 font-medium text-white">Trip ID</th>
              <th className="p-3 font-medium text-white">Customer</th>
              <th className="p-3 font-medium text-white">Origin</th>
              <th className="p-3 font-medium text-white">Destination</th>
              <th className="p-3 font-medium text-white">Driver</th>
              <th className="p-3 font-medium text-white">Status</th>
              <th className="p-3 font-medium text-white">Date</th>
              <th className="p-3 font-medium text-white text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((trip) => (
              <tr key={trip.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="p-3 font-medium text-gray-800">{trip.id}</td>
                <td className="p-3 text-gray-700">{trip.customer}</td>
                <td className="p-3 text-gray-700">{trip.origin}</td>
                <td className="p-3 text-gray-700">{trip.destination}</td>
                <td className="p-3 text-gray-700">{trip.driver}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[trip.status]
                    }`}
                  >
                    {trip.status}
                  </span>
                </td>
                <td className="p-3 text-gray-600">{trip.date}</td>
                <td className="p-3 text-right">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-6">No trips found</p>
        )}
      </div>
    </div>
  );
}

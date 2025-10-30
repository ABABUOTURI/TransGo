"use client";

import { useState } from "react";
import { Search, MoreVertical, CheckCircle, XCircle, Truck } from "lucide-react";

export default function FleetTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fleetData = [
    {
      id: "F001",
      owner: "Alpha Logistics",
      contact: "+254712345678",
      trucks: 12,
      status: "Verified",
      location: "Nairobi",
    },
    {
      id: "F002",
      owner: "BlueLine Movers",
      contact: "+254798765432",
      trucks: 5,
      status: "Pending",
      location: "Mombasa",
    },
    {
      id: "F003",
      owner: "TransSmart Ltd",
      contact: "+254700223344",
      trucks: 8,
      status: "Suspended",
      location: "Kisumu",
    },
  ];

  const filtered = fleetData.filter((fleet) => {
    const matchesSearch =
      fleet.owner.toLowerCase().includes(search.toLowerCase()) ||
      fleet.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || fleet.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statuses = ["All", "Verified", "Pending", "Suspended"];
  const statusColors: Record<string, string> = {
    Verified: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Suspended: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search */}
        <div className="flex items-center gap-3 border rounded-lg px-3 py-2 w-full md:w-1/3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search fleet by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm bg-gray-400 text-white px-2 py-2 border -rounded-lg"
          />
        </div>

        {/* Filter */}
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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
            <tr className="text-left bg-[#7B1E2D]">
              <th className="p-3 font-medium text-white">Fleet ID</th>
              <th className="p-3 font-medium text-white">Owner</th>
              <th className="p-3 font-medium text-white">Contact</th>
              <th className="p-3 font-medium text-white">Location</th>
              <th className="p-3 font-medium text-white">Trucks</th>
              <th className="p-3 font-medium text-white">Status</th>
              <th className="p-3 font-medium text-white text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((fleet) => (
              <tr key={fleet.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 font-medium text-gray-800">{fleet.id}</td>
                <td className="p-3 text-gray-700">{fleet.owner}</td>
                <td className="p-3 text-gray-700">{fleet.contact}</td>
                <td className="p-3 text-gray-700">{fleet.location}</td>
                <td className="p-3 text-gray-700">{fleet.trucks}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[fleet.status]
                    }`}
                  >
                    {fleet.status}
                  </span>
                </td>
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
          <p className="text-center text-gray-500 py-6">No fleets found</p>
        )}
      </div>
    </div>
  );
}

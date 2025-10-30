"use client";

import { useState } from "react";
import { Search, MoreVertical, CheckCircle, XCircle } from "lucide-react";

export default function PaymentTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Dummy Data
  const payments = [
    {
      id: "TX001",
      user: "Jane Mwangi",
      method: "M-Pesa",
      amount: "KES 15,000",
      status: "Completed",
      date: "2025-10-26",
    },
    {
      id: "TX002",
      user: "Alpha Logistics",
      method: "Card",
      amount: "KES 45,500",
      status: "Pending",
      date: "2025-10-27",
    },
    {
      id: "TX003",
      user: "TransSmart Ltd",
      method: "Bank Transfer",
      amount: "KES 22,000",
      status: "Failed",
      date: "2025-10-28",
    },
  ];

  // Filters
  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.user.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statuses = ["All", "Completed", "Pending", "Failed"];
  const statusColors: Record<string, string> = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search Input */}
        <div className="flex items-center gap-3 border rounded-lg px-3 py-2 w-full md:w-1/3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search payment by user or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm bg-gray-400 text-white border rounded-lg px-2 py-2"
          />
        </div>

        {/* Filter Dropdown */}
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none bg-gray-400"
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
              <th className="p-3 font-medium text-white">Transaction ID</th>
              <th className="p-3 font-medium text-white">User</th>
              <th className="p-3 font-medium text-white">Method</th>
              <th className="p-3 font-medium text-white">Amount</th>
              <th className="p-3 font-medium text-white">Date</th>
              <th className="p-3 font-medium text-white">Status</th>
              <th className="p-3 font-medium text-white text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 font-medium text-gray-800">{p.id}</td>
                <td className="p-3 text-gray-700">{p.user}</td>
                <td className="p-3 text-gray-700">{p.method}</td>
                <td className="p-3 text-gray-700">{p.amount}</td>
                <td className="p-3 text-gray-700">{p.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[p.status]
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  {p.status === "Pending" ? (
                    <button className="flex items-center gap-1 text-green-600 hover:underline text-xs">
                      <CheckCircle className="w-4 h-4" /> Verify
                    </button>
                  ) : (
                    <button className="p-2 hover:bg-gray-100 rounded-full transition">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-6">No payments found</p>
        )}
      </div>
    </div>
  );
}

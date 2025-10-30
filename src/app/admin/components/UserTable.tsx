"use client";

import { useState } from "react";
import { Search, MoreVertical, User, ShieldCheck } from "lucide-react";

export default function UserTable() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const users = [
    {
      id: "U001",
      name: "John Mwangi",
      email: "john@example.com",
      role: "Customer",
      status: "Active",
      joined: "2025-05-10",
    },
    {
      id: "U002",
      name: "Mary Achieng",
      email: "mary@example.com",
      role: "Driver",
      status: "Suspended",
      joined: "2025-07-22",
    },
    {
      id: "U003",
      name: "James Kiptoo",
      email: "james@example.com",
      role: "Fleet Owner",
      status: "Active",
      joined: "2025-08-05",
    },
    {
      id: "U004",
      name: "Lucy Njeri",
      email: "lucy@example.com",
      role: "Customer",
      status: "Pending",
      joined: "2025-09-01",
    },
  ];

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  const roles = ["All", "Customer", "Driver", "Fleet Owner"];
  const statuses = ["All", "Active", "Suspended", "Pending"];

  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search */}
        <div className="flex items-center gap-3 border rounded-lg px-3 py-2 w-full md:w-1/3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none bg-white"
          >
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none bg-white"
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-3 font-medium text-gray-700">User ID</th>
              <th className="p-3 font-medium text-gray-700">Name</th>
              <th className="p-3 font-medium text-gray-700">Email</th>
              <th className="p-3 font-medium text-gray-700">Role</th>
              <th className="p-3 font-medium text-gray-700">Status</th>
              <th className="p-3 font-medium text-gray-700">Joined</th>
              <th className="p-3 font-medium text-gray-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 font-medium text-gray-800">{user.id}</td>
                <td className="p-3 flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4 text-gray-500" />
                  {user.name}
                </td>
                <td className="p-3 text-gray-700">{user.email}</td>
                <td className="p-3 text-gray-700">{user.role}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3 text-gray-600">{user.joined}</td>
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
          <p className="text-center text-gray-500 py-6">No users found</p>
        )}
      </div>
    </div>
  );
}

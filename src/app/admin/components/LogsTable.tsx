"use client";

import { useState } from "react";
import { Search, ShieldAlert, UserCog, Truck, FileText } from "lucide-react";

export default function LogsTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Dummy Log Data
  const logs = [
    {
      id: 1,
      user: "Admin1",
      role: "Super Admin",
      action: "Created new driver account",
      category: "Drivers",
      date: "2025-10-27 10:30 AM",
      severity: "Info",
    },
    {
      id: 2,
      user: "Admin2",
      role: "Moderator",
      action: "Deleted trip record #T001",
      category: "Trips",
      date: "2025-10-26 04:00 PM",
      severity: "Warning",
    },
    {
      id: 3,
      user: "System",
      role: "Automated Process",
      action: "Detected failed login attempt",
      category: "Security",
      date: "2025-10-28 02:12 AM",
      severity: "Critical",
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || log.severity === filter;
    return matchesSearch && matchesFilter;
  });

  const severities = ["All", "Info", "Warning", "Critical"];
  const severityColors: Record<string, string> = {
    Info: "bg-blue-100 text-blue-700",
    Warning: "bg-yellow-100 text-yellow-700",
    Critical: "bg-red-100 text-red-700",
  };

  const categoryIcons: Record<string, JSX.Element> = {
    Drivers: <Truck className="w-4 h-4 text-gray-500" />,
    Trips: <FileText className="w-4 h-4 text-gray-500" />,
    Security: <ShieldAlert className="w-4 h-4 text-gray-500" />,
    Default: <UserCog className="w-4 h-4 text-gray-500" />,
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3 border rounded-lg px-3 py-2 w-full md:w-1/3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search logs by user or action..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm bg-gray-400 border rounded-lg px-2 py-2"
          />
        </div>

        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none bg-gray-400"
          >
            {severities.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left bg-[#7B1E2D]">
              <th className="p-3 font-medium text-white">User</th>
              <th className="p-3 font-medium text-white">Role</th>
              <th className="p-3 font-medium text-white">Action</th>
              <th className="p-3 font-medium text-white">Category</th>
              <th className="p-3 font-medium text-white">Date</th>
              <th className="p-3 font-medium text-white">Severity</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 font-medium text-gray-800">{log.user}</td>
                <td className="p-3 text-gray-700">{log.role}</td>
                <td className="p-3 text-gray-700">{log.action}</td>
                <td className="p-3 text-gray-700 flex items-center gap-2">
                  {categoryIcons[log.category] || categoryIcons.Default}
                  {log.category}
                </td>
                <td className="p-3 text-gray-700">{log.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      severityColors[log.severity]
                    }`}
                  >
                    {log.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {filteredLogs.length === 0 && (
          <p className="text-center text-gray-500 py-6">No logs found</p>
        )}
      </div>
    </div>
  );
}

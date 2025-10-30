"use client";

import { ListFilter } from "lucide-react";
import LogsTable from "../components/LogsTable";

export default function LogsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">System Logs</h1>
          <p className="text-sm text-gray-500">
            Monitor admin activities, user changes, and security events across the TransGo system.
          </p>
        </div>

        {/* <button className="flex items-center gap-2 bg-[#7B1E2D] text-white px-4 py-2 rounded-lg hover:bg-[#641824] transition">
          <ListFilter className="w-4 h-4" /> Filter Logs
        </button> */}
      </div>

      {/* Logs Table */}
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <LogsTable />
      </div>
    </div>
  );
}

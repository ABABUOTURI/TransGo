"use client";

import { Truck, Filter } from "lucide-react";
import FleetTable from "../components/FleetTable";

export default function FleetPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Fleet Management</h1>
          <p className="text-sm text-gray-500">
            View and manage registered fleet owners and their trucks.
          </p>
        </div>

        {/* <button className="flex items-center gap-2 bg-[#7B1E2D] text-white px-4 py-2 rounded-lg hover:bg-[#641824] transition">
          <Filter className="w-4 h-4" /> Filter Options
        </button> */}
      </div>

      {/* Table Section */}
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <FleetTable />
      </div>
    </div>
  );
}

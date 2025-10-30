"use client";

import TripTable from "../components/TripTable";
import { Truck, Filter } from "lucide-react";

export default function TripsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Trips Management</h1>
          <p className="text-sm text-gray-500">
            View, filter, and track all deliveries across TransGo.
          </p>
        </div>

        {/* <button className="flex items-center gap-2 bg-[#7B1E2D] text-white px-4 py-2 rounded-lg hover:bg-[#641824] transition">
          <Filter className="w-4 h-4" /> Filter Options
        </button> */}
      </div>

      {/* Trip Table */}
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <TripTable />
      </div>
    </div>
  );
}

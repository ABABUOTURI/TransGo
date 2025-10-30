"use client";

import UserTable from "../components/UserTable";
import { Users, Filter } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500">
            View, filter, and manage all TransGo users.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#7B1E2D] text-white px-2 py-2 rounded-lg hover:bg-[#641824] transition">
          <Filter className="w-2 h-2" /> Filter Options
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <UserTable />
      </div>
    </div>
  );
}

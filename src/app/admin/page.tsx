"use client";

import DashboardCard from "../admin/components/DashboardCard";
import { Users, Truck, CreditCard, MapPin } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      icon: <Users className="w-5 h-5 text-[#7B1E2D]" />,
      color: "bg-red-50",
    },
    {
      title: "Active Trips",
      value: "84",
      icon: <MapPin className="w-5 h-5 text-[#7B1E2D]" />,
      color: "bg-yellow-50",
    },
    {
      title: "Registered Trucks",
      value: "312",
      icon: <Truck className="w-5 h-5 text-[#7B1E2D]" />,
      color: "bg-blue-50",
    },
    {
      title: "Total Revenue",
      value: "$18,560",
      icon: <CreditCard className="w-5 h-5 text-[#7B1E2D]" />,
      color: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of TransGo system statistics and performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      {/* Placeholder for charts or analytics */}
      <div className="mt-10 bg-white border rounded-xl shadow-sm p-6 text-center text-gray-500">
        📊 Analytics & Reports will appear here.
      </div>
    </div>
  );
}

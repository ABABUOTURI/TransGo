"use client";

import {
  Users,
  Truck,
  CreditCard,
  Activity,
  Bell,
  Settings,
  FileText,
} from "lucide-react";
import DashboardCard from "../components/DashboardCard";

export default function AdminDashboardPage() {
  const stats = [
    {
      id: 1,
      title: "Total Users",
      value: "1,245",
      icon: <Users className="w-6 h-6 text-[#7B1E2D]" />,
      change: "+12% this month",
      bg: "bg-pink-50",
    },
    {
      id: 2,
      title: "Active Trips",
      value: "87",
      icon: <Truck className="w-6 h-6 text-[#7B1E2D]" />,
      change: "+5 since yesterday",
      bg: "bg-yellow-50",
    },
    {
      id: 3,
      title: "Total Revenue",
      value: "KES 2.4M",
      icon: <CreditCard className="w-6 h-6 text-[#7B1E2D]" />,
      change: "+8% growth",
      bg: "bg-green-50",
    },
    {
      id: 4,
      title: "System Logs",
      value: "452",
      icon: <FileText className="w-6 h-6 text-[#7B1E2D]" />,
      change: "Updated hourly",
      bg: "bg-blue-50",
    },
  ];

  const recentActivity = [
    { message: "New driver registered (James Kariuki)", time: "2m ago" },
    { message: "Trip #T078 marked as delivered", time: "30m ago" },
    { message: "Payment received for Trip #T045", time: "1h ago" },
    { message: "New announcement published", time: "3h ago" },
  ];

  return (
    <div className="space-y-8">
      {/* === Page Title === */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-[#7B1E2D]">
          Admin Dashboard
        </h1>
        
      </div>

      {/* === Dashboard Cards Section === */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <DashboardCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            bg={stat.bg}
          />
        ))}
      </div>

      {/* === Recent Activity === */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-[#7B1E2D] mb-4">
          Recent Activity
        </h2>

        {recentActivity.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {recentActivity.map((activity, index) => (
              <li
                key={index}
                className="py-3 flex items-center justify-between text-gray-700"
              >
                <span>{activity.message}</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No recent activity.</p>
        )}
      </div>

      {/* === Quick Links === */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickLink
          title="Manage Users"
          description="View, edit or remove users"
          icon={<Users className="w-5 h-5" />}
          href="/admin/users"
        />
        <QuickLink
          title="Manage Trips"
          description="Monitor active and completed trips"
          icon={<Truck className="w-5 h-5" />}
          href="/admin/trips"
        />
        <QuickLink
          title="View Payments"
          description="Check transaction history"
          icon={<CreditCard className="w-5 h-5" />}
          href="/admin/payments"
        />
      </div>
    </div>
  );
}

/* === Reusable QuickLink Card === */
function QuickLink({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="p-5 border border-gray-200 rounded-xl bg-white hover:shadow-md transition flex items-start gap-3"
    >
      <div className="p-3 bg-[#7B1E2D]/10 rounded-lg text-[#7B1E2D]">{icon}</div>
      <div>
        <h3 className="font-semibold text-[#7B1E2D]">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </a>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userRole");
      if (role !== "admin") {
        router.replace("/login"); // use replace to prevent back nav
      } else {
        setIsVerified(true); // user is admin
      }
    }
  }, [router]);

  // ⏳ Show loading while verifying
  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700">
        Checking admin credentials...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex flex-col">
      {/* === Top Bar === */}
      <header className="w-full bg-red-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">TransGo Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("userRole");
            router.push("/login");
          }}
          className="bg-white text-red-800 font-semibold px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
        >
          Logout
        </button>
      </header>

      {/* === Main Content === */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, Admin 👋
        </h2>
        <p className="text-gray-600 max-w-md">
          This is your main admin dashboard. From here you’ll be able to manage
          users, trips, fleet data, and view system reports.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Registered Users
            </h3>
            <p className="text-2xl font-bold text-gray-800">324</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Active Trips
            </h3>
            <p className="text-2xl font-bold text-gray-800">58</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Fleet Owners
            </h3>
            <p className="text-2xl font-bold text-gray-800">42</p>
          </div>
        </div>
      </main>

      {/* === Footer === */}
      <footer className="bg-red-800 text-white text-sm py-3 text-center">
        © {new Date().getFullYear()} TransGo Admin Panel. All rights reserved.
      </footer>
    </div>
  );
}

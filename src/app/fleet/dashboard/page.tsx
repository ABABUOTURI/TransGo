"use client";

import { useState } from "react";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import DashboardContent from "./components/DashboardContent";
import VehiclesContent from "./components/VehiclesContent";
import DriversContent from "./components/DriversContent";
import TripsContent from "./components/TripsContent";
import SettingsContent from "./components/settings/SettingsContent";

export default function FleetDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "vehicles":
        return <VehiclesContent />;
      case "drivers":
        return <DriversContent />;
      case "trips":
        return <TripsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <TopNav setSidebarOpen={setSidebarOpen} />
        <main className="p-6 flex-1">{renderContent()}</main>
      </div>
    </div>
  );
}

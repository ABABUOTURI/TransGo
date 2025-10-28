"use client";

import { useState } from "react";

export default function FleetPreferences({ onSaved }: { onSaved?: () => void }) {
  const [defaultView, setDefaultView] = useState<"map" | "list">("map");
  const [maintenanceReminderDays, setMaintenanceReminderDays] = useState<number>(30);
  const [showInactiveVehicles, setShowInactiveVehicles] = useState(true);
  const [timezone, setTimezone] = useState("Africa/Nairobi");

  function save(e: React.FormEvent) {
    e.preventDefault();
    onSaved?.(); // simulate save
  }

  return (
    <form onSubmit={save} className="space-y-6">
      {/* === Default View === */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Default View
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="button"
            onClick={() => setDefaultView("map")}
            className={`flex-1 min-w-[120px] px-3 py-2 text-sm rounded-lg transition-all ${
              defaultView === "map"
                ? "bg-[#7B1E2D] text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => setDefaultView("list")}
            className={`flex-1 min-w-[120px] px-3 py-2 text-sm rounded-lg transition-all ${
              defaultView === "list"
                ? "bg-[#7B1E2D] text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* === Maintenance Reminder === */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maintenance Reminder (days)
        </label>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="number"
            value={maintenanceReminderDays}
            onChange={(e) => setMaintenanceReminderDays(Number(e.target.value || 0))}
            className="border rounded-lg px-3 py-2 w-full sm:w-40 text-sm"
          />
          <p className="text-xs text-gray-500 sm:ml-2">
            Fleet-wide reminder for scheduled maintenance.
          </p>
        </div>
      </div>

      {/* === Inactive Vehicles Toggle === */}
      <div className="flex items-start sm:items-center gap-3">
        <input
          id="showInactive"
          type="checkbox"
          checked={showInactiveVehicles}
          onChange={(e) => setShowInactiveVehicles(e.target.checked)}
          className="mt-1 sm:mt-0 accent-[#7B1E2D]"
        />
        <label htmlFor="showInactive" className="text-sm text-gray-700 leading-snug">
          Show inactive or maintenance vehicles in lists
        </label>
      </div>

      {/* === Timezone Selection === */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Timezone
        </label>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="mt-2 border rounded-lg px-3 py-2 text-sm w-full sm:w-64"
        >
          <option>Africa/Nairobi</option>
          <option>UTC</option>
          <option>Europe/London</option>
          <option>America/New_York</option>
        </select>
      </div>

      {/* === Save Button === */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2.5 bg-[#7B1E2D] text-white text-sm font-medium rounded-lg hover:bg-[#651926] transition-all"
        >
          Save Preferences
        </button>
      </div>
    </form>
  );
}

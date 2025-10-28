"use client";

import { useState } from "react";

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded p-3">
      <div className="text-sm text-gray-700">{label}</div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#7B1E2D] transition-all"></div>
      </label>
    </div>
  );
}

export default function NotificationSettings({ onSaved }: { onSaved?: () => void }) {
  const [tripUpdates, setTripUpdates] = useState(true);
  const [driverAssignment, setDriverAssignment] = useState(true);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  function save(e: React.FormEvent) {
    e.preventDefault();
    onSaved?.();
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <Toggle checked={tripUpdates} onChange={setTripUpdates} label="Trip updates (start / en-route / delivered)" />
      <Toggle checked={driverAssignment} onChange={setDriverAssignment} label="Driver assignment updates" />
      <Toggle checked={maintenanceAlerts} onChange={setMaintenanceAlerts} label="Maintenance alerts & reminders" />
      <Toggle checked={weeklyReport} onChange={setWeeklyReport} label="Weekly performance report (email)" />

      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-[#7B1E2D] text-white rounded hover:bg-[#651926]">Save Notifications</button>
      </div>
    </form>
  );
}

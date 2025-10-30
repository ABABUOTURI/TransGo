"use client";

export default function SubscriptionCard({ onContact }: { onContact?: () => void }) {
  // mock details
  const plan = "Starter";
  const renewal = "2025-11-15";

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-xl shadow flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Current plan</div>
          <div className="text-lg font-semibold text-[#7B1E2D]">{plan}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Renews</div>
          <div className="font-medium">{renewal}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-sm text-gray-600">Upgrade to a higher plan for more vehicles, advanced tracking, and priority support.</p>
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 bg-[#7B1E2D] text-white rounded">Upgrade</button>
          <button onClick={() => onContact?.()} className="px-4 py-2 border rounded">Contact Support</button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function TripCard({
  trip,
}: {
  trip: {
    id: string;
    origin: string;
    destination: string;
    status: string;
    date: string;
  };
}) {
  const router = useRouter();

  const statusColors: Record<string, string> = {
    Delivered: "bg-green-100 text-green-700",
    "In Transit": "bg-yellow-100 text-yellow-700",
    Pending: "bg-gray-100 text-gray-600",
  };

  const handleClick = () => {
    // Navigate to trip details page
    router.push(`/trips/${trip.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded-lg bg-white shadow-sm p-4 flex flex-col justify-between 
      cursor-pointer hover:shadow-md hover:border-[#7B1E2D] transition-all duration-200"
    >
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">
            Trip #{trip.id}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded ${statusColors[trip.status]}`}
          >
            {trip.status}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-1">
          {trip.origin} → {trip.destination}
        </p>
      </div>

      <p className="text-xs text-gray-400 mt-3">Date: {trip.date}</p>
    </div>
  );
}

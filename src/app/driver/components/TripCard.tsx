"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showAlert, setShowAlert] = useState(false);

  const statusColors: Record<string, string> = {
    Delivered: "bg-green-100 text-green-700",
    "In Transit": "bg-yellow-100 text-yellow-700",
    Pending: "bg-gray-100 text-gray-600",
  };

  const handleClick = () => {
    // Show custom alert before navigation
    setShowAlert(true);

    // Navigate after short delay
    setTimeout(() => {
      setShowAlert(false);
      router.push(`/trips/${trip.id}`);
    }, 1200);
  };

  return (
    <>
      {/* === Trip Card === */}
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

      {/* === Custom Glassmorphism Alert === */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 
            bg-black/40 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-lg 
            border border-white/10 z-50 text-sm"
          >
            Opening Trip #{trip.id}...
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

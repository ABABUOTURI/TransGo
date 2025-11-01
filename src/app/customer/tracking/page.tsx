"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Truck, Clock, User, Phone } from "lucide-react";
import TrackingDetails from "./components/TrackingDetails";

const LiveMap = dynamic(() => import("./components/LiveMap"), { ssr: false });

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [showTracking, setShowTracking] = useState(false);

  const handleTrack = () => {
    if (trackingId.trim() !== "") {
      setShowTracking(true);
    }
  };

  return (
    <main className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
      <section className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* === PAGE HEADER === */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#7B1E2D]">
            Track Your Shipment
          </h1>

          {/* Tracking input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Tracking ID..."
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300 w-60 focus:outline-none focus:ring-2 focus:ring-[#7B1E2D]"
            />
            <button
              onClick={handleTrack}
              className="px-4 py-2 rounded-xl bg-[#7B1E2D] text-white hover:bg-[#5e1622] transition"
            >
              Track
            </button>
          </div>
        </div>

        {/* === MAP + DETAILS === */}
        {showTracking ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* MAP VIEW */}
            <div className="lg:col-span-2">
              <LiveMap trackingId={trackingId} />
            </div>

            {/* DETAILS */}
            <TrackingDetails
              driver={{
                name: "James Otieno",
                phone: "+254 712 345 678",
              }}
              truck={{
                number: "KCE 457P",
                type: "12-Ton Cargo Truck",
              }}
              shipment={{
                status: "En Route",
                eta: "45 mins",
                location: "Kisumu Highway",
              }}
            />
          </motion.div>
        ) : (
          <div className="text-gray-600 text-center mt-10 italic">
            Enter a valid tracking ID to view your shipment location.
          </div>
        )}
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import BookingForm from "./components/BookingForm";
import { motion } from "framer-motion";

// Lazy load Mapbox to prevent SSR issues
const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

export default function BookPage() {
  const [pickupCoord, setPickupCoord] = useState<[number, number] | null>(null);
  const [destinationCoord, setDestinationCoord] = useState<[number, number] | null>(null);
  const [routeInfo, setRouteInfo] = useState<any>(null);

  return (
    <main className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-[#2e010a] via-[#7B1E2D]/60 to-black/90 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left"
      >
        Book a Trip
      </motion.h1>

      {/* Responsive layout: Form + Map */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* === Booking Form === */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
          <BookingForm
            pickupCoord={pickupCoord}
            destinationCoord={destinationCoord}
            routeInfo={routeInfo}
          />
        </div>

        {/* === Map Section === */}
        <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden border border-white/20">
          <MapView
            pickupCoord={pickupCoord}
            destinationCoord={destinationCoord}
            onPickupSet={(coord) => setPickupCoord(coord)}
            onDestinationSet={(coord) => setDestinationCoord(coord)}
            onRoute={(info) => setRouteInfo(info)}
          />
        </div>
      </section>
    </main>
  );
}

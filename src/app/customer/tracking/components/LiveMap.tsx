"use client";

import { useEffect, useRef } from "react";

interface LiveMapProps {
  trackingId: string;
}

export default function LiveMap({ trackingId }: LiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Placeholder for live tracking logic (e.g., Mapbox + WebSocket)
    console.log("Tracking live vehicle:", trackingId);
  }, [trackingId]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] md:h-[500px] rounded-2xl bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-gray-700"
    >
      <p>🗺️ Live Map for ID: {trackingId}</p>
    </div>
  );
}

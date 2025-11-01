"use client";

import { motion } from "framer-motion";
import { Truck, User, Phone, MapPin, Clock } from "lucide-react";

interface TrackingDetailsProps {
  driver: { name: string; phone: string };
  truck: { number: string; type: string };
  shipment: { status: string; eta: string; location: string };
}

export default function TrackingDetails({
  driver,
  truck,
  shipment,
}: TrackingDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#7B1E2D]/40 backdrop-blur-xl rounded-2xl p-6 text-white border border-white/20 shadow-xl space-y-6"
    >
      <h2 className="text-lg font-semibold mb-2">Shipment Details</h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-white/80" />
          <span>{truck.type} — {truck.number}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-white/80" />
          <span>Current: {shipment.location}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-white/80" />
          <span>ETA: {shipment.eta}</span>
        </div>

        <div className="flex items-center gap-3">
          <Truck className={`w-5 h-5 ${shipment.status === "Delivered" ? "text-green-400" : "text-yellow-300"}`} />
          <span>Status: {shipment.status}</span>
        </div>
      </div>

      <hr className="border-white/30 my-4" />

      <h2 className="text-lg font-semibold mb-2">Driver Info</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-white/80" />
          <span>{driver.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-white/80" />
          <a href={`tel:${driver.phone}`} className="hover:underline">
            {driver.phone}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

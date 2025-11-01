"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Truck, Clock, CheckCircle } from "lucide-react";

interface BookingFormProps {
  pickupCoord: [number, number] | null;
  destinationCoord: [number, number] | null;
  routeInfo?: {
    distanceKm?: number;
    durationMin?: number;
  } | null;
}

export default function BookingForm({
  pickupCoord,
  destinationCoord,
  routeInfo,
}: BookingFormProps) {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("Truck");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirming(true);
    setTimeout(() => {
      alert("Trip booked successfully!");
      setIsConfirming(false);
    }, 1500);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5 text-white"
    >
      {/* Pickup Input */}
      <div>
        <label className="flex items-center gap-2 mb-2 text-sm font-medium">
          <MapPin size={16} className="text-[#F5B8B8]" />
          Pickup Location
        </label>
        <input
          type="text"
          placeholder="Enter pickup address"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 focus:ring-2 focus:ring-[#7B1E2D] outline-none placeholder-gray-300"
        />
        {pickupCoord && (
          <p className="text-xs text-gray-300 mt-1">
            Selected on map: {pickupCoord[1].toFixed(4)}, {pickupCoord[0].toFixed(4)}
          </p>
        )}
      </div>

      {/* Destination Input */}
      <div>
        <label className="flex items-center gap-2 mb-2 text-sm font-medium">
          <MapPin size={16} className="text-[#F5B8B8]" />
          Destination
        </label>
        <input
          type="text"
          placeholder="Enter destination address"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 focus:ring-2 focus:ring-[#7B1E2D] outline-none placeholder-gray-300"
        />
        {destinationCoord && (
          <p className="text-xs text-gray-300 mt-1">
            Selected on map: {destinationCoord[1].toFixed(4)}, {destinationCoord[0].toFixed(4)}
          </p>
        )}
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium">
            <Calendar size={16} className="text-[#F5B8B8]" />
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 focus:ring-2 focus:ring-[#7B1E2D] outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium">
            <Clock size={16} className="text-[#F5B8B8]" />
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 focus:ring-2 focus:ring-[#7B1E2D] outline-none"
          />
        </div>
      </div>

      {/* Vehicle Type */}
      <div>
        <label className="flex items-center gap-2 mb-2 text-sm font-medium">
          <Truck size={16} className="text-[#F5B8B8]" />
          Vehicle Type
        </label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 focus:ring-2 focus:ring-[#7B1E2D] outline-none text-white"
        >
          <option value="Truck">Truck</option>
          <option value="Mini Truck">Mini Truck</option>
          <option value="Pickup">Pickup</option>
          <option value="Container">Container</option>
        </select>
      </div>

      {/* Route Info Summary */}
      {routeInfo && (
        <div className="text-sm bg-white/10 border border-white/10 p-3 rounded-lg">
          <p>Distance: <span className="text-[#F5B8B8]">{routeInfo.distanceKm} km</span></p>
          <p>Estimated Duration: <span className="text-[#F5B8B8]">{routeInfo.durationMin} min</span></p>
        </div>
      )}

      {/* Submit Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={isConfirming}
        className="w-full mt-3 py-2.5 rounded-lg bg-[#7B1E2D] hover:bg-[#5e1421] text-white font-medium flex items-center justify-center gap-2 transition-all"
      >
        {isConfirming ? (
          <>
            <Clock className="animate-spin w-5 h-5" /> Booking...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" /> Confirm Booking
          </>
        )}
      </motion.button>
    </motion.form>
  );
}

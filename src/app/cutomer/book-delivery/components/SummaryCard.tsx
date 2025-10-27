"use client";

import React from "react";

interface TruckOption {
  id: string;
  name: string;
  capacity: string;
  multiplier: number;
  basePrice?: number;
}

interface SummaryCardProps {
  distanceKm?: number;
  durationMin?: number;
  estimatedPrice?: number | null;
  selectedTruck: TruckOption;
  bookingConfirmed: boolean;
  bookingId: string | null;
  onConfirmBooking: () => void;
}

export default function SummaryCard({
  distanceKm,
  durationMin,
  estimatedPrice,
  selectedTruck,
  bookingConfirmed,
  bookingId,
  onConfirmBooking,
}: SummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between h-full border border-gray-100">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-[#7B1E2D] mb-4">
          Trip Summary
        </h3>

        {/* Route Details */}
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between text-sm">
            <span>Selected Truck:</span>
            <span className="font-medium">{selectedTruck.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Capacity:</span>
            <span className="font-medium">{selectedTruck.capacity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Distance:</span>
            <span className="font-medium">
              {distanceKm ? `${distanceKm.toFixed(2)} km` : "—"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Estimated Time:</span>
            <span className="font-medium">
              {durationMin ? `${durationMin.toFixed(1)} min` : "—"}
            </span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
            <span className="font-semibold text-gray-800">Estimated Price:</span>
            <span className="font-bold text-[#7B1E2D]">
              {estimatedPrice ? `KES ${estimatedPrice.toLocaleString()}` : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6">
        {!bookingConfirmed ? (
          <button
            onClick={onConfirmBooking}
            disabled={!distanceKm}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              distanceKm
                ? "bg-[#7B1E2D] text-white hover:bg-[#611622]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirm Booking
          </button>
        ) : (
          <div className="text-center border border-[#7B1E2D]/30 rounded-xl p-4 bg-[#7B1E2D]/5">
            <p className="text-[#7B1E2D] font-semibold mb-1">
              ✅ Booking Confirmed!
            </p>
            <p className="text-sm text-gray-700">
              Your booking ID: <span className="font-mono">{bookingId}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

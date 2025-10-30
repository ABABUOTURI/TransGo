"use client";

import React from "react";

type LatLng = [number, number];

interface TruckOption {
  id: string;
  name: string;
  capacity: string;
  multiplier: number;
  basePrice?: number;
}

interface BookingFormProps {
  pickupText: string;
  destinationText: string;
  onPickupChange: (text: string) => void;
  onDestinationChange: (text: string) => void;
  onPickupSearchSelect: (coord: LatLng, label?: string) => void;
  onDestinationSearchSelect: (coord: LatLng, label?: string) => void;
  trucks: TruckOption[];
  selectedTruckId: string;
  onTruckSelect: (truckId: string) => void;
}

export default function BookingForm({
  pickupText,
  destinationText,
  onPickupChange,
  onDestinationChange,
  onPickupSearchSelect,
  onDestinationSearchSelect,
  trucks,
  selectedTruckId,
  onTruckSelect,
}: BookingFormProps) {
  return (
    <div className="space-y-6">
      {/* === Pickup === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pickup Location
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={pickupText}
            onChange={(e) => onPickupChange(e.target.value)}
            placeholder="Enter pickup address"
            className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7B1E2D] focus:border-[#7B1E2D]"
          />
          <button
            type="button"
            className="bg-[#7B1E2D] text-white rounded-lg px-4 py-2 hover:bg-[#611622] transition"
            onClick={() =>
              onPickupSearchSelect([36.8219, -1.2921], "Nairobi CBD (Demo)")
            }
          >
            Set
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          (Click on map or use search to select pickup)
        </p>
      </div>

      {/* === Destination === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Destination
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={destinationText}
            onChange={(e) => onDestinationChange(e.target.value)}
            placeholder="Enter destination address"
            className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7B1E2D] focus:border-[#7B1E2D]"
          />
          <button
            type="button"
            className="bg-[#7B1E2D] text-white rounded-lg px-4 py-2 hover:bg-[#611622] transition"
            onClick={() =>
              onDestinationSearchSelect([36.9062, -1.2227], "JKIA (Demo)")
            }
          >
            Set
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          (Click on map or use search to select destination)
        </p>
      </div>

      {/* === Truck Selection === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Truck Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {trucks.map((truck) => (
            <button
              key={truck.id}
              onClick={() => onTruckSelect(truck.id)}
              className={`border rounded-xl px-3 py-3 text-left transition ${
                selectedTruckId === truck.id
                  ? "border-[#7B1E2D] bg-[#7B1E2D]/10"
                  : "border-gray-300 hover:border-[#7B1E2D]/50"
              }`}
            >
              <h4
                className={`font-semibold ${
                  selectedTruckId === truck.id
                    ? "text-[#7B1E2D]"
                    : "text-gray-700"
                }`}
              >
                {truck.name}
              </h4>
              <p className="text-sm text-gray-500">{truck.capacity}</p>
            </button>
          ))}
        </div>
      </div>

      {/* === Cargo Details (Optional) === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cargo Description
        </label>
        <textarea
          placeholder="e.g., 20 boxes of electronics"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7B1E2D] focus:border-[#7B1E2D] resize-none"
          rows={3}
        ></textarea>
      </div>
    </div>
  );
}

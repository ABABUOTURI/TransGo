"use client";

import React, { useState } from "react";
import MapView from "./components/MapView";
import BookingForm from "./components/BookingForm";
import SummaryCard from "./components/SummaryCard";

/**
 * TransGo - Book Delivery page
 * - Top: MapView (Mapbox)
 * - Bottom: BookingForm + SummaryCard
 *
 * Theme: maroon (#7B1E2D) and white
 *
 * Note: MapView, BookingForm and SummaryCard are client components
 * that will receive props/callbacks below. They are not implemented yet.
 */

/* --- Types --- */
type LatLng = [number, number]; // [lng, lat]

type RouteInfo = {
  distanceKm?: number;
  durationMin?: number;
  geometry?: any; // GeoJSON / polyline depending on MapView implementation
  coordinates?: LatLng[]; // simple array of coords for simulated tracking
};

type TruckOption = {
  id: string;
  name: string;
  capacity: string;
  multiplier: number;
  basePrice?: number;
};

/* --- Dummy truck options (will be replaced by API later) --- */
const TRUCKS: TruckOption[] = [
  { id: "small", name: "Small Pickup", capacity: "1 ton", multiplier: 1.0, basePrice: 50 },
  { id: "medium", name: "Medium Lorry", capacity: "5 tons", multiplier: 1.5, basePrice: 120 },
  { id: "heavy", name: "Heavy Truck", capacity: "10 tons", multiplier: 2.0, basePrice: 250 },
];

export default function BookDeliveryPage() {
  /* --- Form state (pickup/destination & cargo) --- */
  const [pickupText, setPickupText] = useState<string>("");
  const [destinationText, setDestinationText] = useState<string>("");

  /* LatLng pairs (Mapbox uses [lng, lat]) */
  const [pickupCoord, setPickupCoord] = useState<LatLng | null>(null);
  const [destinationCoord, setDestinationCoord] = useState<LatLng | null>(null);

  /* Selected truck and route info (populated by MapView / Directions) */
  const [selectedTruck, setSelectedTruck] = useState<TruckOption>(TRUCKS[0]);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  /* Pricing is computed client-side using utils/pricing.ts later */
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  /* Booking simulation state */
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  /* --- Callbacks passed to children --- */

  // Called by BookingForm when user sets pickup/destination text (onChange)
  function handlePickupChange(text: string) {
    setPickupText(text);
  }
  function handleDestinationChange(text: string) {
    setDestinationText(text);
  }

  // Called by MapView after geocoding or a user click on the map
  function handlePickupSet(coord: LatLng, label?: string) {
    setPickupCoord(coord);
    if (label) setPickupText(label);
  }
  function handleDestinationSet(coord: LatLng, label?: string) {
    setDestinationCoord(coord);
    if (label) setDestinationText(label);
  }

  // MapView will call this when a route (distance, duration, geometry) is available
  function handleRouteUpdate(route: RouteInfo) {
    setRouteInfo(route);

    // calculate price client-side (basic formula)
    // We will move this to utils/pricing.ts in next steps
    if (route.distanceKm != null) {
      const baseRate = selectedTruck.basePrice ?? 50;
      const ratePerKm = 10; // placeholder
      const price = Math.round(baseRate + route.distanceKm * ratePerKm * selectedTruck.multiplier);
      setEstimatedPrice(price);
    }
  }

  // When the user changes truck selection in BookingForm
  function handleTruckSelect(truckId: string) {
    const truck = TRUCKS.find((t) => t.id === truckId) ?? TRUCKS[0];
    setSelectedTruck(truck);

    // Recompute price if we already have route info
    if (routeInfo?.distanceKm != null) {
      const baseRate = truck.basePrice ?? 50;
      const ratePerKm = 10;
      const price = Math.round(baseRate + routeInfo.distanceKm * ratePerKm * truck.multiplier);
      setEstimatedPrice(price);
    }
  }

  // Confirm booking (client-only simulation)
  function handleConfirmBooking() {
    // Validate minimal fields
    if (!pickupCoord || !destinationCoord || !routeInfo) {
      alert("Please set pickup and destination on the map and ensure route is calculated.");
      return;
    }

    // Simulate booking creation
    const id = `TG-${Date.now()}`;
    setBookingId(id);
    setBookingConfirmed(true);

    // In production, POST to /api/bookings -> returns booking ID
    // also connect to a socket for real-time tracking
  }

  /* --- Page UI --- */
  return (
    <main className="flex flex-col h-screen bg-white">
      {/* Top: Map */}
      <section className="relative h-2/5">
        <MapView
          pickupCoord={pickupCoord}
          destinationCoord={destinationCoord}
          onPickupSet={handlePickupSet}
          onDestinationSet={handleDestinationSet}
          onRoute={handleRouteUpdate}
          // allow MapView to accept more props (token, style) later
        />

        {/* Floating headline (maroon background) */}
        <div className="absolute left-4 top-4 bg-[#7B1E2D] text-white rounded-xl px-4 py-2 shadow-lg z-10">
          <h1 className="text-lg font-semibold">Book Delivery — TransGo</h1>
          <p className="text-sm opacity-90">Quickly set pickup & destination to see route, ETA & cost</p>
        </div>
      </section>

      {/* Bottom: Form + Summary */}
      <section className="h-3/5 bg-gray-50 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form (left / full width on mobile) */}
          <div className="col-span-2 bg-white rounded-2xl shadow p-6">
            <BookingForm
              pickupText={pickupText}
              destinationText={destinationText}
              onPickupChange={handlePickupChange}
              onDestinationChange={handleDestinationChange}
              onPickupSearchSelect={(coord, label) => handlePickupSet(coord, label)}
              onDestinationSearchSelect={(coord, label) => handleDestinationSet(coord, label)}
              trucks={TRUCKS}
              selectedTruckId={selectedTruck.id}
              onTruckSelect={handleTruckSelect}
            />
          </div>

          {/* SummaryCard (right / bottom on mobile) */}
          <div className="col-span-1">
            <SummaryCard
              distanceKm={routeInfo?.distanceKm}
              durationMin={routeInfo?.durationMin}
              estimatedPrice={estimatedPrice}
              selectedTruck={selectedTruck}
              onConfirmBooking={handleConfirmBooking}
              bookingConfirmed={bookingConfirmed}
              bookingId={bookingId}
            />
          </div>
        </div>

        {/* Optional: recent/demo bookings, instructions */}
        <div className="max-w-5xl mx-auto mt-6 text-sm text-gray-600">
          <p>
            Tip: Click on the map to set pickup or destination, or type addresses in the fields above. Pricing updates
            automatically after route calculation.
          </p>
        </div>
      </section>
    </main>
  );
}

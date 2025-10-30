"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import MapView from "./components/MapView";
import BookingForm from "./components/BookingForm";
import SummaryCard from "./components/SummaryCard";

/* --- Types --- */
type LatLng = [number, number];

type RouteInfo = {
  distanceKm?: number;
  durationMin?: number;
  geometry?: any;
  coordinates?: LatLng[];
};

type TruckOption = {
  id: string;
  name: string;
  capacity: string;
  multiplier: number;
  basePrice?: number;
};

/* --- Dummy truck options --- */
const TRUCKS: TruckOption[] = [
  { id: "small", name: "Small Pickup", capacity: "1 ton", multiplier: 1.0, basePrice: 50 },
  { id: "medium", name: "Medium Lorry", capacity: "5 tons", multiplier: 1.5, basePrice: 120 },
  { id: "heavy", name: "Heavy Truck", capacity: "10 tons", multiplier: 2.0, basePrice: 250 },
];

export default function BookDeliveryPage() {
  const router = useRouter();

  /* --- Form state --- */
  const [pickupText, setPickupText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [pickupCoord, setPickupCoord] = useState<LatLng | null>(null);
  const [destinationCoord, setDestinationCoord] = useState<LatLng | null>(null);
  const [selectedTruck, setSelectedTruck] = useState<TruckOption>(TRUCKS[0]);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  /* --- Handlers --- */
  const handlePickupChange = (text: string) => setPickupText(text);
  const handleDestinationChange = (text: string) => setDestinationText(text);

  const handlePickupSet = (coord: LatLng, label?: string) => {
    setPickupCoord(coord);
    if (label) setPickupText(label);
  };
  const handleDestinationSet = (coord: LatLng, label?: string) => {
    setDestinationCoord(coord);
    if (label) setDestinationText(label);
  };

  const handleRouteUpdate = (route: RouteInfo) => {
    setRouteInfo(route);
    if (route.distanceKm != null) {
      const baseRate = selectedTruck.basePrice ?? 50;
      const ratePerKm = 10;
      const price = Math.round(baseRate + route.distanceKm * ratePerKm * selectedTruck.multiplier);
      setEstimatedPrice(price);
    }
  };

  const handleTruckSelect = (truckId: string) => {
    const truck = TRUCKS.find((t) => t.id === truckId) ?? TRUCKS[0];
    setSelectedTruck(truck);

    if (routeInfo?.distanceKm != null) {
      const baseRate = truck.basePrice ?? 50;
      const ratePerKm = 10;
      const price = Math.round(baseRate + routeInfo.distanceKm * ratePerKm * truck.multiplier);
      setEstimatedPrice(price);
    }
  };

  const handleConfirmBooking = () => {
    if (!pickupCoord || !destinationCoord || !routeInfo) {
      alert("Please set pickup and destination on the map first.");
      return;
    }

    const name = prompt("Enter your full name:");
    const phone = prompt("Enter your phone number:");
    if (!name || !phone) {
      alert("Name and phone number are required.");
      return;
    }

    setCustomerName(name);
    setCustomerPhone(phone);

    const id = `TG-${Date.now()}`;
    setBookingId(id);
    setBookingConfirmed(true);

    // Success receipt alert
    alert(
      `🧾 Receipt\n\nThank you, ${name}!\n\nBooking ID: ${id}\nPhone: ${phone}\nPickup: ${pickupText}\nDestination: ${destinationText}\nCost: KES ${estimatedPrice}\n\nWe’ll notify you when your driver starts the trip.`
    );
  };

  /* --- UI --- */
  return (
    <main className="flex flex-col h-screen bg-white">
      {/* Top: Map */}
      <section className="relative h-2/5">
        {/* Back Arrow */}
        <button
          onClick={() => router.push("/#portal-access")}
          className="absolute top-4 left-4 z-20 bg-white hover:bg-gray-100 text-[#7B1E2D] rounded-full p-2 shadow-md transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <MapView
          pickupCoord={pickupCoord}
          destinationCoord={destinationCoord}
          onPickupSet={handlePickupSet}
          onDestinationSet={handleDestinationSet}
          onRoute={handleRouteUpdate}
        />

        {/* Floating headline */}
        <div className="absolute left-14 top-4 bg-[#7B1E2D] text-white rounded-xl px-4 py-2 shadow-lg z-10">
          <h1 className="text-lg font-semibold">Book Delivery — TransGo</h1>
          <p className="text-sm opacity-90">
            Quickly set pickup & destination to see route, ETA & cost
          </p>
        </div>
      </section>

      {/* Bottom: Form + Summary */}
      <section className="h-3/5 bg-gray-50 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
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

        <div className="max-w-5xl mx-auto mt-6 text-sm text-gray-600">
          <p>
            Tip: Click on the map to set pickup or destination, or type addresses in the fields above.
            Pricing updates automatically after route calculation.
          </p>
        </div>
      </section>
    </main>
  );
}

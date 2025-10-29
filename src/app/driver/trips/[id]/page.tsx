"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Truck, Clock, CheckCircle } from "lucide-react";
import MapView from "../../components/MapView";

export default function TripDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  // === Dummy Data for Trip ===
  const trip = {
    id: id,
    origin: "Nairobi",
    destination: "Mombasa",
    status: "In Transit",
    date: "2025-10-25",
    vehicle: "KDA 432P",
    driver: "John Doe",
    distance: "480 km",
    duration: "7 hrs",
    progress: 60, // percentage
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#7B1E2D] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Trips
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#7B1E2D]">
          Trip #{trip.id}
        </h1>
        <p className="text-gray-600">
          {trip.origin} → {trip.destination}
        </p>
      </div>

      {/* Map Section */}
      <div className="rounded-xl overflow-hidden shadow-md border h-72">
        <MapView origin={trip.origin} destination={trip.destination} />
      </div>

      {/* Trip Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Trip Details
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex justify-between">
              <span>Origin:</span> <span>{trip.origin}</span>
            </li>
            <li className="flex justify-between">
              <span>Destination:</span> <span>{trip.destination}</span>
            </li>
            <li className="flex justify-between">
              <span>Date:</span> <span>{trip.date}</span>
            </li>
            <li className="flex justify-between">
              <span>Status:</span>{" "}
              <span
                className={`font-medium ${
                  trip.status === "Delivered"
                    ? "text-green-600"
                    : trip.status === "Pending"
                    ? "text-yellow-600"
                    : "text-blue-600"
                }`}
              >
                {trip.status}
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Vehicle Information
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" /> {trip.vehicle}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" /> {trip.distance}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" /> {trip.duration}
            </li>
          </ul>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Delivery Progress
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-[#7B1E2D] h-3 rounded-full transition-all duration-500"
            style={{ width: `${trip.progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">
          {trip.progress}% completed - {trip.status}
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        {trip.status !== "Delivered" ? (
          <button className="flex items-center gap-2 bg-[#7B1E2D] text-white px-5 py-2 rounded-lg hover:bg-[#641824] transition">
            <CheckCircle className="w-4 h-4" /> Mark as Delivered
          </button>
        ) : (
          <p className="text-green-700 font-semibold">✅ Trip Completed</p>
        )}
      </div>
    </div>
  );
}

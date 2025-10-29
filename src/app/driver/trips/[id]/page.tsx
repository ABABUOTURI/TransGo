"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  MapPin,
  CreditCard,
  User,
  Home,
  Mail,
  Truck,
  XCircle,
  CheckCircle,
} from "lucide-react";
import MapView from "../../components/MapView";

export default function TripDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(false);

  // === Dummy Trip Data (replace with real backend data later) ===
  const trip = {
    id,
    origin: "Nairobi",
    destination: "Mombasa",
    status: "In Transit",
    date: "2025-10-25",
    vehicle: "KDA 432P",
    driver: "John Doe",
    progress: 60,
  };

  // === Dummy Customer Data ===
  const customer = {
    name: "Jane Mwangi",
    phone: "+254712345678",
    address: "Karen, Nairobi",
    email: "janemwangi@example.com",
    payment: "KES 15,000 (Paid via M-Pesa)",
    pickupPoint: "Nairobi West",
    dropPoint: "Mombasa CBD",
  };

  const handleMarkDelivered = () => {
    setShowAlert(true);
  };

  const closeAlert = () => setShowAlert(false);

  return (
    <div className="relative p-4 sm:p-6 space-y-6">
      {/* === Back Button === */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#7B1E2D] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Trips
      </button>

      {/* === Map Section === */}
      <div className="rounded-xl overflow-hidden shadow-md border h-80">
        <MapView origin={trip.origin} destination={trip.destination} />
      </div>

      {/* === Trip Details Card === */}
      <div className="bg-white rounded-xl shadow-md border p-5 space-y-4">
        <h2 className="text-xl font-semibold text-[#7B1E2D]">
          Trip #{trip.id} Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
          <p>
            <strong>Origin:</strong> {trip.origin}
          </p>
          <p>
            <strong>Destination:</strong> {trip.destination}
          </p>
          <p>
            <strong>Date:</strong> {trip.date}
          </p>
          <p>
            <strong>Status:</strong>{" "}
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
          </p>
          <p>
            <strong>Vehicle:</strong> {trip.vehicle}
          </p>
          <p>
            <strong>Driver:</strong> {trip.driver}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <h4 className="font-semibold mb-1">Delivery Progress</h4>
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
      </div>

      {/* === Customer Information Card === */}
      <div className="bg-white rounded-xl shadow-md border p-5 space-y-4">
        <h2 className="text-xl font-semibold text-[#7B1E2D]">
          Customer Information
        </h2>

        <div className="space-y-3 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span>{customer.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>{customer.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>{customer.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-gray-500" />
            <span>{customer.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <span>{customer.payment}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>
              Pickup: <strong>{customer.pickupPoint}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>
              Drop: <strong>{customer.dropPoint}</strong>
            </span>
          </div>
        </div>

        {/* === Contact Buttons === */}
        <div className="flex flex-wrap gap-3 mt-5">
          <a
            href={`tel:${customer.phone}`}
            className="flex items-center gap-2 bg-[#7B1E2D] text-white px-5 py-2 rounded-lg hover:bg-[#641824] transition"
          >
            <Phone className="w-4 h-4" /> Call Customer
          </a>

          <a
            href={`mailto:${customer.email}`}
            className="flex items-center gap-2 border border-[#7B1E2D] text-[#7B1E2D] px-5 py-2 rounded-lg hover:bg-[#7B1E2D] hover:text-white transition"
          >
            <Mail className="w-4 h-4" /> Email Customer
          </a>
        </div>
      </div>

      {/* === Complete Button === */}
      <div className="flex justify-end">
        {trip.status !== "Delivered" ? (
          <button
            onClick={handleMarkDelivered}
            className="flex items-center gap-2 bg-[#7B1E2D] text-white px-6 py-2 rounded-lg hover:bg-[#641824] transition"
          >
            <Truck className="w-4 h-4" /> Mark as Delivered
          </button>
        ) : (
          <p className="text-green-700 font-semibold">✅ Trip Completed</p>
        )}
      </div>

      {/* === Custom Alert Modal === */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
          <div className="bg-black/40 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-white/10 relative">
            <button
              onClick={closeAlert}
              className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-green-400" />
              <h3 className="text-lg font-semibold">Trip Marked as Delivered</h3>
              <p className="text-sm text-gray-200">
                Your trip has been successfully completed and logged.
              </p>

              <button
                onClick={() => {
                  closeAlert();
                  router.push("/trips");
                }}
                className="mt-4 bg-[#7B1E2D] px-4 py-2 rounded-lg hover:bg-[#641824] transition text-sm"
              >
                Back to Trips
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

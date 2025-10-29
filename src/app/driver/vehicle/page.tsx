"use client";

import { Truck, FileText, Calendar, ShieldCheck, Settings, Fuel } from "lucide-react";

export default function VehicleInfoPage() {
  const vehicle = {
    regNumber: "KDA 432P",
    model: "Isuzu FSR 2022",
    capacity: "10 Tons",
    assignedDate: "2025-05-10",
    lastService: "2025-09-20",
    nextService: "2026-03-20",
    insuranceExpiry: "2026-02-15",
    fuelType: "Diesel",
    status: "Active",
    documents: [
      { name: "Logbook", file: "logbook.pdf" },
      { name: "Insurance", file: "insurance.pdf" },
      { name: "Inspection", file: "inspection.pdf" },
    ],
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#7B1E2D]">My Vehicle</h1>
        <p className="text-gray-600">View your assigned truck details and documents</p>
      </div>

      {/* Vehicle Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src="/truck1.png"
          alt="Vehicle"
          className="w-full sm:w-1/3 h-48 object-cover rounded-xl border"
        />

        <div className="flex-1 space-y-2 text-gray-800">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#7B1E2D]" /> {vehicle.regNumber}
          </h2>
          <p className="text-gray-700">{vehicle.model}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm mt-4">
            <InfoItem label="Capacity" value={vehicle.capacity} />
            <InfoItem label="Fuel Type" value={vehicle.fuelType} icon={<Fuel className="w-4 h-4 text-gray-500" />} />
            <InfoItem label="Assigned On" value={vehicle.assignedDate} icon={<Calendar className="w-4 h-4 text-gray-500" />} />
            <InfoItem label="Status" value={vehicle.status} />
          </div>
        </div>
      </div>

      {/* Maintenance & Insurance Section */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="text-lg font-semibold text-[#7B1E2D] flex items-center gap-2 mb-3">
            <Settings className="w-5 h-5" /> Maintenance Info
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex justify-between">
              <span>Last Service:</span> <span>{vehicle.lastService}</span>
            </li>
            <li className="flex justify-between">
              <span>Next Service:</span> <span>{vehicle.nextService}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="text-lg font-semibold text-[#7B1E2D] flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5" /> Insurance Info
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex justify-between">
              <span>Insurance Expiry:</span> <span>{vehicle.insuranceExpiry}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Vehicle Documents */}
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <h3 className="text-lg font-semibold text-[#7B1E2D] flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5" /> Vehicle Documents
        </h3>
        <ul className="divide-y divide-gray-100">
          {vehicle.documents.map((doc, index) => (
            <li
              key={index}
              className="py-3 flex items-center justify-between text-gray-700"
            >
              <span>{doc.name}</span>
              <button className="text-[#7B1E2D] text-sm font-medium hover:underline">
                View / Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* === Subcomponent === */
function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

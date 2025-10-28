"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Pencil, Plus, Check, Truck } from "lucide-react";

// === Mock Data (replace with API calls) ===
const mockVehicles = [
  { id: "v1", name: "Truck A", plate: "KAA 123A" },
  { id: "v2", name: "Van B", plate: "KBB 456B" },
];

const mockDrivers = [
  { id: "d1", name: "John Doe", phone: "0712345678", status: "Active", assignedVehicleIds: ["v1"] },
  { id: "d2", name: "Jane Smith", phone: "0723456789", status: "On Leave", assignedVehicleIds: [] },
];

export default function DriversContent() {
  const [drivers, setDrivers] = useState(mockDrivers);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const handleAssignVehicles = (driverId: string, vehicleIds: string[]) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === driverId ? { ...d, assignedVehicleIds: vehicleIds } : d
      )
    );
    setEditModalOpen(false);
  };

  return (
    <div className="p-6 pt-24">
      {/* === Header === */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#7B1E2D]">Driver Management</h2>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#7B1E2D] text-white rounded-lg hover:bg-[#9C2640] transition"
        >
          <Plus className="w-5 h-5" /> Add Driver
        </button>
      </div>

      {/* === Drivers Table (Desktop) === */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-left rounded-lg shadow overflow-hidden">
          <thead className="bg-[#7B1E2D]/10 text-[#7B1E2D]">
            <tr>
              <th className="px-4 py-2">Driver</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Assigned Vehicle(s)</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  {d.name}
                </td>
                <td className="px-4 py-2">{d.phone}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      d.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : d.status === "On Leave"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex flex-wrap gap-1">
                  {d.assignedVehicleIds.length > 0
                    ? d.assignedVehicleIds
                        .map((vid) => mockVehicles.find((v) => v.id === vid)?.name)
                        .join(", ")
                    : "None"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedDriver(d);
                      setEditModalOpen(true);
                    }}
                    className="flex items-center gap-1 px-2 py-1 bg-[#7B1E2D] text-white rounded hover:bg-[#9C2640] transition"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Drivers Card View (Mobile) === */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {drivers.map((d) => (
          <motion.div
            key={d.id}
            className="bg-white shadow rounded-xl p-4 flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[#7B1E2D]">{d.name}</h3>
              <button
                onClick={() => {
                  setSelectedDriver(d);
                  setEditModalOpen(true);
                }}
                className="px-2 py-1 bg-[#7B1E2D] text-white rounded hover:bg-[#9C2640] transition flex items-center gap-1 text-sm"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
            </div>
            <p>Phone: {d.phone}</p>
            <p>
              Status:{" "}
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  d.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : d.status === "On Leave"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {d.status}
              </span>
            </p>
            <p>
              Assigned Vehicle(s):{" "}
              {d.assignedVehicleIds.length > 0
                ? d.assignedVehicleIds
                    .map((vid) => mockVehicles.find((v) => v.id === vid)?.name)
                    .join(", ")
                : "None"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* === Add Driver Modal === */}
      {addModalOpen && (
        <Modal onClose={() => setAddModalOpen(false)} title="Add Driver">
          <DriverForm
            onSubmit={(driver) => {
              setDrivers((prev) => [...prev, driver]);
              setAddModalOpen(false);
            }}
            vehicles={mockVehicles}
          />
        </Modal>
      )}

      {/* === Edit Driver Modal === */}
      {editModalOpen && selectedDriver && (
        <Modal onClose={() => setEditModalOpen(false)} title="Edit Driver">
          <DriverForm
            driver={selectedDriver}
            onSubmit={(driver) => {
              setDrivers((prev) =>
                prev.map((d) => (d.id === driver.id ? driver : d))
              );
              setEditModalOpen(false);
            }}
            vehicles={mockVehicles}
          />
        </Modal>
      )}
    </div>
  );
}

/* ========================= Modal Component ========================= */
function Modal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#7B1E2D]">{title}</h3>
          <button onClick={onClose} className="text-gray-600 font-bold">
            ×
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

/* ========================= Driver Form Component ========================= */
function DriverForm({
  driver,
  onSubmit,
  vehicles,
}: {
  driver?: any;
  onSubmit: (driver: any) => void;
  vehicles: any[];
}) {
  const [name, setName] = useState(driver?.name || "");
  const [phone, setPhone] = useState(driver?.phone || "");
  const [status, setStatus] = useState(driver?.status || "Active");
  const [assignedVehicleIds, setAssignedVehicleIds] = useState<string[]>(
    driver?.assignedVehicleIds || []
  );

  const toggleVehicle = (vid: string) => {
    if (assignedVehicleIds.includes(vid)) {
      setAssignedVehicleIds((prev) => prev.filter((id) => id !== vid));
    } else {
      setAssignedVehicleIds((prev) => [...prev, vid]);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          id: driver?.id || crypto.randomUUID(),
          name,
          phone,
          status,
          assignedVehicleIds,
        });
      }}
      className="flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="Driver Name"
        className="border rounded px-3 py-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        className="border rounded px-3 py-2 w-full"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <select
        className="border rounded px-3 py-2 w-full"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Active</option>
        <option>On Leave</option>
        <option>Inactive</option>
      </select>

      {/* Assign Vehicles */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Assign Vehicles:</label>
        <div className="flex flex-wrap gap-2">
          {vehicles.map((v) => (
            <button
              type="button"
              key={v.id}
              onClick={() => toggleVehicle(v.id)}
              className={`px-3 py-1 rounded-full border ${
                assignedVehicleIds.includes(v.id)
                  ? "bg-[#7B1E2D] text-white border-[#7B1E2D]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-[#7B1E2D]/10"
              } transition`}
            >
              <Truck className="inline w-4 h-4 mr-1" />
              {v.name}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-[#7B1E2D] text-white rounded hover:bg-[#9C2640] transition flex items-center gap-1"
      >
        <Check className="w-4 h-4" /> Save
      </button>
    </form>
  );
}

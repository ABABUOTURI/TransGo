"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, User, Pencil, Plus, Check } from "lucide-react";

// =================== Types ===================
type Driver = {
  id: string;
  name: string;
  phone: string;
};

type Vehicle = {
  id: string;
  name: string;
  plate: string;
  type: string;
  status: "Active" | "In Maintenance" | "Inactive";
  assignedDriver: Driver | null;
  lastMaintenance: string;
};

// =================== Mock Data ===================
const mockDrivers: Driver[] = [
  { id: "d1", name: "John Doe", phone: "0712345678" },
  { id: "d2", name: "Jane Smith", phone: "0723456789" },
];

const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    name: "Truck A",
    plate: "KAA 123A",
    type: "Truck",
    status: "Active",
    assignedDriver: null,
    lastMaintenance: "2025-10-10",
  },
  {
    id: "v2",
    name: "Van B",
    plate: "KBB 456B",
    type: "Van",
    status: "In Maintenance",
    assignedDriver: mockDrivers[0],
    lastMaintenance: "2025-10-12",
  },
];

// =================== VehiclesContent ===================
export default function VehiclesContent() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(
    null
  );

  const handleAssignDriver = (vehicleId: string, driverId: string) => {
    const driver = mockDrivers.find((d) => d.id === driverId) || null;
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId ? { ...v, assignedDriver: driver } : v
      )
    );
    setEditModalOpen(false);
  };

  return (
    <div className="p-6 pt-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#7B1E2D]">
          Vehicle Management
        </h2>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#7B1E2D] text-white rounded-lg hover:bg-[#9C2640] transition"
        >
          <Plus className="w-5 h-5" />
          Add Vehicle
        </button>
      </div>

      {/* ===== Desktop Table View ===== */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left rounded-lg shadow overflow-hidden">
          <thead className="bg-[#7B1E2D]/10 text-[#7B1E2D]">
            <tr>
              <th className="px-4 py-2">Vehicle</th>
              <th className="px-4 py-2">Plate</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Driver</th>
              <th className="px-4 py-2">Last Maintenance</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-gray-500" />
                  {v.name}
                </td>
                <td className="px-4 py-2">{v.plate}</td>
                <td className="px-4 py-2">{v.type}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      v.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : v.status === "In Maintenance"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {v.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  {v.assignedDriver ? (
                    <>
                      <User className="w-5 h-5 text-gray-500" />
                      {v.assignedDriver.name}
                    </>
                  ) : (
                    <span className="text-gray-400 italic">Unassigned</span>
                  )}
                </td>
                <td className="px-4 py-2">{v.lastMaintenance}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedVehicle(v);
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

      {/* ===== Mobile Card View ===== */}
      <div className="md:hidden flex flex-col gap-4">
        {vehicles.map((v) => (
          <motion.div
            key={v.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{v.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  v.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : v.status === "In Maintenance"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {v.status}
              </span>
            </div>
            <p className="text-gray-500 mb-1">
              Plate: <strong>{v.plate}</strong>
            </p>
            <p className="text-gray-500 mb-1">
              Type: <strong>{v.type}</strong>
            </p>
            <p className="text-gray-500 mb-2">
              Driver:{" "}
              {v.assignedDriver ? (
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {v.assignedDriver.name}
                </span>
              ) : (
                <span className="italic text-gray-400">Unassigned</span>
              )}
            </p>
            <p className="text-gray-500 mb-2">
              Last Maintenance: <strong>{v.lastMaintenance}</strong>
            </p>
            <button
              onClick={() => {
                setSelectedVehicle(v);
                setEditModalOpen(true);
              }}
              className="flex items-center gap-1 px-2 py-1 bg-[#7B1E2D] text-white rounded hover:bg-[#9C2640] transition"
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
          </motion.div>
        ))}
      </div>

      {/* =================== Modals =================== */}

      {/* Add Vehicle Modal */}
      {addModalOpen && (
        <Modal onClose={() => setAddModalOpen(false)} title="Add Vehicle">
          <VehicleForm
            drivers={mockDrivers}
            onSubmit={(vehicle) => {
              setVehicles((prev) => [...prev, vehicle]);
              setAddModalOpen(false);
            }}
          />
        </Modal>
      )}

      {/* Edit Vehicle Modal */}
      {editModalOpen && selectedVehicle && (
        <Modal
          onClose={() => setEditModalOpen(false)}
          title="Edit Vehicle / Assign Driver"
        >
          <VehicleForm
            vehicle={selectedVehicle}
            drivers={mockDrivers}
            onSubmit={(vehicle) => {
              setVehicles((prev) =>
                prev.map((v) => (v.id === vehicle.id ? vehicle : v))
              );
              setEditModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

// =================== Modal Component ===================
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

// =================== Vehicle Form Component ===================
function VehicleForm({
  vehicle,
  onSubmit,
  drivers,
}: {
  vehicle?: Vehicle;
  onSubmit: (vehicle: Vehicle) => void;
  drivers: Driver[];
}) {
  const [name, setName] = useState(vehicle?.name || "");
  const [plate, setPlate] = useState(vehicle?.plate || "");
  const [type, setType] = useState(vehicle?.type || "Truck");
  const [status, setStatus] = useState<Vehicle["status"]>(
    vehicle?.status || "Active"
  );
  const [assignedDriver, setAssignedDriver] = useState<string>(
    vehicle?.assignedDriver?.id || ""
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          id: vehicle?.id || crypto.randomUUID(),
          name,
          plate,
          type,
          status,
          assignedDriver:
            drivers.find((d) => d.id === assignedDriver) || null,
          lastMaintenance:
            vehicle?.lastMaintenance ||
            new Date().toISOString().split("T")[0],
        });
      }}
      className="flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="Vehicle Name"
        className="border rounded px-3 py-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Plate Number"
        className="border rounded px-3 py-2 w-full"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
        required
      />
      <select
        className="border rounded px-3 py-2 w-full"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option>Truck</option>
        <option>Van</option>
        <option>Car</option>
      </select>
      <select
        className="border rounded px-3 py-2 w-full"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as Vehicle["status"])
        }
      >
        <option>Active</option>
        <option>In Maintenance</option>
        <option>Inactive</option>
      </select>
      <select
        className="border rounded px-3 py-2 w-full"
        value={assignedDriver}
        onChange={(e) => setAssignedDriver(e.target.value)}
      >
        <option value="">Unassigned</option>
        {drivers.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name} ({d.phone})
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-[#7B1E2D] text-white rounded hover:bg-[#9C2640] transition"
      >
        <Check className="inline w-4 h-4 mr-1" />
        Save
      </button>
    </form>
  );
}

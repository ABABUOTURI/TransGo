"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Edit, Trash2, Plus, X } from "lucide-react";

interface Location {
  id: number;
  name: string;
  address: string;
}

export default function SavedLocations() {
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: "Home", address: "Nairobi, Kenya" },
    { id: 2, name: "Office", address: "Westlands, Nairobi" },
  ]);

  const [newLocation, setNewLocation] = useState({ name: "", address: "" });
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (!newLocation.name || !newLocation.address) return alert("Please fill in all fields.");
    setLocations([
      ...locations,
      { id: Date.now(), name: newLocation.name, address: newLocation.address },
    ]);
    setNewLocation({ name: "", address: "" });
    setAdding(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this location?")) {
      setLocations(locations.filter((loc) => loc.id !== id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white mt-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Saved Locations</h3>
        <button
          onClick={() => setAdding(!adding)}
          className="flex items-center gap-2 bg-[#7B1E2D] hover:bg-[#9e2a3c] px-3 py-1 rounded-lg text-sm transition"
        >
          {adding ? <X size={16} /> : <Plus size={16} />} 
          {adding ? "Cancel" : "Add"}
        </button>
      </div>

      {/* Add Form */}
      {adding && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-3 mb-5"
        >
          <input
            type="text"
            placeholder="Location Name (e.g. Home)"
            value={newLocation.name}
            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#7B1E2D]"
          />
          <input
            type="text"
            placeholder="Address (e.g. Nairobi, Kenya)"
            value={newLocation.address}
            onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#7B1E2D]"
          />
          <button
            onClick={handleAdd}
            className="col-span-full bg-[#7B1E2D] hover:bg-[#9e2a3c] py-2 rounded-lg text-sm font-medium transition"
          >
            Save Location
          </button>
        </motion.div>
      )}

      {/* Locations List */}
      <div className="space-y-3">
        {locations.length > 0 ? (
          locations.map((loc) => (
            <motion.div
              key={loc.id}
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center bg-white/10 border border-white/10 rounded-xl p-4 shadow-md"
            >
              <div className="flex items-center gap-3">
                <MapPin className="text-[#F8D7DA]" size={20} />
                <div>
                  <p className="font-semibold">{loc.name}</p>
                  <p className="text-sm text-gray-300">{loc.address}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
                  onClick={() => alert("Edit coming soon")}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="p-2 bg-red-500/30 rounded-lg hover:bg-red-500/50 transition"
                  onClick={() => handleDelete(loc.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-6">No saved locations yet.</p>
        )}
      </div>
    </motion.div>
  );
}

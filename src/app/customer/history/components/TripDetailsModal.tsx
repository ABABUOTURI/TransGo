"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function TripDetailsModal({ trip, onClose }: any) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-black/60 text-white p-6 rounded-2xl border border-white/20 max-w-lg w-[90%] shadow-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white/90">
              Trip Details
            </h2>
            <button onClick={onClose}>
              <X className="text-white/70 hover:text-white" />
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-white/70">From:</span> {trip.from}
            </p>
            <p>
              <span className="text-white/70">To:</span> {trip.to}
            </p>
            <p>
              <span className="text-white/70">Date:</span> {trip.date}
            </p>
            <p>
              <span className="text-white/70">Driver:</span> {trip.driver}
            </p>
            <p>
              <span className="text-white/70">Truck:</span> {trip.truck}
            </p>
            <p>
              <span className="text-white/70">Duration:</span> {trip.duration}
            </p>
            <p>
              <span className="text-white/70">Amount:</span> {trip.amount}
            </p>
            <p>
              <span className="text-white/70">Status:</span>{" "}
              <span
                className={
                  trip.status === "completed"
                    ? "text-green-400"
                    : trip.status === "ongoing"
                    ? "text-blue-400"
                    : "text-red-400"
                }
              >
                {trip.status}
              </span>
            </p>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#7B1E2D]/80 rounded-xl hover:bg-[#5e1622] transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

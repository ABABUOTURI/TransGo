"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ConfirmDeleteProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDelete({ onCancel, onConfirm }: ConfirmDeleteProps) {
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
          className="bg-black/50 text-white p-6 rounded-2xl shadow-xl border border-white/20 max-w-sm w-[90%]"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Delete Notification</h2>
            <button onClick={onCancel}>
              <X className="text-white/70 hover:text-white" />
            </button>
          </div>

          <p className="text-sm text-white/80 mb-6">
            Are you sure you want to delete this notification? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl bg-[#7B1E2D] hover:bg-[#5e1622] transition text-white"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

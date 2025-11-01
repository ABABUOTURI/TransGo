"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PaymentModal({ open, onClose }: PaymentModalProps) {
  const [method, setMethod] = useState("mpesa");
  const [amount, setAmount] = useState("");

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-[#7B1E2D]/60 backdrop-blur-xl text-white p-6 rounded-2xl w-[90%] max-w-md shadow-2xl border border-white/20"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Funds</h2>
            <button onClick={onClose}>
              <X className="text-white/80 hover:text-white" />
            </button>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Amount (KES)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 2000"
              className="w-full px-4 py-2 rounded-xl text-gray-800 focus:outline-none"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-sm mb-1">Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-2 rounded-xl text-gray-800 focus:outline-none"
            >
              <option value="mpesa">M-Pesa</option>
              <option value="card">Credit / Debit Card</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert(`Payment of KES ${amount} via ${method.toUpperCase()} initiated.`);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-white text-[#7B1E2D] font-semibold hover:bg-gray-100 transition"
            >
              Proceed
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";

const transactions = [
  { id: 1, date: "2025-10-25", method: "M-Pesa", amount: 1500, status: "Success" },
  { id: 2, date: "2025-10-26", method: "Card", amount: 2800, status: "Pending" },
  { id: 3, date: "2025-10-27", method: "Wallet", amount: -1200, status: "Success" },
];

export default function PaymentTable() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 overflow-x-auto"
    >
      <table className="w-full text-sm text-left">
        <thead className="bg-[#7B1E2D]/90 text-white">
          <tr>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Method</th>
            <th className="py-3 px-4">Amount (KES)</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr
              key={t.id}
              className="border-b border-gray-200 hover:bg-gray-100/60 transition"
            >
              <td className="py-3 px-4">{t.date}</td>
              <td className="py-3 px-4">{t.method}</td>
              <td
                className={`py-3 px-4 font-medium ${
                  t.amount < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {t.amount < 0 ? `- ${Math.abs(t.amount)}` : `+ ${t.amount}`}
              </td>
              <td
                className={`py-3 px-4 ${
                  t.status === "Success"
                    ? "text-green-600"
                    : t.status === "Pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {t.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

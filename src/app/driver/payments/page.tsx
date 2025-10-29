"use client";

import { useState } from "react";
import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  CreditCard,
} from "lucide-react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
}

export default function PaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const transactions: Transaction[] = [
    {
      id: 1,
      date: "2025-10-25",
      description: "Trip: Nairobi → Mombasa",
      amount: 6500,
      type: "credit",
    },
    {
      id: 2,
      date: "2025-10-20",
      description: "Trip: Kisumu → Nakuru",
      amount: 4200,
      type: "credit",
    },
    {
      id: 3,
      date: "2025-10-15",
      description: "Fuel deduction",
      amount: -1000,
      type: "debit",
    },
  ];

  const totalEarnings = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDeductions = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const pendingAmount = 1200;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto mt-2 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#7B1E2D]" /> Payments & Earnings
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <SummaryCard
              title="Total Earnings"
              amount={`Ksh ${totalEarnings.toLocaleString()}`}

            />
            <SummaryCard
              title="Pending Payouts"
              amount={`Ksh ${pendingAmount.toLocaleString()}`}

            />
            <SummaryCard
              title="Total Deductions"
              amount={`Ksh ${totalDeductions.toLocaleString()}`}
            />
          </div>

          {/* Transaction History */}
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-700">
                Transaction History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 border-b text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-2">Date</th>
                    <th className="text-left px-4 py-2">Description</th>
                    <th className="text-right px-4 py-2">Amount (Ksh)</th>
                    <th className="text-center px-4 py-2">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2">{tx.date}</td>
                      <td className="px-4 py-2">{tx.description}</td>
                      <td
                        className={`px-4 py-2 text-right ${
                          tx.type === "credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.amount > 0
                          ? `+${tx.amount.toLocaleString()}`
                          : tx.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {tx.type === "credit" ? (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                            Credit
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                            Debit
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Payment Method */}
            <div className="p-4 border-t flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <CreditCard className="w-5 h-5 text-[#7B1E2D]" />
                <span className="font-medium">Current Payment Method:</span>
                <span className="text-gray-600">M-PESA Wallet</span>
              </div>
              <button className="text-sm text-[#7B1E2D] hover:underline">
                Change Method
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* === Subcomponent for Summary Card === */
function SummaryCard({
  title,
  amount,

}: {
  title: string;
  amount: string;

}) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 flex items-center gap-4">

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h4 className="text-lg font-semibold text-gray-800">{amount}</h4>
      </div>
    </div>
  );
}

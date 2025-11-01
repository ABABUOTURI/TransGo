"use client";

import { motion } from "framer-motion";
import WalletCard from "./components/WalletCard";
import PaymentTable from "./components/PaymentTable";
import PaymentModal from "./components/PaymentModal";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function PaymentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
      <section className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* === HEADER === */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#7B1E2D]">
            Payments & Wallet
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#7B1E2D] text-white px-4 py-2 rounded-xl hover:bg-[#5e1622] transition"
          >
            <PlusCircle size={18} />
            Add Funds
          </button>
        </div>

        {/* === WALLET CARD === */}
        <WalletCard balance={25450} />

        {/* === TRANSACTIONS TABLE === */}
        <PaymentTable />

        {/* === PAYMENT MODAL === */}
        <PaymentModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>
    </main>
  );
}

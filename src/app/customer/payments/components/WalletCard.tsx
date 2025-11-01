"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

interface WalletCardProps {
  balance: number;
}

export default function WalletCard({ balance }: WalletCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#7B1E2D]/60 backdrop-blur-xl text-white p-6 rounded-2xl shadow-xl border border-white/20 flex items-center justify-between"
    >
      <div>
        <p className="text-sm opacity-80">Wallet Balance</p>
        <h2 className="text-3xl font-semibold mt-1">KES {balance.toLocaleString()}</h2>
      </div>

      <div className="p-3 bg-white/20 rounded-full">
        <Wallet size={30} />
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import NotificationItem from "../notifications/components/NotificationItem";
import ConfirmDelete from "../notifications/components/ConfirmDelete";
import { motion } from "framer-motion";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "Trip Confirmed", message: "Your booking to Nairobi has been confirmed.", time: "2 mins ago", read: false },
    { id: 2, title: "Payment Successful", message: "KES 1,500 has been added to your wallet.", time: "10 mins ago", read: true },
    { id: 3, title: "Shipment Update", message: "Your truck is en route to Mombasa.", time: "1 hour ago", read: false },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = filter === "unread"
    ? notifications.filter((n) => !n.read)
    : notifications;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const confirmDelete = (id: number) => setDeleteId(id);

  const handleDelete = () => {
    if (deleteId !== null) {
      setNotifications((prev) => prev.filter((n) => n.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <main className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
      <section className="max-w-5xl mx-auto space-y-6">
        {/* === Header === */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#7B1E2D]">Notifications</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl transition ${
                filter === "all" ? "bg-[#7B1E2D] text-white" : "bg-white text-[#7B1E2D] border border-[#7B1E2D]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-xl transition ${
                filter === "unread" ? "bg-[#7B1E2D] text-white" : "bg-white text-[#7B1E2D] border border-[#7B1E2D]"
              }`}
            >
              Unread
            </button>
            <button
              onClick={markAllRead}
              className="px-4 py-2 rounded-xl bg-[#7B1E2D]/80 text-white hover:bg-[#5e1622] transition"
            >
              Mark All Read
            </button>
          </div>
        </div>

        {/* === Notifications List === */}
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <NotificationItem
                  id={n.id}
                  title={n.title}
                  message={n.message}
                  time={n.time}
                  read={n.read}
                  onDelete={() => confirmDelete(n.id)}
                  onRead={() =>
                    setNotifications((prev) =>
                      prev.map((x) =>
                        x.id === n.id ? { ...x, read: true } : x
                      )
                    )
                  }
                />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No notifications found.
            </p>
          )}
        </div>

        {/* === Delete Modal === */}
        {deleteId && (
          <ConfirmDelete
            onCancel={() => setDeleteId(null)}
            onConfirm={handleDelete}
          />
        )}
      </section>
    </main>
  );
}

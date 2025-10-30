"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle,
  Clock,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Trip Assigned",
      message: "Driver John has been assigned to Trip #T001.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Payment for Trip #T001 was successfully processed.",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 3,
      title: "Fleet Inspection Reminder",
      message: "Truck KDA 432P is due for inspection next week.",
      time: "1 day ago",
      read: false,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selected, setSelected] = useState<number[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => !n.read);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setNotifications((prev) =>
      prev.filter((n) => !selected.includes(n.id))
    );
    setSelected([]);
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#7B1E2D]">
            Notifications
          </h1>
          <p className="text-gray-600">Manage your alerts and updates</p>
        </div>

        <div className="flex flex-wrap gap-3 mt-3 sm:mt-0">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-[#7B1E2D] text-white text-sm rounded-lg hover:bg-[#641824] transition"
          >
            Mark All Read
          </button>
          {selected.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#7B1E2D] text-[#7B1E2D] rounded-lg hover:bg-[#7B1E2D] hover:text-white transition"
            >
              <Trash2 size={16} /> Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 border-b border-gray-200 pb-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 text-sm font-medium rounded-md ${
            filter === "all"
              ? "bg-[#7B1E2D] text-white"
              : "text-gray-600 hover:text-[#7B1E2D]"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3 py-1 text-sm font-medium rounded-md ${
            filter === "unread"
              ? "bg-[#7B1E2D] text-white"
              : "text-gray-600 hover:text-[#7B1E2D]"
          }`}
        >
          Unread
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No notifications to display.
          </p>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-4 border rounded-xl p-4 transition-all hover:shadow-md ${
                n.read ? "bg-white" : "bg-[#FFF8F9]"
              }`}
            >
              {/* Select Checkbox */}
              <input
                type="checkbox"
                checked={selected.includes(n.id)}
                onChange={() => toggleSelect(n.id)}
                className="mt-2 w-4 h-4 accent-[#7B1E2D] cursor-pointer"
              />

              <div
                className={`p-2 rounded-full ${
                  n.read ? "bg-gray-100" : "bg-[#7B1E2D]/10"
                }`}
              >
                <Bell
                  size={20}
                  className={n.read ? "text-gray-500" : "text-[#7B1E2D]"}
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3
                    className={`font-semibold ${
                      n.read ? "text-gray-700" : "text-[#7B1E2D]"
                    }`}
                  >
                    {n.title}
                  </h3>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {n.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{n.message}</p>
              </div>

              {!n.read && (
                <CheckCircle className="text-green-500 w-4 h-4 mt-1 shrink-0" />
              )}
            </div>
          ))
        )}
      </div>

      {/* === Glassmorphism Confirmation Modal === */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 text-white">
          <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 w-[90%] sm:w-96 shadow-xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-yellow-400 w-6 h-6" />
              <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            </div>
            <p className="text-sm text-gray-200 mb-6">
              Are you sure you want to delete{" "}
              <strong>{selected.length}</strong> selected notifications? This
              action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
              >
                <X size={14} /> Cancel
              </button>

              <button
                onClick={deleteSelected}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

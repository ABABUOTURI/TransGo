"use client";

import { Bell, Trash2 } from "lucide-react";

interface NotificationItemProps {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  onDelete: () => void;
  onRead: () => void;
}

export default function NotificationItem({
  title,
  message,
  time,
  read,
  onDelete,
  onRead,
}: NotificationItemProps) {
  return (
    <div
      onClick={onRead}
      className={`p-5 rounded-2xl shadow-md backdrop-blur-lg border border-white/20 flex items-start justify-between transition cursor-pointer ${
        read ? "bg-black/20 text-gray-200" : "bg-[#7B1E2D]/40 text-white"
      }`}
    >
      <div className="flex gap-3">
        <div className="p-2 bg-white/20 rounded-full">
          <Bell size={20} />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm opacity-80">{message}</p>
          <p className="text-xs opacity-60 mt-1">{time}</p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

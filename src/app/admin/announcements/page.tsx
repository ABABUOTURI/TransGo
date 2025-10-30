"use client";

import { useState } from "react";
import { Megaphone, Plus, Trash2 } from "lucide-react";
import AnnouncementForm from "../components/AnnouncementForm";

export default function AnnouncementsPage() {
  const [showForm, setShowForm] = useState(false);

  // Dummy announcements data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "System Maintenance Scheduled",
      message:
        "TransGo will be under maintenance on October 30th from 12:00 AM to 3:00 AM.",
      date: "2025-10-27",
      audience: "All Users",
    },
    {
      id: 2,
      title: "New Driver Policy Update",
      message: "Drivers are required to verify their documents by November 5th.",
      date: "2025-10-26",
      audience: "Drivers",
    },
  ]);

  const handleAddAnnouncement = (newAnnouncement: any) => {
    setAnnouncements((prev) => [
      { ...newAnnouncement, id: prev.length + 1 },
      ...prev,
    ]);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#7B1E2D] flex items-center gap-2">
          <Megaphone className="w-6 h-6" /> Announcements
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1 bg-[#7B1E2D] text-white px-2 py-2 rounded-lg hover:bg-[#641824] transition"
        >
          <Plus className="w-4 h-4" /> New 
        </button>
      </div>

      {/* Announcements List */}
      <div className="grid gap-4">
        {announcements.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No announcements found.
          </p>
        ) : (
          announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white shadow-sm border rounded-lg p-5 hover:shadow-md transition relative"
            >
              <button
                onClick={() => handleDelete(a.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <h3 className="font-semibold text-lg text-gray-800">
                {a.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{a.message}</p>

              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <span>{a.audience}</span>
                <span>{a.date}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <AnnouncementForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddAnnouncement}
        />
      )}
    </div>
  );
}

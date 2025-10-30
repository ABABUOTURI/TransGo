"use client";

import { useState } from "react";
import { X } from "lucide-react";
import GlassAlert from "./GlassAlert";

export default function AnnouncementForm({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    audience: "All Users",
  });

  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.message) {
      setAlert({
        message: "Please fill out all required fields.",
        type: "warning",
      });
      return;
    }

    onSubmit({
      ...formData,
      date: new Date().toISOString().split("T")[0],
    });

    setAlert({
      message: "Announcement successfully published!",
      type: "success",
    });

    setFormData({ title: "", message: "", audience: "All Users" });
  };

  return (
    <>
      {alert && (
        <GlassAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#7B1E2D] mb-4">
              Create Announcement
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7B1E2D] outline-none"
                  placeholder="Enter announcement title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7B1E2D] outline-none"
                  placeholder="Write announcement message..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Audience
                </label>
                <select
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7B1E2D] outline-none"
                >
                  <option>All Users</option>
                  <option>Drivers</option>
                  <option>Fleet Owners</option>
                  <option>Customers</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#7B1E2D] text-white px-4 py-2 rounded-lg hover:bg-[#641824] transition"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

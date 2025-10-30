"use client";

import { useState } from "react";

export default function DisplaySettings({ onSaved }: { onSaved?: () => void }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mapStyle, setMapStyle] = useState<"streets" | "satellite" | "hybrid">("streets");
  const [layout, setLayout] = useState<"compact" | "detailed">("detailed");

  function save(e: React.FormEvent) {
    e.preventDefault();
    onSaved?.();
  }

  return (
    <form onSubmit={save} className="space-y-6">
      {/* === Theme Selection === */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Theme
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex-1 min-w-[120px] px-3 py-2 text-sm rounded-lg transition-all ${
              theme === "light"
                ? "bg-[#7B1E2D] text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex-1 min-w-[120px] px-3 py-2 text-sm rounded-lg transition-all ${
              theme === "dark"
                ? "bg-[#7B1E2D] text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      {/* === Map Style Selection === */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Map Style
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="button"
            onClick={() => setMapStyle("streets")}
            className={`flex-1 min-w-[100px] px-3 py-2 text-sm rounded-lg transition-all ${
              mapStyle === "streets"
                ? "bg-[#7B1E2D] text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Streets
          </button>
          <button
            type="button"
            onClick={() => setMapStyle("satellite")}
            className={`flex-1 min-w-[100px] px-3 py-2 text-sm rounded-lg transition-all ${
              mapStyle === "satellite"
                ? "bg-[#7B1E2D] text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Satellite
          </button>
          <button
            type="button"
            onClick={() => setMapStyle("hybrid")}
            className={`flex-1 min-w-[100px] px-3 py-2 text-sm rounded-lg transition-all ${
              mapStyle === "hybrid"
                ? "bg-[#7B1E2D] text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Hybrid
          </button>
        </div>
      </div>

      {/* === Layout Selection === */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dashboard Layout
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="button"
            onClick={() => setLayout("compact")}
            className={`flex-1 min-w-[120px] px-3 py-2 text-sm rounded-lg transition-all ${
              layout === "compact"
                ? "bg-[#7B1E2D] text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Compact
          </button>
          <button
            type="button"
            onClick={() => setLayout("detailed")}
            className={`flex-1 min-w-[120px] px-3 py-2 text-sm rounded-lg transition-all ${
              layout === "detailed"
                ? "bg-[#7B1E2D] text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Detailed
          </button>
        </div>
      </div>

      {/* === Save Button === */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#7B1E2D] text-white text-sm font-medium rounded-lg hover:bg-[#651926] transition-all w-full sm:w-auto"
        >
          Save Display
        </button>
      </div>
    </form>
  );
}

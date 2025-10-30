"use client";

import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useEffect } from "react";

interface GlassAlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose: () => void;
  duration?: number; // auto-close duration in ms
}

export default function GlassAlert({
  type = "info",
  message,
  onClose,
  duration = 2500,
}: GlassAlertProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors: Record<string, string> = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  };

  const icons: Record<string, JSX.Element> = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-[9999] px-4 mt-10">
      <div className="relative backdrop-blur-xl bg-black/40 text-white px-5 py-3 rounded-xl shadow-lg border border-white/10 max-w-sm w-full animate-fade-in-down">
        <div className="flex items-center gap-3">
          <span className={colors[type]}>{icons[type]}</span>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

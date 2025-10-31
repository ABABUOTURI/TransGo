"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  MapPin,
  Truck,
  Wallet,
  History,
  Bell,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/customer", icon: LayoutDashboard },
    { name: "Book a Trip", href: "/customer/book", icon: MapPin },
    { name: "Track Shipment", href: "/customer/tracking", icon: Truck },
    { name: "Payments", href: "/customer/payments", icon: Wallet },
    { name: "Trip History", href: "/customer/history", icon: History },
    { name: "Notifications", href: "/customer/notifications", icon: Bell },
    { name: "Support", href: "/customer/support", icon: MessageSquare },
    { name: "Profile", href: "/customer/profile", icon: User },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-57 p-6 flex flex-col justify-between
          bg-[#7B1E2D]/40 backdrop-blur-2xl border-r border-white/20 text-white shadow-lg
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* === Header === */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-wide">TransGo</h1>
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* === Navigation Links === */}
        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all
                  ${
                    active
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-lg"
                      : "hover:bg-white/10 text-gray-200"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* === Footer === */}
        <div className="mt-10">
          <button
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-all text-gray-300"
            onClick={() => alert("You’ve been logged out successfully!")}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

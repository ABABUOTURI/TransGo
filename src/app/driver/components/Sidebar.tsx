"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Truck,
  Wallet,
  Bell,
  User,
  HelpCircle,
  MessageSquare,
  CreditCard,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "Dashboard", href: "/driver", icon: LayoutDashboard },
    { name: "My Trips", href: "/driver/trips", icon: MapPin },
    { name: "Vehicle", href: "/driver/vehicle", icon: Truck },
    { name: "Earnings", href: "/driver/earnings", icon: Wallet },
    { name: "Messages", href: "/driver/messages", icon: MessageSquare },
    { name: "Payments", href: "/driver/payments", icon: CreditCard },
    { name: "Notifications", href: "/driver/notifications", icon: Bell },
    { name: "Profile", href: "/driver/profile", icon: User },
    { name: "Support", href: "/driver/support", icon: HelpCircle },
  ];

  const handleLogout = () => {
    // Clear token (if stored)
    localStorage.removeItem("token");
    // Redirect to login
    router.push("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
        />
      )}

      <aside
        className={`fixed z-30 top-0 left-0 h-full w-56 flex flex-col transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          bg-[rgba(123,30,45,0.75)] backdrop-blur-md border-r border-[#7B1E2D]/50 text-white`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-[#7B1E2D]/50">
          <h2 className="text-lg font-semibold">Driver's Portal</h2>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-md hover:bg-white/20"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-white hover:bg-white/10"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#7B1E2D]/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm font-medium text-white hover:bg-white/10 w-full px-3 py-2 rounded-md transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 text-xs text-white/70">
          © {new Date().getFullYear()} TransGo
        </div>
      </aside>
    </>
  );
}

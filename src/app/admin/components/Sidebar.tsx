"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  X,
  LayoutDashboard,
  Users,
  Truck,
  CreditCard,
  FileText,
  Megaphone,
  Settings,
  Bell,
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
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Trips", href: "/admin/trips", icon: Truck },
    { name: "Fleet", href: "/admin/fleet", icon: Truck },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Logs", href: "/admin/logs", icon: FileText },
    { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "Profile", href: "/admin/profile", icon: User },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* === Mobile overlay === */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        ></div>
      )}

      {/* === Sidebar container === */}
      <aside
        className={`fixed top-0 left-0 z-50 w-60 h-full 
        bg-[#7B1E2D]/60 backdrop-blur-xl border-r border-white/10 shadow-lg 
        transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* === Logo + Close button === */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h1 className="text-lg font-bold text-white tracking-wide">
            Admin Panel
          </h1>
          <button
            className="md:hidden text-white/80 hover:text-white transition"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* === Navigation links === */}
        <nav className="p-4 space-y-1">
          {links.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  active
                    ? "bg-white/20 text-white shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                onClick={onClose}
              >
                <Icon size={18} className="mr-3" />
                {name}
              </Link>
            );
          })}
        </nav>

        {/* === Bottom Logout section === */}
        <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
          <button
            className="flex items-center text-sm font-medium text-white/80 hover:text-white transition"
            onClick={() =>
              alert("Logout feature coming soon")
            }
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
          <br />
          {/* Footer */}
        <div className="px-4 pb-4 text-xs text-white/70">
          © {new Date().getFullYear()} TransGo
        </div>
        </div>
      </aside>
    </>
  );
}

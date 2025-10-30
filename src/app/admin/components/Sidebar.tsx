"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, LayoutDashboard, Users, Truck, CreditCard, FileText, Megaphone, Settings, LogOut } from "lucide-react";

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
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0  bg-opacity-40 z-40 "
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 z-50 w-56 h-full bg-white shadow-lg transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo + close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-[#7B1E2D]">TransGo Admin</h1>
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1">
          {links.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${active
                  ? "bg-[#7B1E2D]/10 text-[#7B1E2D]"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#7B1E2D]"
                }`}
                onClick={onClose}
              >
                <Icon size={18} className="mr-3" />
                {name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom logout section */}
        <div className="absolute bottom-0 w-full border-t p-4">
          <button
            className="flex items-center text-sm font-medium text-gray-700 hover:text-[#7B1E2D]"
            onClick={() => alert("Logout feature coming soon")}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

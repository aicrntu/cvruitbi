"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/services/admin.service";

import {
  LogOut,
  Home,
  CalendarPlus,
  List,
  Mail,
  FileText,
  Lock,
  Unlock,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", href: "/admin", icon: <Home size={18} /> },
    { name: "Create Event", href: "/admin/events/create", icon: <CalendarPlus size={18} /> },
    { name: "All Events", href: "/admin/events", icon: <List size={18} /> },
    { name: "All Contacts", href: "/admin/contact", icon: <Mail size={18} /> },
    { name: "All Apply Forms", href: "/admin/apply-form", icon: <FileText size={18} /> },
  ];

  const openSidebar = () => !isLocked && setIsOpen(true);
  const closeSidebar = () => !isLocked && setIsOpen(false);

  const toggleLock = () => {
    const newLock = !isLocked;
    setIsLocked(newLock);
    setIsOpen(newLock);
  };

  const handleLogout = () => {
    logoutAdmin();
    router.push("/login");
  };

  return (
    <aside
      className={`
        bg-[#0f1724] text-white transition-all duration-500 h-auto ease-in-out transform-gpu
        flex flex-col shadow-xl
        ${isOpen ? "w-60" : "w-20"}
      `}
      onMouseEnter={openSidebar}
      onMouseLeave={closeSidebar}
      aria-expanded={isOpen}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {/* Animated Hamburger Menu */}
        <div
          className="flex items-center space-x-3 cursor-pointer group select-none"
          onClick={toggleLock}
          role="button"
          aria-pressed={isLocked}
          title={isLocked ? "Unlock sidebar" : "Lock sidebar / Toggle"}
        >
          <div className="relative w-6 h-6 transform-gpu">
            {/* line 1 */}
            <span
              className={`
                absolute left-0 right-0 h-[3px] bg-gray-300 rounded transform-gpu transition-all duration-400
                ${isLocked ? "top-2 rotate-45" : "top-0 rotate-0"}
              `}
              style={{ transformOrigin: "center" }}
            />

            {/* line 2 */}
            <span
              className={`
                absolute left-0 right-0 h-[3px] bg-gray-300 rounded transform-gpu transition-all duration-300
                ${isLocked ? "opacity-0 scale-x-0" : "top-2.5 opacity-100 scale-x-100"}
              `}
              style={{ transformOrigin: "center" }}
            />

            {/* line 3 */}
            <span
              className={`
                absolute left-0 right-0 h-[3px] bg-gray-300 rounded transform-gpu transition-all duration-400
                ${isLocked ? "top-2 -rotate-45" : "top-5 rotate-0"}
              `}
              style={{ transformOrigin: "center" }}
            />
          </div>

          {isOpen && <span className="text-sm font-semibold tracking-wide">Admin Panel</span>}
        </div>

        {/* Logout Button (visible only when open) */}
        {isOpen && (
          <button
            className="p-1 rounded-md hover:bg-red-600/20 transition-colors"
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
          >
            <LogOut size={18} className="text-red-400" />
          </button>
        )}
      </div>

      {/* LOCK BUTTON - moved inside sliding area, bottom */}

      {isOpen && (
        <div className=" p-4">
          <button
            className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-sm"
            onClick={toggleLock}
            aria-pressed={isLocked}
          >
            {isLocked ? <Unlock size={16} className="text-green-400" /> : <Lock size={16} className="text-yellow-400" />}
            <span className="text-xs">{isLocked ? "Unlock Sidebar" : "Lock Sidebar"}</span>
          </button>
        </div>
      )}

      {/* Compact lock button when collapsed (small visual only) */}

      {!isOpen && (
        <div className="p-3 flex">
          <button
            className="p-2 rounded-md hover:bg-gray-800 transition-colors"
            onClick={toggleLock}
            aria-pressed={isLocked}
            title={isLocked ? "Unlock sidebar" : "Lock sidebar"}
          >
            {isLocked ? <Unlock size={16} className="text-green-400" /> : <Lock size={16} className="text-yellow-400" />}
          </button>
        </div>
      )}

      {/* NAVIGATION */}
      <nav className="flex flex-col mt-3 space-y-1 px-1">
        {menu.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center relative px-3 py-3 rounded-lg mx-2 cursor-pointer group
                transition-all duration-300 ease-in-out
                ${isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-800"}
              `}
              aria-current={isActive ? "page" : undefined}
              title={item.name}
            >
              {/* ICON */}
              <div className="text-gray-300 group-hover:text-white">
                {item.icon}
              </div>

              {/* LABEL */}
              {isOpen ? (
                <span className="ml-4 text-sm font-medium">{item.name}</span>
              ) : (
                /* Tooltip when collapsed: slide & fade */
                <span className="
                  absolute left-20 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md 
                  opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform transition-all duration-300
                  whitespace-nowrap pointer-events-none shadow-lg
                ">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}

"use client";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Topbar() {
  const [open, setOpen] = useState<boolean>(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left: Title Page */}
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

      {/* Right: Profile */}
      <div className="relative" ref={dropDownRef}>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
            A
          </div>

          <span className="text-sm font-medium text-gray-700">Admin</span>

          <ChevronDown size={16} className="cursor-pointer" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 border border-gray-200 rounded-md overflow-hidden z-50">
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              <User size={16} />
              Profile
            </button>

            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              <Settings size={16} />
              Settings
            </button>

            <div className="border-t border-gray-200" />

            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

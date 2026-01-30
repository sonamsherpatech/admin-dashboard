"use client";

import { logoutUser } from "@/lib/store/auth/auth-thunks";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldUser,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const baseClass = "flex items-center gap-2 px-4 py-2 rounded-md transition";
  const activeClass = "bg-gray-800 text-white";
  const inactiveClass = "text-gray-400 hover:bg-gray-800 hover:text-white";

  function handleLogout() {
    dispatch(logoutUser());
    router.replace("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div>
        <Link
          href="/dashboard"
          className="px-6 py-4 text-xl font-bold border-b border-gray-800 flex items-center gap-2 "
        >
          <ShieldUser size={20} />
          <span>Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={`${baseClass} ${pathname === "/dashboard" ? activeClass : inactiveClass}`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/users"
              className={`${baseClass} ${pathname.startsWith("/dashboard/users") ? activeClass : inactiveClass}`}
            >
              <User size={20} />
              Users
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/settings"
              className={`${baseClass} ${pathname === "/dashboard/settings" ? activeClass : inactiveClass}`}
            >
              <Settings size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      <div
        onClick={handleLogout}
        className="flex items-center gap-2 px-6 py-4 border-t border-gray-800 cursor-pointer hover:bg-gray-800"
      >
        <LogOut size={20} />
        Logout
      </div>
    </aside>
  );
}

"use client";
import React from "react";
import { LogOut } from "lucide-react";

/**
 * AdminHeader Component
 *
 * Purpose: Header navigation for admin dashboard
 *
 * Props:
 * - time: Current time to display
 * - onLogout: Logout handler function
 *
 * Features:
 * - Branding (studback logo)
 * - Live clock display
 * - Admin session indicator
 * - Logout button
 * - Consistent styling with rest of application
 */

const AdminHeader = ({ time, onLogout }) => {
  return (
    <nav className="relative z-20 px-8 py-8 flex items-start justify-between border-b border-zinc-800">
      {/* Logo/Branding */}
      <div className="flex flex-col">
        <span className="text-4xl font-black text-white tracking-tighter">
          studback
        </span>
        <span className="text-xs text-indigo-400 tracking-widest mt-1">
          ADMIN_PANEL_v2.0.1
        </span>
      </div>

      {/* Right Side - Status & Logout */}
      <div className="flex items-center gap-6">
        {/* Session Status */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 text-xs tracking-widest">
              ADMIN_SESSION
            </span>
          </div>
          <span className="text-xs text-zinc-600">
            {time.toLocaleTimeString()}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 border-2 border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-red-500 transition-colors text-xs tracking-wider"
        >
          <LogOut className="w-4 h-4" />
          [LOGOUT]
        </button>
      </div>
    </nav>
  );
};

export default AdminHeader;

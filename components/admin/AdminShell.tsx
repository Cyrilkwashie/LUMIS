"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-offwhite">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-30 border border-border bg-white px-3 py-2 text-sm text-heading lg:hidden"
        aria-label="Open admin menu"
      >
        Menu
      </button>

      <AdminSidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-60">
        <main className="min-h-screen px-4 py-10 pt-16 lg:px-8 lg:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}

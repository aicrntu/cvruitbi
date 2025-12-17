"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex w-full min-h-screen">
        <Sidebar />

        {/* Auto-adjusting area */}
        <main className="flex-1 bg-gray-100 p-4 transition-all duration-300">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

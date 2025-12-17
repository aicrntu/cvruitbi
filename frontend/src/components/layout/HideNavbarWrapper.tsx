"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function HideNavbarWrapper() {
  const pathname = usePathname();

  // Add ALL routes here where navbar should be hidden
  const hiddenRoutes = [
    "/admin",
    "/login"
  ];

  // Check if pathname starts with any hidden route
  const hideNavbar = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (hideNavbar) return null;

  return <Navbar />;
}

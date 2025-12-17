"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";

export default function HideFooterWrapper() {
  const pathname = usePathname();

  const hiddenRoutes = ["/admin", "/login"];

  const hideFooter = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (hideFooter) return null;

  return <Footer />;
}

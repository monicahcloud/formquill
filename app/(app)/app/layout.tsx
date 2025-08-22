// app/(app)/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner"; // ✅ Sonner-only
import AppNavbar from "@/components/layout/AppNavbar";

export const runtime = "nodejs";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();
  if (!user) redirect("/signin");

  return (
    <div className="min-h-screen bg-background">
      <TooltipProvider>
        <AppNavbar />
        {children}
        {/* Mount a single Sonner Toaster once per app area */}
        <Toaster />
      </TooltipProvider>
    </div>
  );
}

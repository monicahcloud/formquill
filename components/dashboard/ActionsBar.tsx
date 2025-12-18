// components/dashboard/ActionsBar.tsx
"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateForm from "../forms/CreateForm";

export default function ActionsBar({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-3 shrink-0", className)}>
      {/* Secondary */}
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98] dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800">
        <Sparkles className="h-4 w-4" />
        Generate with AI
      </button>

      {/* Primary */}
      <CreateForm />
    </div>
  );
}

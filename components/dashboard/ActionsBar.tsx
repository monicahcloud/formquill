"use client";

import Link from "next/link";
import { Sparkles, Plus } from "lucide-react";

export default function ActionsBar() {
  return (
    <div className="-mt-4 mb-8 flex flex-wrap gap-3 sm:mt-0 sm:justify-end">
      {/* Secondary */}
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98] dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800">
        <Sparkles className="h-4 w-4" />
        Generate with AI
      </button>

      {/* Primary */}
      <Link
        href="/app/forms/new"
        aria-label="Create a new form"
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98]">
        <Plus className="h-4 w-4" />
        Create Form
      </Link>
    </div>
  );
}

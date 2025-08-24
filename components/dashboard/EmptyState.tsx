"use client";

import Link from "next/link";
import { Sparkles, Plus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800/60">
        <Plus className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
        Create your first form
      </h3>
      <p className="mx-auto mb-6 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
        Get started by creating a new form or using a template.
      </p>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98] dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800">
          <Sparkles className="h-4 w-4" />
          Generate with AI
        </button>
        <Link
          href="/app/forms/new"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98]">
          <Plus className="h-4 w-4" />
          Create Form
        </Link>
      </div>
    </div>
  );
}

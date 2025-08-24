import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import type { FormSummary } from "./types";

export default function FormListItem({ f }: { f: FormSummary }) {
  const hrefPublic = `/forms/${f.slug ?? f.id}`;
  const hrefEdit = `/app/forms/${f.id}/edit`;

  return (
    <li className="flex items-center justify-between gap-4 px-2 py-3 sm:px-3">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h4 className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {f.title || "Untitled form"}
          </h4>
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400">
            Draft
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600 dark:text-neutral-400">
          <span>Updated {new Date(f.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={hrefPublic}
          target="_blank"
          className="inline-flex items-center rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800">
          View
        </Link>
        <Link
          href={hrefEdit}
          className="inline-flex items-center rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800">
          Edit
        </Link>
        <button
          type="button"
          className="inline-flex items-center rounded-lg px-2 py-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-300"
          aria-label="More actions">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}

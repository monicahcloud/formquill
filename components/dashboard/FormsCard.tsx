import Link from "next/link";
import { BarChart3, Plus } from "lucide-react";
import type { FormSummary } from "./types";
import EmptyState from "./EmptyState";
import FormListItem from "./FormListItem";

export default function FormsCard({ forms }: { forms: FormSummary[] }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Your Forms
          </h3>
        </div>

        {forms.length > 0 && (
          <Link
            href="/app/forms/new"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800">
            <Plus className="h-4 w-4" />
            New Form
          </Link>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {forms.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {forms.map((f) => (
              <FormListItem key={f.id} f={f} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

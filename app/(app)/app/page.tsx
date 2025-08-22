import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Sparkles,
  BarChart3,
  Eye,
  Users,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await requireUser();
  if (!user) redirect("/signin");

  const forms = await prisma.form.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, createdAt: true },
  });

  // mock KPIs for now
  const usagePercentage = 68;
  const pct = Math.max(0, Math.min(100, Math.round(usagePercentage || 0)));
  const formsLimit = 25;
  const submissionsLimit = 1000;
  const currentForms = forms.length;
  const currentSubmissions = 680;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Manage your forms and view analytics
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
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
      </div>

      {/* Usage / KPIs */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Plan Usage */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Plan Usage
            </h2>
            <span className="inline-flex items-center rounded-full border border-transparent bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              Pro
            </span>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Usage
            </span>
            <span className="text-sm tabular-nums text-neutral-700 dark:text-neutral-300">
              {pct}%
            </span>
          </div>

          {/* Progress (pure Tailwind) */}
          <div
            className="relative mb-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {currentForms}/{formsLimit} forms • {currentSubmissions}/
            {submissionsLimit} submissions
          </p>
        </div>

        {/* Total Views */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-2 flex items-center gap-2">
            <Eye className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Total Views
            </h2>
          </div>
          <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            2,103
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-500">
            <TrendingUp className="h-3 w-3" />
            <span>+12.5% from last month</span>
          </div>
        </div>

        {/* Submissions */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Submissions
            </h2>
          </div>
          <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            213
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-500">
            <TrendingUp className="h-3 w-3" />
            <span>+8.2% from last month</span>
          </div>
        </div>
      </div>

      {/* Forms List */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
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

        <div className="p-4">
          {forms.length === 0 ? (
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
          ) : (
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {forms.map((f) => {
                const hrefPublic = `/forms/${f.slug ?? f.id}`;
                const hrefEdit = `/app/forms/${f.id}/edit`;
                return (
                  <li
                    key={f.id}
                    className="flex items-center justify-between gap-4 px-2 py-3 sm:px-3">
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
                        <span>
                          Updated {new Date(f.createdAt).toLocaleDateString()}
                        </span>
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
              })}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}

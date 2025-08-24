type Props = {
  pct: number; // 0-100
  currentForms: number;
  formsLimit: number;
  currentSubmissions: number;
  submissionsLimit: number;
  planLabel?: string; // e.g. "Pro"
};

export default function PlanUsageCard({
  pct,
  currentForms,
  formsLimit,
  currentSubmissions,
  submissionsLimit,
  planLabel = "Pro",
}: Props) {
  const clamped = Math.max(0, Math.min(100, Math.round(pct || 0)));

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          Plan Usage
        </h2>
        <span className="inline-flex items-center rounded-full border border-transparent bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
          {planLabel}
        </span>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Usage
        </span>
        <span className="text-sm tabular-nums text-neutral-700 dark:text-neutral-300">
          {clamped}%
        </span>
      </div>

      {/* Progress (pure Tailwind) */}
      <div
        className="relative mb-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 transition-[width] duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>

      <p className="text-xs text-neutral-600 dark:text-neutral-400">
        {currentForms}/{formsLimit} forms • {currentSubmissions}/
        {submissionsLimit} submissions
      </p>
    </div>
  );
}

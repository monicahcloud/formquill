export default function DashboardHeader() {
  return (
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
    </div>
  );
}

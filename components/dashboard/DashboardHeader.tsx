// components/dashboard/DashboardHeader.tsx
import { cn } from "@/lib/utils";

export default function DashboardHeader({
  title = "Dashboard",
  subtitle = "Manage your forms and view analytics",
  className,
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <h1 className="mb-1 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {subtitle}
      </p>
    </div>
  );
}

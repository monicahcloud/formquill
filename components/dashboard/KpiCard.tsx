import { ReactNode } from "react";

type Props = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: ReactNode;
  trend: ReactNode;
  trendTone?: "success" | "warning"; // color accent
};

export default function KpiCard({
  icon: Icon,
  title,
  value,
  trend,
  trendTone = "success",
}: Props) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
        <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {title}
        </h2>
      </div>

      <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        {value}
      </div>

      <div
        className={
          "mt-1 flex items-center gap-1 text-sm " +
          (trendTone === "warning"
            ? "text-emerald-600 dark:text-emerald-500"
            : "text-emerald-600 dark:text-emerald-500")
        }>
        {trend}
      </div>
    </div>
  );
}

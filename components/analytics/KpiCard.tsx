import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TrendTone } from "./types";

export default function KpiCard({
  icon: Icon,
  label,
  value,
  trend,
  tone = "success",
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string | number;
  trend: string;
  tone?: TrendTone;
}) {
  return (
    <Card className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400">
            <Icon className="h-4 w-4" />
          </span>
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div
          className={
            "text-sm " +
            (tone === "warning"
              ? "text-amber-600 dark:text-amber-500"
              : tone === "neutral"
              ? "text-neutral-500 dark:text-neutral-400"
              : "text-emerald-600 dark:text-emerald-500")
          }>
          {trend}
        </div>
      </CardContent>
    </Card>
  );
}

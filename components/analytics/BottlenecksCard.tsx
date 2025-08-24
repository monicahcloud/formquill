import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BottleneckItem } from "./types";
import { Target } from "lucide-react";

export default function BottlenecksCard({
  items,
}: {
  items: BottleneckItem[];
}) {
  return (
    <Card className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          Field Bottlenecks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((f) => (
          <div
            key={f.field}
            className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
            <div>
              <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {f.field}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {f.position}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-rose-600 dark:text-rose-500">
                {f.dropRate}%
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                drop-off
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

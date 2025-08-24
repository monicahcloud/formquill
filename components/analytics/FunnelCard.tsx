import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { FunnelStep } from "./types";
import { BarChart3 } from "lucide-react";

export default function FunnelCard({ steps }: { steps: FunnelStep[] }) {
  return (
    <Card className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          Conversion Funnel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((s, i) => (
          <div key={s.step} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {s.step}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {s.count.toLocaleString()}
                </span>
                <Badge className="rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300">
                  {s.percentage}%
                </Badge>
              </div>
            </div>

            {/* shadcn Progress with dashboard gradient */}
            <Progress
              value={s.percentage}
              className="
                h-2 rounded-full bg-neutral-200 dark:bg-neutral-800
                [&>div]:rounded-full
                [&>div]:bg-gradient-to-r [&>div]:from-teal-600 [&>div]:via-cyan-600 [&>div]:to-blue-600
              "
            />

            {i < steps.length - 1 && (
              <div className="text-right text-xs text-neutral-500 dark:text-neutral-400">
                Drop-off:{" "}
                {(steps[i].percentage - steps[i + 1].percentage).toFixed(1)}%
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

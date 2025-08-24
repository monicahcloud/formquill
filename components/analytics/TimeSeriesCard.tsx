import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3 } from "lucide-react";

export default function TimeSeriesCard({
  title = "Performance Over Time",
  children,
}: {
  title?: string;
  children?: React.ReactNode; // optional chart lib can be injected
}) {
  return (
    <Card className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children ?? (
          <div className="flex h-64 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800/40">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-2 h-12 w-12 text-neutral-400" />
              <p className="text-neutral-600 dark:text-neutral-400">
                Interactive chart would be rendered here
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Showing views, starts, and completions over time
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

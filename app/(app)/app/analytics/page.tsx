import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import KpiCard from "@/components/analytics/KpiCard";
import FunnelCard from "@/components/analytics/FunnelCard";
import BottlenecksCard from "@/components/analytics/BottlenecksCard";
import TimeSeriesCard from "@/components/analytics/TimeSeriesCard";
import { Eye, Users, Target, Clock } from "lucide-react";
import { fetchAnalytics } from "../actions/analytics.actions";

function formatMs(ms: number | null) {
  if (!ms || ms <= 0) return "—";
  const s = Math.round(ms / 1000);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}m ${rem}s`;
}

export default async function AnalyticsPage() {
  const { metrics, funnel, bottlenecks, series } = await fetchAnalytics();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AnalyticsHeader />

      {/* KPIs */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={Eye}
          label="Views"
          value={metrics.views}
          trend="All-time"
        />
        <KpiCard
          icon={Users}
          label="Starts"
          value={metrics.starts}
          trend="All-time"
        />
        <KpiCard
          icon={Target}
          label="Completions"
          value={metrics.completions}
          trend="All-time"
        />
        <KpiCard
          icon={Clock}
          label="Avg. Time"
          value={formatMs(metrics.avgTimeMs)}
          trend={metrics.avgTimeMs ? "Computed from submissions" : "—"}
          tone={metrics.avgTimeMs ? "success" : "neutral"}
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <FunnelCard steps={funnel} />
        <BottlenecksCard items={bottlenecks} />
      </div>

      <TimeSeriesCard>
        {/* Replace this with your chart lib; example shows completions over time */}
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          {series.length === 0 ? (
            <p>No data yet.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-y-1">
              {series.map((p) => (
                <li key={p.date} className="flex items-center justify-between">
                  <span>{p.date}</span>
                  <span className="tabular-nums">{p.completions}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </TimeSeriesCard>
    </main>
  );
}

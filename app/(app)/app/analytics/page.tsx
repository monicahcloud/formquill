import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import KpiCard from "@/components/analytics/KpiCard";
import FunnelCard from "@/components/analytics/FunnelCard";
import BottlenecksCard from "@/components/analytics/BottlenecksCard";
import TimeSeriesCard from "@/components/analytics/TimeSeriesCard";
import { Eye, Users, Target, Clock } from "lucide-react";
import type { FunnelStep, BottleneckItem } from "@/components/analytics/types";

export default async function AnalyticsPage() {
  // mock metrics (replace with real data)
  const metrics = {
    views: 2847,
    starts: 1623,
    completions: 891,
    avgTime: "4m 23s",
  };

  const funnel: FunnelStep[] = [
    { step: "Form Views", count: 2847, percentage: 100 },
    { step: "Form Started", count: 1623, percentage: 57 },
    { step: "Halfway Complete", count: 1247, percentage: 44 },
    { step: "Form Completed", count: 891, percentage: 31 },
  ];

  const fieldBottlenecks: BottleneckItem[] = [
    { field: "Phone Number", dropRate: 23.5, position: "Step 4" },
    { field: "Address", dropRate: 18.2, position: "Step 7" },
    { field: "How did you hear about us?", dropRate: 12.8, position: "Step 5" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AnalyticsHeader />

      {/* KPIs */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={Eye}
          label="Views"
          value={metrics.views}
          trend="+15.2% from last period"
        />
        <KpiCard
          icon={Users}
          label="Starts"
          value={metrics.starts}
          trend="+8.7% from last period"
        />
        <KpiCard
          icon={Target}
          label="Completions"
          value={metrics.completions}
          trend="-2.1% from last period"
          tone="warning"
        />
        <KpiCard
          icon={Clock}
          label="Avg. Time"
          value={metrics.avgTime}
          trend="-12s from last period"
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <FunnelCard steps={funnel} />
        <BottlenecksCard items={fieldBottlenecks} />
      </div>

      <TimeSeriesCard />
    </main>
  );
}

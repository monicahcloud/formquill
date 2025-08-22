import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  Target,
  Clock,
  Download,
  Calendar,
  Filter,
} from "lucide-react";

export default async function AnalyticsPage() {
  const metrics = {
    views: 2847,
    starts: 1623,
    completions: 891,
    conversionRate: 54.9,
    avgTime: "4m 23s",
  };

  const funnel = [
    { step: "Form Views", count: 2847, percentage: 100 },
    { step: "Form Started", count: 1623, percentage: 57 },
    { step: "Halfway Complete", count: 1247, percentage: 44 },
    { step: "Form Completed", count: 891, percentage: 31 },
  ];

  const fieldBottlenecks = [
    { field: "Phone Number", dropRate: 23.5, position: "Step 4" },
    { field: "Address", dropRate: 18.2, position: "Step 7" },
    { field: "How did you hear about us?", dropRate: 12.8, position: "Step 5" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track performance and optimize your forms
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Kpi
          icon={Eye}
          label="Views"
          value={metrics.views.toLocaleString()}
          trend="+15.2% from last period"
        />
        <Kpi
          icon={Users}
          label="Starts"
          value={metrics.starts.toLocaleString()}
          trend="+8.7% from last period"
        />
        <Kpi
          icon={Target}
          label="Completions"
          value={metrics.completions.toLocaleString()}
          trend="-2.1% from last period"
          trendVariant="warning"
        />
        <Kpi
          icon={Clock}
          label="Avg. Time"
          value={metrics.avgTime}
          trend="-12s from last period"
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnel.map((step, i) => (
              <div key={step.step} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{step.step}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {step.count.toLocaleString()}
                    </span>
                    <Badge
                      variant={step.percentage > 50 ? "default" : "secondary"}>
                      {step.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={step.percentage} className="h-3" />
                {i < funnel.length - 1 && (
                  <div className="text-right text-xs text-muted-foreground">
                    Drop-off:{" "}
                    {(funnel[i].percentage - funnel[i + 1].percentage).toFixed(
                      1
                    )}
                    %
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Field Bottlenecks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Field Bottlenecks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fieldBottlenecks.map((f) => (
              <div
                key={f.field}
                className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="font-medium">{f.field}</div>
                  <div className="text-sm text-muted-foreground">
                    {f.position}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-destructive">
                    {f.dropRate}%
                  </div>
                  <div className="text-xs text-muted-foreground">drop-off</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Placeholder chart area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg bg-muted/30">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                Interactive chart would be rendered here
              </p>
              <p className="text-sm text-muted-foreground">
                Showing views, starts, and completions over time
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  trend,
  trendVariant = "success",
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  trend: string;
  trendVariant?: "success" | "warning";
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Icon className="h-4 w-4" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <div
          className={
            "text-sm " +
            (trendVariant === "warning" ? "text-amber-600" : "text-success")
          }>
          {trend}
        </div>
      </CardContent>
    </Card>
  );
}

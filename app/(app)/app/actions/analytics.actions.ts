/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";
import type { FunnelStep, BottleneckItem } from "@/components/analytics/types";

export type AnalyticsPayload = {
  metrics: {
    views: number;
    starts: number; // fallback to completions for now
    completions: number;
    avgTimeMs: number | null; // if Submission.data has durationMs
  };
  funnel: FunnelStep[];
  bottlenecks: BottleneckItem[]; // requires field-level telemetry
  series: Array<{ date: string; completions: number }>; // simple per-day completes
};

export async function fetchAnalytics(): Promise<AnalyticsPayload> {
  const user = await requireUser();
  if (!user) redirect("/signin?next=/analytics");

  // 1) Core metrics available today
  const [viewsAgg, completionsCount] = await Promise.all([
    prisma.form.aggregate({
      where: { ownerId: user.id },
      _sum: { views: true },
    }),
    prisma.submission.count({
      where: { form: { ownerId: user.id } },
    }),
  ]);

  const views = viewsAgg._sum.views ?? 0;
  const completions = completionsCount;
  const starts = completions; // Fallback until you track starts explicitly

  // 2) Avg time if you store Submission.data.durationMs (or duration)
  const submissionsForDur = await prisma.submission.findMany({
    where: { form: { ownerId: user.id } },
    select: { data: true },
  });
  const durations = submissionsForDur
    .map((s) => {
      const d = (s.data as any)?.durationMs ?? (s.data as any)?.duration;
      return typeof d === "number" && Number.isFinite(d) ? d : null;
    })
    .filter((d): d is number => d !== null);

  const avgTimeMs =
    durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : null;

  // 3) Simple per-day completion series (for charts)
  const subsForSeries = await prisma.submission.findMany({
    where: { form: { ownerId: user.id } },
    select: { createdAt: true },
  });
  const dayMap = new Map<string, number>();
  for (const s of subsForSeries) {
    const d = s.createdAt.toISOString().slice(0, 10);
    dayMap.set(d, (dayMap.get(d) ?? 0) + 1);
  }
  const series = Array.from(dayMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, completions]) => ({ date, completions }));

  // 4) Funnel from what we have (views -> starts -> completions)
  const safeDiv = (num: number, denom: number) =>
    denom > 0 ? Math.round((num / denom) * 100) : 0;

  const funnel: FunnelStep[] = [
    { step: "Form Views", count: views, percentage: views ? 100 : 0 },
    {
      step: "Form Started",
      count: starts,
      percentage: safeDiv(starts, Math.max(views, 1)),
    },
    {
      step: "Form Completed",
      count: completions,
      percentage: safeDiv(completions, Math.max(views, 1)),
    },
  ];

  // 5) Bottlenecks need field-level telemetry (focus/blur, validation fails, abandon, etc.)
  const bottlenecks: BottleneckItem[] = [];

  return {
    metrics: { views, starts, completions, avgTimeMs },
    funnel,
    bottlenecks,
    series,
  };
}

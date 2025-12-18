/* eslint-disable @typescript-eslint/no-explicit-any */
// app/actions/fetch-form-stats.ts
"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

/* =========================
   Return types
   ========================= */
export type FieldInsight = {
  fieldId: string;
  label?: string;
  presentRate: number; // % of completions where field had a value
  missingRate: number; // 1 - presentRate
  sampleSize: number; // number of submissions sampled
};

export type PerFormStats = {
  formId: string;
  title: string;
  views: number;
  starts: number; // approximated by FormResponse count
  submissions: number; // completions
  viewConversion: number; // submissions / views
  startConversion: number; // submissions / starts
  fieldInsights: FieldInsight[];
};

export type Funnel = {
  views: number;
  starts: number;
  completions: number;
  startRate: number; // starts / views
  completionRate: number; // completions / views
  completionFromStart: number; // completions / starts
};

export type SubmissionsTimeseriesPoint = {
  date: string; // yyyy-mm-dd
  count: number;
};

export type ExtendedFormStats = {
  totals: {
    totalForms: number;
    totalViews: number;
    totalSubmissions: number;
  };
  funnel: Funnel;
  perForm: PerFormStats[];
  submissionsLast30Days: SubmissionsTimeseriesPoint[];
};

/* =========================
   Helper: date -> yyyy-mm-dd
   ========================= */
function ymd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function subDays(d: Date, n: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() - n);
  return copy;
}

/* =========================
   Main server action
   ========================= */
export async function fetchFormStats(): Promise<ExtendedFormStats> {
  const user = await requireUser();
  if (!user) redirect("/signin?next=/app");

  // Pull core aggregates in parallel
  const [
    forms, // list of user forms w/ essentials
    totalForms,
    totalSubmissions,
    viewsAgg,
    startsAgg, // "starts" approximated via FormResponse
    submissionsLast30,
  ] = await Promise.all([
    prisma.form.findMany({
      where: { ownerId: user.id },
      select: {
        id: true,
        title: true,
        views: true,
        responseCount: true, // denormalized counter if you keep it
        fields: true, // JSON describing fields
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.form.count({ where: { ownerId: user.id } }),
    prisma.submission.count({ where: { form: { ownerId: user.id } } }),
    prisma.form.aggregate({
      where: { ownerId: user.id },
      _sum: { views: true },
    }),
    prisma.formResponse.count({ where: { form: { ownerId: user.id } } }),
    prisma.submission.findMany({
      where: {
        form: { ownerId: user.id },
        createdAt: { gte: subDays(new Date(), 30) },
      },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const totalViews = viewsAgg._sum.views ?? 0;

  // Per-form submission / start counts (fast groupBy)
  const [perFormSubCounts, perFormStartCounts] = await Promise.all([
    prisma.submission.groupBy({
      by: ["formId"],
      where: { form: { ownerId: user.id } },
      _count: { _all: true },
    }),
    prisma.formResponse.groupBy({
      by: ["formId"],
      where: { form: { ownerId: user.id } },
      _count: { _all: true },
    }),
  ]);

  const subByForm = new Map(
    perFormSubCounts.map((r) => [r.formId, r._count._all])
  );
  const startByForm = new Map(
    perFormStartCounts.map((r) => [r.formId, r._count._all])
  );

  // Field insights
  // We estimate friction by checking how often each field is blank in FINAL submissions.
  //   NOTE: This does *not* detect where users abandoned mid-way; it detects which fields are
  //   commonly missing in completions (a sign of confusion or optionality).
  const subsForFields = await prisma.submission.findMany({
    where: { form: { ownerId: user.id } },
    select: { formId: true, data: true },
    // You can limit for big datasets:
    // take: 2000,
    // orderBy: { createdAt: "desc" },
  });

  // Build an index of submissions by formId for quick lookup
  const subsByForm = new Map<string, any[]>();
  for (const s of subsForFields) {
    const list = subsByForm.get(s.formId) ?? [];
    list.push(s.data as any);
    subsByForm.set(s.formId, list);
  }

  const perForm: PerFormStats[] = forms.map((f) => {
    const submissions = subByForm.get(f.id) ?? 0;
    const starts = startByForm.get(f.id) ?? 0;
    const views = f.views ?? 0;

    const viewConversion = views > 0 ? submissions / views : 0;
    const startConversion = starts > 0 ? submissions / starts : 0;

    // Field insights (if we can parse fields JSON)
    // Expecting something like: fields: [{ id, label, type, required }, ...]
    const fieldDefs: Array<{ id?: string; label?: string }> = Array.isArray(
      f.fields
    )
      ? (f.fields as any[])
      : [];
    const sample = subsByForm.get(f.id) ?? [];
    const sampleSize = sample.length;

    const fieldInsights: FieldInsight[] = fieldDefs
      .filter((fd) => !!fd?.id)
      .map((fd) => {
        const key = String(fd!.id);
        let present = 0;
        for (const sub of sample) {
          const v = sub?.[key];
          // consider non-empty strings, non-null/undefined arrays/numbers/booleans as "present"
          const has =
            (typeof v === "string" && v.trim() !== "") ||
            (Array.isArray(v) && v.length > 0) ||
            (v !== null && v !== undefined && typeof v !== "string");
          if (has) present++;
        }
        const presentRate = sampleSize > 0 ? present / sampleSize : 0;
        return {
          fieldId: key,
          label: fd?.label,
          presentRate,
          missingRate: 1 - presentRate,
          sampleSize,
        };
      })
      // Highest missing rate first → “bottleneck candidates”
      .sort((a, b) => b.missingRate - a.missingRate);

    return {
      formId: f.id,
      title: f.title,
      views,
      starts,
      submissions,
      viewConversion,
      startConversion,
      fieldInsights,
    };
  });

  // Global funnel (views → starts → completions)
  const funnel: Funnel = {
    views: totalViews,
    starts: startsAgg,
    completions: totalSubmissions,
    startRate: totalViews > 0 ? startsAgg / totalViews : 0,
    completionRate: totalViews > 0 ? totalSubmissions / totalViews : 0,
    completionFromStart: startsAgg > 0 ? totalSubmissions / startsAgg : 0,
  };

  // Time series (last 30 days)
  const countsByDay = new Map<string, number>();
  for (let i = 30; i >= 0; i--) countsByDay.set(ymd(subDays(new Date(), i)), 0);
  for (const s of submissionsLast30) {
    const key = ymd(new Date(s.createdAt));
    countsByDay.set(key, (countsByDay.get(key) ?? 0) + 1);
  }
  const submissionsLast30Days = Array.from(countsByDay.entries()).map(
    ([date, count]) => ({ date, count })
  );

  return {
    totals: {
      totalForms,
      totalViews,
      totalSubmissions,
    },
    funnel,
    perForm,
    submissionsLast30Days,
  };
}

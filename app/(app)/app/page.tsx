import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";

import { Eye, Users, TrendingUp } from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ActionsBar from "@/components/dashboard/ActionsBar";
import KpiCard from "@/components/dashboard/KpiCard";
import FormsCard from "@/components/dashboard/FormsCard";
import PlanUsageCard from "@/components/dashboard/PlanUsageCard";
import type { FormSummary } from "@/components/dashboard/types";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await requireUser();
  if (!user) redirect(`/signin?next=/app`);

  // Load forms for the list
  const formsRaw = await prisma.form.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, createdAt: true },
  });

  const forms: FormSummary[] = formsRaw.map((f) => ({
    ...f,
    createdAt: f.createdAt,
  }));

  // ---- Real stats (views + submissions) ----
  const [viewsAgg, totalSubmissions] = await Promise.all([
    prisma.form.aggregate({
      where: { ownerId: user.id },
      _sum: { views: true },
    }),
    prisma.submission.count({
      where: { form: { ownerId: user.id } },
    }),
  ]);

  const totalViews = viewsAgg._sum.views ?? 0;

  // ---- Plan usage (still simple placeholders) ----
  const formsLimit = 25;
  const submissionsLimit = 1000;
  const currentForms = forms.length;
  const currentSubmissions = totalSubmissions;
  const pct = Math.min(
    100,
    Math.round(
      (0.5 * (currentForms / formsLimit) +
        0.5 * (currentSubmissions / submissionsLimit)) *
        100
    )
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Header + actions inline (no wrapping) */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <DashboardHeader />
        <ActionsBar />
      </div>

      {/* Usage / KPIs */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <PlanUsageCard
          pct={pct}
          currentForms={currentForms}
          formsLimit={formsLimit}
          currentSubmissions={currentSubmissions}
          submissionsLimit={submissionsLimit}
          planLabel="Pro"
        />

        <KpiCard
          icon={Eye}
          title="Total Views"
          value={<span>{totalViews.toLocaleString()}</span>}
          trend={
            <>
              <TrendingUp className="h-3 w-3" />
              <span>All-time</span>
            </>
          }
          // if you later compute a drop, set trendTone="warning"
        />

        <KpiCard
          icon={Users}
          title="Submissions"
          value={<span>{totalSubmissions.toLocaleString()}</span>}
          trend={
            <>
              <TrendingUp className="h-3 w-3" />
              <span>All-time</span>
            </>
          }
        />
      </div>

      <FormsCard forms={forms} />
    </main>
  );
}

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Eye, Users, TrendingUp } from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ActionsBar from "@/components/dashboard/ActionsBar";
import KpiCard from "@/components/dashboard/KpiCard";
import FormsCard from "@/components/dashboard/FormsCard";
import type { FormSummary } from "@/components/dashboard/types";
import PlanUsageCard from "@/components/dashboard/PlanUsageCard";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await requireUser();
  if (!user) redirect("/signin");

  const formsRaw = await prisma.form.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, createdAt: true },
  });

  // normalize to FormSummary
  const forms: FormSummary[] = formsRaw.map((f) => ({
    ...f,
    createdAt: f.createdAt,
  }));

  // mock KPIs
  const usagePercentage = 68;
  const pct = Math.max(0, Math.min(100, Math.round(usagePercentage || 0)));
  const formsLimit = 25;
  const submissionsLimit = 1000;
  const currentForms = forms.length;
  const currentSubmissions = 680;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <DashboardHeader />
      <ActionsBar />

      {/* Usage / KPIs */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols=3 md:grid-cols-3">
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
          value={<span>2,103</span>}
          trend={
            <>
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% from last month</span>
            </>
          }
        />

        <KpiCard
          icon={Users}
          title="Submissions"
          value={<span>213</span>}
          trend={
            <>
              <TrendingUp className="h-3 w-3" />
              <span>+8.2% from last month</span>
            </>
          }
        />
      </div>

      <FormsCard forms={forms} />
    </main>
  );
}

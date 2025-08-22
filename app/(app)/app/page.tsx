import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Plus,
  Sparkles,
  BarChart3,
  Eye,
  Users,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await requireUser();
  if (!user) redirect("/signin");

  const forms = await prisma.form.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, createdAt: true },
  });

  // mock KPIs for now
  const usagePercentage = 68;
  const formsLimit = 25;
  const submissionsLimit = 1000;
  const currentForms = forms.length;
  const currentSubmissions = 680;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your forms and view analytics
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Generate with AI
          </Button>
          <Link href="/app/forms/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Form
            </Button>
          </Link>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Plan Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="outline" className="bg-brand-gradient text-white">
                Pro
              </Badge>
              <span className="text-sm text-muted-foreground">
                {usagePercentage}%
              </span>
            </div>
            <Progress value={usagePercentage} className="mb-2 h-2" />
            <p className="text-xs text-muted-foreground">
              {currentForms}/{formsLimit} forms • {currentSubmissions}/
              {submissionsLimit} submissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Eye className="h-4 w-4" />
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">2,103</div>
            <div className="flex items-center gap-1 text-sm text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="h-4 w-4" />
              Submissions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">213</div>
            <div className="flex items-center gap-1 text-sm text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forms List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Your Forms
          </CardTitle>
        </CardHeader>
        <CardContent>
          {forms.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 font-semibold">Create your first form</h3>
              <p className="mb-6 text-muted-foreground">
                Get started by creating a new form or using a template
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate with AI
                </Button>
                <Link href="/app/forms/new">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Form
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {forms.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="font-semibold">{f.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        Draft
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span>
                        Updated {new Date(f.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/forms/${f.slug}`} target="_blank">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/app/forms/${f.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

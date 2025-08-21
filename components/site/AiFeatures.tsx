import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Sparkles, Zap, type LucideIcon } from "lucide-react";

function Row({
  Icon,
  title,
  desc,
}: {
  Icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-gradient shadow-soft">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

export default function AiFeatures() {
  return (
    <section id="features" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-[hsl(var(--accent))]/20 bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]">
            ✨ AI-Powered
          </Badge>
          <h2 className="mb-4 text-4xl font-bold">
            AI magic that actually helps
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Practical AI features designed to save you time, not replace your
            judgment
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <Row
              Icon={Sparkles}
              title="Generate forms from prompts"
              desc="Describe your form needs and let AI create the structure, fields, and logic for you."
            />
            <Row
              Icon={BarChart3}
              title="Smart response summaries"
              desc="Get one-line AI summaries of long responses to quickly understand what matters."
            />
            <Row
              Icon={Zap}
              title="Draft replies instantly"
              desc="Generate professional response drafts you can edit and send directly from your inbox."
            />
          </div>

          <div className="relative">
            {/* keep your gradient background, but it's now softened via CSS */}
            <div className="gradient-border rounded-2xl">
              <Card className="card-surface rounded-[calc(1rem-1px)] border-0 shadow-strong">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      {/* Higher-contrast text on the same accent-tint background */}
                      <Badge
                        variant="outline"
                        className="border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/12 text-[hsl(var(--accent-foreground))]">
                        AI Summary
                      </Badge>

                      {/* Clear positive chip */}
                      <Badge
                        variant="outline"
                        className="border-emerald-500/40 bg-emerald-500/12 text-emerald-700 dark:text-emerald-200">
                        Positive 😊
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium">
                        New client interested in hair coloring service, prefers
                        weekend appointments
                      </p>
                      <div className="rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">
                        “I&apos;ve been thinking about getting highlights for
                        months and finally decided to book! I work during the
                        week so weekends would be perfect. I have naturally dark
                        hair and want something subtle but noticeable…”
                      </div>
                    </div>

                    <Button size="sm" variant="outline" className="gap-2">
                      <Sparkles className="h-3 w-3" />
                      Draft Reply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

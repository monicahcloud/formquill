import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing({ features }: { features: string[] }) {
  return (
    <section id="pricing" className="bg-muted/20 px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-4xl font-bold">Simple, transparent pricing</h2>
        <p className="mb-12 text-xl text-muted-foreground">
          Choose the plan that fits your organization&apos;s needs
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Starter */}
          <Card className="border-0 shadow-lg card-lift">
            <CardContent className="p-8">
              <h3 className="mb-2 text-2xl font-bold">Starter</h3>
              <div className="mb-4 text-4xl font-bold">
                $9<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="mb-6 text-muted-foreground">
                Perfect for getting started
              </p>
              <div className="mb-8 space-y-3">
                <PriceRow text="Up to 5 forms" />
                <PriceRow text="500 submissions/month" />
                <PriceRow text="Basic templates" />
                <PriceRow text="Email support" />
              </div>
              <Button variant="outline" className="w-full">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="relative border-2 border-primary/20 shadow-xl card-lift">
            <Badge className="badge-glow absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(var(--primary))] text-white">
              Most Popular
            </Badge>
            <CardContent className="p-8">
              <h3 className="mb-2 text-2xl font-bold">Pro</h3>
              <div className="mb-4 text-4xl font-bold">
                $19<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="mb-6 text-muted-foreground">
                Everything you need to scale
              </p>
              <div className="mb-8 space-y-3">
                {features.map((f) => (
                  <PriceRow key={f} text={f} />
                ))}
              </div>
              <Button className="w-full bg-brand-gradient hover:opacity-95">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}

function PriceRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Check className="h-4 w-4 text-[hsl(var(--accent))]" />
      <span>{text}</span>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import type { Feature } from "@/lib/landing";

export default function FeaturesGrid({ features }: { features: Feature[] }) {
  return (
    <section className="bg-muted/20 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Trusted by small organizations
          </h2>
          <p className="text-xl text-muted-foreground">
            Built for churches, salons, clinics, and real estate professionals
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="border-0 text-center shadow-lg card-lift">
              <CardContent className="pb-6 pt-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-gradient shadow-soft">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// app/forms/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormRenderer from "@/components/forms/FormRenderer";
import { Card, CardContent } from "@/components/ui/card";
import type { Field } from "@/types/form";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function readFields(value: unknown): Field[] {
  return Array.isArray(value) ? (value as Field[]) : [];
}

export default async function PublicForm({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const form = await prisma.form.findUnique({
    where: { slug },
  });

  if (!form) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{form.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Powered by FormQuill
        </p>
      </div>

      <Card className="border border-border/60 shadow-sm">
        <CardContent className="p-6">
          <FormRenderer
            form={{
              id: form.id,
              title: form.title,
              slug: form.slug,
              fields: readFields(form.fields),
              // if your renderer expects a settings object, keep default:
              settings: { renderer: "classic" },
              createdAt: form.createdAt.toISOString(),
              updatedAt: form.updatedAt.toISOString(),
            }}
          />
        </CardContent>
      </Card>
    </main>
  );
}

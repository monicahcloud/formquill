/* eslint-disable @typescript-eslint/no-explicit-any */
// app/forms/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormRenderer from "@/components/forms/FormRenderer";
import type { Field } from "@/types/form";

export const dynamic = "force-dynamic";

type FormSettings = { renderer: "classic" | "chat" };
function normalizeSettings(v: unknown): FormSettings {
  const r = (v as any)?.renderer;
  return r === "chat" || r === "classic"
    ? { renderer: r }
    : { renderer: "classic" };
}

export default async function PublicForm({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const form = await prisma.form.findUnique({ where: { slug } });
  if (!form) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-1 text-3xl font-bold">{form.title}</h1>
      <p className="mb-8 text-sm text-muted-foreground">Powered by FormQuill</p>

      <FormRenderer
        form={{
          id: form.id,
          title: form.title,
          slug: form.slug,
          fields: (form.fields ?? []) as Field[],
          settings: normalizeSettings(form.settings),
          createdAt: form.createdAt.toISOString(),
          updatedAt: form.updatedAt.toISOString(),
        }}
      />
    </main>
  );
}

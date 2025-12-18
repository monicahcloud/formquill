// app/forms/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormRenderer from "@/components/forms/FormRenderer";
import type { Field } from "@/types/form";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Renderer = "classic" | "chat";

function normalizeRenderer(value: unknown): Renderer {
  return value === "chat" ? "chat" : "classic";
}

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
    include: { settings: true },
  });

  if (!form) notFound();

  const renderer = normalizeRenderer(form.settings?.renderer);

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-1 text-3xl font-bold">{form.title}</h1>
      <p className="mb-8 text-sm text-muted-foreground">Powered by FormQuill</p>

      <FormRenderer
        form={{
          id: form.id,
          title: form.title,
          slug: form.slug,
          fields: readFields(form.fields),
          settings: { renderer },
          createdAt: form.createdAt.toISOString(),
          updatedAt: form.updatedAt.toISOString(),
        }}
      />
    </main>
  );
}

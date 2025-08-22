import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormRenderer from "@/components/forms/FormRenderer";
import { toFormDTO } from "@/lib/mapper";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function PublicForm({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const dbForm = await prisma.form.findUnique({
    where: { slug },
    select: { id: true, title: true, slug: true, fields: true, settings: true },
  });
  if (!dbForm) notFound();

  const form = toFormDTO(dbForm); // ✅ normalize JSON → typed DTO
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-1 text-3xl font-bold">{form.title}</h1>
      <p className="mb-8 text-sm text-muted-foreground">Powered by FormQuill</p>
      <FormRenderer form={form} />
    </main>
  );
}

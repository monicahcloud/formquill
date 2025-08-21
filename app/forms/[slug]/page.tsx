import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormRenderer from "@/components/forms/FormRenderer";
export const dynamic = "force-dynamic";

export default async function PublicForm({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const form = await prisma.form.findUnique({ where: { slug } });
  if (!form) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-1 text-3xl font-bold">{form.title}</h1>
      <p className="mb-8 text-sm text-muted-foreground">Powered by FormQuill</p>
      {/* pass form to your existing <FormRenderer /> */}
      <FormRenderer form={form} />
    </main>
  );
}

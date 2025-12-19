// app/(app)/app/forms/[id]/edit/page.tsx
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { slugify } from "@/lib/slug";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import type { Field } from "@/types/form";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function readFields(value: unknown): Field[] {
  return Array.isArray(value) ? (value as Field[]) : [];
}
function writeFields(fields: Field[]): Prisma.InputJsonValue {
  return fields as unknown as Prisma.InputJsonValue;
}

export default async function EditFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await requireUser();
  if (!user) redirect("/signin");

  const form = await prisma.form.findUnique({
    where: { id },
    include: { settings: true },
  });

  if (!form || form.ownerId !== user.id) notFound();

  const fields = readFields(form.fields);

  async function updateMeta(formData: FormData) {
    "use server";

    const authed = await requireUser();
    if (!authed) redirect("/signin");

    const id = String(formData.get("id") ?? "");
    const title = String(formData.get("title") ?? "").trim();
    const slugRaw = String(formData.get("slug") ?? "").trim();

    if (!id || !title) throw new Error("Missing required fields.");

    const existing = await prisma.form.findUnique({ where: { id } });
    if (!existing) notFound();
    if (existing.ownerId !== authed.id) throw new Error("Unauthorized");

    const nextSlug = slugRaw ? slugify(slugRaw) : existing.slug;

    if (nextSlug !== existing.slug) {
      const clash = await prisma.form.findUnique({ where: { slug: nextSlug } });
      if (clash) throw new Error(`Slug "${nextSlug}" is already in use`);
    }

    await prisma.form.update({
      where: { id },
      data: { title, slug: nextSlug },
    });

    revalidatePath(`/app/forms/${id}/edit`);
  }

  async function addField(formData: FormData) {
    "use server";

    const authed = await requireUser();
    if (!authed) redirect("/signin");

    const id = String(formData.get("id") ?? "");
    const label = String(formData.get("label") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const type = String(formData.get("type") ?? "text") as Field["type"];
    const required = Boolean(formData.get("required"));

    if (!id || !label || !name) throw new Error("Label and name are required.");

    const existing = await prisma.form.findUnique({ where: { id } });
    if (!existing) notFound();
    if (existing.ownerId !== authed.id) throw new Error("Unauthorized");

    const current = readFields(existing.fields);

    const newField: Field = {
      id: randomUUID(),
      type,
      label,
      name,
      required,
      placeholder: "",
      options: ["select", "radio", "checkbox"].includes(type)
        ? [{ label: "Option 1", value: "option-1" }]
        : undefined,
    };

    await prisma.form.update({
      where: { id },
      data: { fields: writeFields([...current, newField]) },
    });

    revalidatePath(`/app/forms/${id}/edit`);
  }

  async function removeField(formData: FormData) {
    "use server";

    const authed = await requireUser();
    if (!authed) redirect("/signin");

    const id = String(formData.get("id") ?? "");
    const fieldId = String(formData.get("fieldId") ?? "");
    if (!id || !fieldId) return;

    const existing = await prisma.form.findUnique({ where: { id } });
    if (!existing) notFound();
    if (existing.ownerId !== authed.id) throw new Error("Unauthorized");

    const current = readFields(existing.fields);
    const next = current.filter((f) => f.id !== fieldId);

    await prisma.form.update({
      where: { id },
      data: { fields: writeFields(next) },
    });

    revalidatePath(`/app/forms/${id}/edit`);
  }

  async function moveField(formData: FormData) {
    "use server";

    const authed = await requireUser();
    if (!authed) redirect("/signin");

    const id = String(formData.get("id") ?? "");
    const fieldId = String(formData.get("fieldId") ?? "");
    const dir = Number(formData.get("dir")); // -1 up, +1 down
    if (!id || !fieldId || !Number.isFinite(dir)) return;

    const existing = await prisma.form.findUnique({ where: { id } });
    if (!existing) notFound();
    if (existing.ownerId !== authed.id) throw new Error("Unauthorized");

    const arr = [...readFields(existing.fields)];
    const index = arr.findIndex((f) => f.id === fieldId);
    if (index === -1) return;

    const swap = index + dir;
    if (swap < 0 || swap >= arr.length) return;

    [arr[index], arr[swap]] = [arr[swap], arr[index]];

    await prisma.form.update({
      where: { id },
      data: { fields: writeFields(arr) },
    });

    revalidatePath(`/app/forms/${id}/edit`);
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit form</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Update your form metadata and manage fields.
          </p>
        </div>

        <a
          className="text-sm text-muted-foreground underline hover:text-foreground"
          href={`/forms/${form.slug}`}
          target="_blank"
          rel="noreferrer">
          View public form →
        </a>
      </div>

      {/* Meta */}
      <form
        action={updateMeta}
        className="grid grid-cols-1 gap-6 md:grid-cols-6">
        <input type="hidden" name="id" value={form.id} />

        {/* Title */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={form.title} required />
        </div>

        {/* Form URL */}
        <div className="space-y-2 md:col-span-3">
          <Label htmlFor="slug">Form URL</Label>

          {/* Input + button inline on md+ */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1">
              <Input id="slug" name="slug" defaultValue={form.slug} />
            </div>

            <Button
              className="bg-brand-gradient hover:opacity-95 md:h-10 md:px-6"
              type="submit">
              Save
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            You can customize the last part of the link.{" "}
            <code className="text-foreground">/forms/{form.slug}</code>
          </p>
        </div>
      </form>

      {/* Fields */}
      <Card className="border border-border/60 shadow-sm">
        <CardContent className="space-y-6 p-6">
          <div>
            <h2 className="text-xl font-semibold">Fields</h2>
            <p className="text-sm text-muted-foreground">
              Add, reorder, and remove fields.
            </p>
          </div>

          {/* Add field */}
          <form
            action={addField}
            className="grid grid-cols-1 gap-4 md:grid-cols-6 items-end rounded-xl border border-border/60 bg-muted/20 p-4">
            <input type="hidden" name="id" value={form.id} />

            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="label">Label</Label>
              <Input id="label" name="label" placeholder="Full name" required />
            </div>

            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="full_name" required />
            </div>

            <div className="space-y-1 md:col-span-1">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                name="type"
                className="h-10 w-full rounded-md border border-border/60 bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))/0.25]">
                <option value="text">text</option>
                <option value="email">email</option>
                <option value="tel">tel</option>
                <option value="textarea">textarea</option>
                <option value="select">select</option>
                <option value="radio">radio</option>
                <option value="checkbox">checkbox</option>
                <option value="date">date</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 md:col-span-1">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="required" />
                Required
              </label>

              <Button
                type="submit"
                className="bg-brand-gradient hover:opacity-95">
                Add
              </Button>
            </div>
          </form>

          {/* List fields */}
          <div className="space-y-3">
            {fields.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No fields yet. Add your first field above.
              </p>
            ) : (
              fields.map((f, i) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-soft">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 w-6 text-right text-xs text-muted-foreground">
                      {i + 1}.
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">
                        {f.label}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {f.type} · name=
                        <code className="text-foreground">{f.name}</code>{" "}
                        {f.required ? "· required" : ""}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <form action={moveField}>
                      <input type="hidden" name="id" value={form.id} />
                      <input type="hidden" name="fieldId" value={f.id} />
                      <input type="hidden" name="dir" value={-1} />
                      <Button variant="outline" size="sm" disabled={i === 0}>
                        ↑
                      </Button>
                    </form>

                    <form action={moveField}>
                      <input type="hidden" name="id" value={form.id} />
                      <input type="hidden" name="fieldId" value={f.id} />
                      <input type="hidden" name="dir" value={1} />
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={i === fields.length - 1}>
                        ↓
                      </Button>
                    </form>

                    <form action={removeField}>
                      <input type="hidden" name="id" value={form.id} />
                      <input type="hidden" name="fieldId" value={f.id} />
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

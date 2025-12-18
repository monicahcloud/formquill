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

/**
 * Your Form.fields is Json in Prisma.
 * These helpers keep TS happy and avoid accidental non-array shapes.
 */
function readFields(value: unknown): Field[] {
  if (!Array.isArray(value)) return [];
  return value as Field[];
}

function writeFields(fields: Field[]): Prisma.InputJsonValue {
  // Prisma expects InputJsonValue for Json columns
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

  // ✅ include settings relation so `form.settings` exists
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
    const renderer = String(formData.get("renderer") ?? "classic") as
      | "classic"
      | "chat";

    if (!id || !title) throw new Error("Missing required fields.");

    const existing = await prisma.form.findUnique({
      where: { id },
      include: { settings: true },
    });

    if (!existing) notFound();
    if (existing.ownerId !== authed.id) throw new Error("Unauthorized");

    const nextSlug = slugRaw ? slugify(slugRaw) : existing.slug;

    if (nextSlug !== existing.slug) {
      const clash = await prisma.form.findUnique({ where: { slug: nextSlug } });
      if (clash) throw new Error(`Slug "${nextSlug}" is already in use`);
    }

    await prisma.form.update({
      where: { id },
      data: {
        title,
        slug: nextSlug,
        settings: {
          upsert: {
            create: {
              renderer,
              successMessage:
                existing.settings?.successMessage ??
                "Thanks! We received your response.",
            },
            update: { renderer },
          },
        },
      },
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

    if (!id || !label || !name) {
      throw new Error("Label and name are required.");
    }

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
    <main className="mx-auto max-w-4xl space-y-10 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit form</h1>
        <a
          className="text-sm underline"
          href={`/forms/${form.slug}`}
          target="_blank"
          rel="noreferrer">
          View public form →
        </a>
      </div>

      {/* Meta */}
      <Card>
        <CardContent className="p-6">
          <form
            action={updateMeta}
            className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <input type="hidden" name="id" value={form.id} />

            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={form.title}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={form.slug} />
            </div>

            <div className="md:col-span-1" />

            <div className="md:col-span-3">
              <Button
                className="bg-brand-gradient hover:opacity-95"
                type="submit">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Fields */}
      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="text-xl font-semibold">Fields</h2>

          {/* Add field */}
          <form
            action={addField}
            className="grid grid-cols-1 gap-3 md:grid-cols-6">
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
                className="h-10 w-full rounded-md border px-3">
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

            <div className="flex items-end gap-2 md:col-span-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="required" />{" "}
                <span className="text-sm">Required</span>
              </label>
              <Button type="submit">Add</Button>
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
                  className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="w-5 text-right text-xs text-muted-foreground">
                      {i + 1}.
                    </span>
                    <div className="truncate">
                      <div className="text-sm font-medium">{f.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {f.type} · name=<code>{f.name}</code>{" "}
                        {f.required ? "· required" : ""}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* move up */}
                    <form action={moveField}>
                      <input type="hidden" name="id" value={form.id} />
                      <input type="hidden" name="fieldId" value={f.id} />
                      <input type="hidden" name="dir" value={-1} />
                      <Button variant="outline" size="sm" disabled={i === 0}>
                        ↑
                      </Button>
                    </form>

                    {/* move down */}
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

                    {/* remove */}
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

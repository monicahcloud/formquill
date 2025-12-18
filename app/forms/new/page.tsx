import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session"; // from your auth
import { slugify } from "@/lib/slug";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const runtime = "nodejs";

async function createForm(formData: FormData) {
  "use server";
  const user = await requireUser();
  if (!user) redirect("/signin");

  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "");
  const renderer = String(formData.get("renderer") ?? "classic") as
    | "classic"
    | "chat";

  if (!title) throw new Error("Title is required");
  const base = slugRaw || title;
  const slug = slugify(base);

  const exists = await prisma.form.findUnique({ where: { slug } });
  if (exists) throw new Error(`Slug "${slug}" is already in use`);

  const form = await prisma.form.create({
    data: {
      ownerId: user.id,
      createdById: user.id,
      title,
      slug,
      fields: [],
      settings: {
        create: {
          renderer,
          successMessage: "Thanks! We received your response.",
        },
      },
    },
    select: { id: true, slug: true },
  });

  redirect(`/app/forms/${form.id}/edit`);
}

export default async function NewFormPage() {
  const user = await requireUser();
  if (!user) redirect("/signin");

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold">Create a new form</h1>

      <Card>
        <CardContent className="p-6">
          <form action={createForm} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Salon Intake"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (optional)</Label>
              <Input id="slug" name="slug" placeholder="salon-intake" />
              <p className="text-xs text-muted-foreground">
                Final URL will be <code>/forms/&lt;slug&gt;</code>. Leave empty
                to generate from title.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Renderer</Label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="renderer"
                    value="classic"
                    defaultChecked
                  />{" "}
                  Classic
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="renderer" value="chat" />{" "}
                  Conversational
                </label>
              </div>
            </div>

            <Button
              className="bg-brand-gradient hover:opacity-95"
              type="submit">
              Create form
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

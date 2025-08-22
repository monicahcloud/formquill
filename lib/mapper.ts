import type { FormDTO } from "@/types/form";

/** Prisma returns Json | null; normalize to a safe DTO for the UI */
export function toFormDTO(db: {
  id: string;
  title: string;
  slug: string;
  fields: unknown; // Prisma.JsonValue | null
  settings: unknown; // Prisma.JsonValue | null
}): FormDTO {
  const fields = (db.fields ?? []) as FormDTO["fields"];
  const settings = {
    renderer: "classic",
    ...(db.settings ?? {}),
  } as FormDTO["settings"];

  return {
    id: db.id,
    title: db.title,
    slug: db.slug,
    fields,
    settings,
  };
}

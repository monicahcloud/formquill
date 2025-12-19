// "use server";

// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import { requireUser } from "@/lib/session";
// import { slugify } from "@/lib/slug";
// import type { Field } from "@/types/form";

// // Your template IDs are numeric in the client list.
// // We'll store them as a string in the DB action signature to keep it simple.
// export async function createFormFromMarketingTemplate(templateId: number) {
//   const user = await requireUser();
//   if (!user) redirect("/signin?next=/templates");

//   const tpl = getTemplateById(templateId);
//   if (!tpl) throw new Error("Template not found.");

//   const slug = `${slugify(tpl.title)}-${Date.now()}`;

//   const form = await prisma.form.create({
//     data: {
//       ownerId: user.id,
//       createdById: user.id,
//       title: tpl.title,
//       slug,
//       fields: tpl.fields,
//       settings: {
//         create: {
//           renderer: tpl.renderer,
//           successMessage: "Thanks! We received your response.",
//         },
//       },
//     },
//     select: { id: true },
//   });

//   redirect(`/app/forms/${form.id}/edit`);
// }

// /**
//  * Phase 1: hardcoded templates to keep moving fast.
//  * Phase 2: replace with a FormTemplate table + seed.
//  */
// function getTemplateById(id: number): {
//   title: string;
//   renderer: "classic" | "chat";
//   fields: Field[];
// } | null {
//   const map: Record<
//     number,
//     { title: string; renderer: "classic" | "chat"; fields: Field[] }
//   > = {
//     35: {
//       title: "Salon Appointment",
//       renderer: "classic",
//       fields: [
//         {
//           id: crypto.randomUUID(),
//           type: "text",
//           label: "Full name",
//           name: "full_name",
//           required: true,
//         },
//         {
//           id: crypto.randomUUID(),
//           type: "email",
//           label: "Email",
//           name: "email",
//           required: true,
//         },
//         {
//           id: crypto.randomUUID(),
//           type: "tel",
//           label: "Phone",
//           name: "phone",
//           required: false,
//         },
//         {
//           id: crypto.randomUUID(),
//           type: "select",
//           label: "Service",
//           name: "service",
//           required: true,
//           options: [
//             { label: "Cut", value: "cut" },
//             { label: "Color", value: "color" },
//             { label: "Style", value: "style" },
//           ],
//         },
//         {
//           id: crypto.randomUUID(),
//           type: "date",
//           label: "Preferred date",
//           name: "preferred_date",
//           required: false,
//         },
//         {
//           id: crypto.randomUUID(),
//           type: "textarea",
//           label: "Notes",
//           name: "notes",
//           required: false,
//           placeholder: "Anything we should know?",
//         },
//       ],
//     },

//     // Add more mappings incrementally (start with top 10).
//   };

//   return map[id] ?? null;
// }

// src/actions/template.actions.ts
// app/(app)/app/actions/template.actions.ts
"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { slugify } from "@/lib/slug";
import {
  MARKETING_TEMPLATES,
  type MarketingTemplate,
} from "@/lib/templates/marketingTemplates";

function getTemplateById(id: number): MarketingTemplate | undefined {
  return MARKETING_TEMPLATES.find((t) => t.id === id);
}

function uniqueSlug(base: string) {
  return slugify(base);
}

export async function createFormFromMarketingTemplate(formData: FormData) {
  const user = await requireUser();
  if (!user) redirect("/signin?next=/templates");

  const templateId = Number(formData.get("templateId"));
  if (!Number.isFinite(templateId)) {
    throw new Error("Missing templateId");
  }

  const tpl = getTemplateById(templateId);
  if (!tpl) {
    throw new Error(`No template found for id=${templateId}`);
  }

  // ensure unique slug per user (simple v1: suffix if needed)
  const baseSlug = uniqueSlug(tpl.slug ?? tpl.title);
  let slug = baseSlug;
  let i = 2;

  // (optional) scope uniqueness globally or per-owner; your schema has slug unique globally
  while (await prisma.form.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${i++}`;
  }

  const created = await prisma.form.create({
    data: {
      ownerId: user.id,
      createdById: user.id, // ✅ required in your schema
      title: tpl.title,
      slug,
      description: tpl.description ?? "",
      fields: tpl.fields ?? [],
      // NOTE: only include settings.create fields that actually exist on FormSettings model
      settings: {
        create: {
          primaryColor: tpl.primaryColor ?? "#0891B2",
          backgroundColor: tpl.backgroundColor ?? "#FFFFFF",
        },
      },
    },
    select: { id: true },
  });

  redirect(`/app/forms/${created.id}/edit`);
}

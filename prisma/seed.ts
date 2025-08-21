import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

function id() {
  return crypto.randomUUID();
}

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@formquill.com" },
    update: {},
    create: {
      email: "demo@formquill.com",
      password: randomBytes(16).toString("hex"),
    },
  });

  await prisma.form.upsert({
    where: { slug: "salon-intake" },
    update: {},
    create: {
      ownerId: user.id,
      title: "Salon Intake",
      slug: "salon-intake",
      fields: [
        {
          id: id(),
          type: "text",
          name: "full_name",
          label: "Full name",
          required: true,
          placeholder: "Jane Doe",
        },
        {
          id: id(),
          type: "email",
          name: "email",
          label: "Email",
          required: true,
        },
        {
          id: id(),
          type: "select",
          name: "service",
          label: "Service",
          required: true,
          options: [
            { label: "Highlights", value: "highlights" },
            { label: "Color", value: "color" },
            { label: "Cut", value: "cut" },
          ],
        },
        {
          id: id(),
          type: "textarea",
          name: "notes",
          label: "Notes",
          placeholder: "Tell us about your hair goals…",
        },
      ],
      settings: {
        renderer: "classic",
        successMessage: "We’ll get back to you shortly ✨",
      },
    },
  });

  console.log("Seeded /forms/salon-intake");
}

main().finally(() => prisma.$disconnect());

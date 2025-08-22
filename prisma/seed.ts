// prisma/seed.ts
import { PrismaClient, Prisma } from "@prisma/client";
import { hashPassword } from "../lib/password"; // adjust if your path differs
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@formquill.com";
  const username = "demo";
  const plain = "demo1234"; // sign in with this
  const password = await hashPassword(plain);

  // 1) Ensure demo user exists
  const user = await prisma.user.upsert({
    where: { email },
    update: { username, password },
    create: { username, email, password },
  });

  // Helper to make a field
  const f = (
    p: Partial<{
      id: string;
      type: string;
      label: string;
      name: string;
      required: boolean;
      placeholder?: string;
      options?: string[];
    }>
  ) => ({
    id: p.id ?? randomUUID(),
    type: p.type ?? "text",
    label: p.label ?? "",
    name: p.name ?? "",
    required: Boolean(p.required),
    ...(p.placeholder ? { placeholder: p.placeholder } : {}),
    ...(p.options ? { options: p.options } : {}),
  });

  // 2) Seed a couple public forms you can test
  const seedForm = async (title: string, slug: string, fields: unknown[]) => {
    await prisma.form.upsert({
      where: { slug },
      update: {},
      create: {
        title,
        slug,
        ownerId: user.id,
        fields: fields as Prisma.InputJsonValue, // 👈 cast JSON
        settings: { renderer: "classic" } as Prisma.InputJsonValue, // 👈 cast JSON
      },
    });
  };

  await seedForm("New Client Intake", "sample-intake", [
    f({
      type: "text",
      label: "Full name",
      name: "full_name",
      required: true,
      placeholder: "Jane Doe",
    }),
    f({
      type: "email",
      label: "Email",
      name: "email",
      required: true,
      placeholder: "you@example.com",
    }),
    f({
      type: "tel",
      label: "Phone",
      name: "phone",
      required: false,
      placeholder: "(555) 555-1234",
    }),
    f({
      type: "select",
      label: "Service",
      name: "service",
      required: true,
      options: ["Cut", "Color", "Style"],
    }),
    f({
      type: "textarea",
      label: "Notes",
      name: "notes",
      required: false,
      placeholder: "Anything we should know?",
    }),
  ]);

  await seedForm("Salon Intake", "salon-intake", [
    f({ type: "text", label: "Full name", name: "full_name", required: true }),
    f({ type: "email", label: "Email", name: "email", required: true }),
    f({
      type: "select",
      label: "Hair length",
      name: "hair_length",
      required: true,
      options: ["Short", "Medium", "Long"],
    }),
  ]);

  console.log("Seeded demo user:", { email, username, password: plain });

  console.log("Forms:", ["/forms/sample-intake", "/forms/salon-intake"]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

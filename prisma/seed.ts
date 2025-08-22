// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password"; // adjust path if different
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@formquill.com";
  const username = "demo";
  const plain = "demo1234"; // sign in with this
  const password = await hashPassword(plain);

  // make sure user exists
  const user = await prisma.user.upsert({
    where: { email },
    update: { username },
    create: { username, email, password },
  });

  // optional: seed a sample form
  await prisma.form.upsert({
    where: { slug: "sample-intake" },
    update: {},
    create: {
      title: "New Client Intake",
      slug: "sample-intake",
      ownerId: user.id,
      fields: [
        {
          id: randomUUID(),
          type: "text",
          label: "Full name",
          name: "full_name",
          required: true,
          placeholder: "Jane Doe",
        },
        {
          id: randomUUID(),
          type: "email",
          label: "Email",
          name: "email",
          required: true,
          placeholder: "you@example.com",
        },
      ],
      settings: { renderer: "classic" }, // matches your FormSettings
    },
  });

  // eslint-disable-next-line no-console
  console.log("Seeded demo user:", { email, username, password: plain });
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// scripts/backfill-users.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function slugifyBase(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .slice(0, 24);
}

async function main() {
  // Pull rows that still have nulls, bypassing Prisma's non-null TS types
  const rows = await prisma.$queryRaw<
    Array<{ id: string; email: string | null; username: string | null }>
  >`
    SELECT id, email, username FROM "User"
    WHERE username IS NULL OR email IS NULL
  `;

  for (const u of rows) {
    let username = u.username ?? null;
    let email = u.email ?? null;

    if (!username) {
      const base = email ? slugifyBase(email.split("@")[0]) : "user";
      username = `${base}-${u.id.slice(0, 6)}`;
    }
    if (!email) {
      // Placeholder domain reserved for docs; won't send mail accidentally
      email = `user+${u.id.slice(0, 6)}@example.com`;
    }

    // Retry once with a disambiguation suffix if unique constraint hits
    try {
      await prisma.user.update({
        where: { id: u.id },
        data: { username, email },
      });
    } catch {
      // likely unique violation; append a short suffix
      await prisma.user.update({
        where: { id: u.id },
        data: {
          username: `${username}-${u.id.slice(6, 8)}`,
          email: email.includes("@example.com")
            ? `user+${u.id.slice(0, 8)}@example.com`
            : email,
        },
      });
    }
  }
}

main()
  .then(() => console.log("Backfill complete"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

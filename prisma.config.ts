// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Used by Prisma CLI (migrate, studio) as of v7
  datasource: {
    // Use DIRECT_URL if you have a non-pooled URL for migrations.
    // Otherwise, you can use DATABASE_URL here too.
    url: env("DIRECT_URL"),
  },
});

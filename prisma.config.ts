import "dotenv/config"
import path from "node:path"
import { defineConfig } from "prisma/config"

/**
 * Prisma 7 moved the datasource URL out of `schema.prisma`.
 * The CLI (`prisma db push`, `prisma migrate`, `prisma studio`) reads it here;
 * the runtime client gets it through the pg driver adapter in `src/lib/prisma.ts`.
 */
export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
})

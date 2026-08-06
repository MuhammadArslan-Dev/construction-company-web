import { PrismaPg } from "@prisma/adapter-pg"

import { PrismaClient } from "@/generated/prisma/client"
import { env, isProduction } from "@/lib/env"

/**
 * Lazily-instantiated Prisma singleton.
 *
 * Prisma 7 requires a driver adapter, and the adapter opens a pool as soon as
 * it is constructed. Building the client behind a proxy keeps `next build`,
 * static generation and any DB-free page from needing `DATABASE_URL` at all —
 * the connection is only created the first time a query is actually issued.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

function createPrismaClient(): PrismaClient {
  if (!env.DATABASE_URL) {
    throw new Error(
      "[prisma] DATABASE_URL is not set. Add it to .env before running database queries."
    )
  }

  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })

  return new PrismaClient({
    adapter,
    log: isProduction ? ["error"] : ["warn", "error"],
  })
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  return globalForPrisma.prisma
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    return Reflect.get(getPrismaClient(), property, receiver)
  },
})

/** True when a database is configured — use to gracefully degrade to static data. */
export const hasDatabase = Boolean(env.DATABASE_URL)

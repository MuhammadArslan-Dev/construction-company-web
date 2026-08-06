import { z } from "zod"

/**
 * Environment contract.
 *
 * Everything is optional at *parse* time so that `next build`, previews and
 * static generation never fail on a machine with no database or Cloudinary
 * account attached. Consumers that genuinely need a value call
 * `requireEnv("DATABASE_URL")`, which throws a readable error at the moment of
 * use rather than at import time.
 *
 * Empty strings in `.env` are normalised to `undefined` — otherwise a declared
 * but blank `DATABASE_URL=` would fail URL validation and poison the whole parse.
 */
const blankToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => (value === "" ? undefined : value), schema.optional())

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // Database
  DATABASE_URL: blankToUndefined(z.string().min(1)),

  // Better Auth
  BETTER_AUTH_SECRET: blankToUndefined(z.string().min(16)),
  BETTER_AUTH_URL: blankToUndefined(z.string().url()),

  // Cloudinary
  CLOUDINARY_API_KEY: blankToUndefined(z.string()),
  CLOUDINARY_API_SECRET: blankToUndefined(z.string()),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: blankToUndefined(z.string()),

  // Anthropic — powers the AI construction assistant. Absent is a supported
  // state: the assistant falls back to deterministic site retrieval.
  ANTHROPIC_API_KEY: blankToUndefined(z.string().min(1)),

  // Public
  NEXT_PUBLIC_SITE_URL: blankToUndefined(z.string().url()),
})

export type Env = z.infer<typeof envSchema>

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.warn(
    "[env] Some environment variables are malformed and were ignored:",
    parsed.error.issues.map((issue) => issue.path.join(".")).join(", ")
  )
}

export const env: Env = parsed.success
  ? parsed.data
  : ({ NODE_ENV: (process.env.NODE_ENV ?? "development") as Env["NODE_ENV"] } as Env)

/** Throws a descriptive error when a genuinely required variable is missing. */
export function requireEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = env[key]
  if (value === undefined || value === "") {
    throw new Error(
      `[env] Missing required environment variable "${String(key)}". ` +
        "Add it to your .env file — see .env.example for the expected shape."
    )
  }
  return value as NonNullable<Env[K]>
}

export const isProduction = env.NODE_ENV === "production"
export const isDevelopment = env.NODE_ENV === "development"

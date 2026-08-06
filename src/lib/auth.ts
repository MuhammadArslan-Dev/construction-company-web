import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"

import { siteConfig } from "@/config/site"
import { env } from "@/lib/env"
import { prisma } from "@/lib/prisma"

/**
 * Better Auth instance backing the private editorial dashboard
 * (project/blog/careers management). The public marketing site does not
 * require a session.
 */
export const auth = betterAuth({
  appName: siteConfig.legalName,
  baseURL: env.BETTER_AUTH_URL ?? env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url,
  secret: env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 60 * 5 },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "EDITOR",
        input: false,
      },
    },
  },
  advanced: {
    cookiePrefix: "meridian",
  },
  plugins: [nextCookies()],
})

export type Session = typeof auth.$Infer.Session
export type AuthUser = typeof auth.$Infer.Session.user

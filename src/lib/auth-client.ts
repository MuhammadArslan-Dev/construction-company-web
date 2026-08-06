"use client"

import { createAuthClient } from "better-auth/react"

import { siteConfig } from "@/config/site"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url,
})

export const { signIn, signOut, signUp, useSession } = authClient

"use server"

import { hasDatabase, prisma } from "@/lib/prisma"
import { isProduction } from "@/lib/env"
import {
  inquirySchema,
  newsletterSchema,
  type ActionResult,
  type InquiryInput,
  type NewsletterInput,
} from "@/lib/schemas"

function toFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string[]> = {}
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form")
    fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message]
  }
  return fieldErrors
}

/** Zod's kebab-case intents → the Prisma enum. */
const intentToEnum = {
  general: "GENERAL",
  quote: "QUOTE",
  "site-visit": "SITE_VISIT",
  consultation: "CONSULTATION",
  partnership: "PARTNERSHIP",
  press: "PRESS",
} as const

const budgetLabels: Record<string, string> = {
  "under-5m": "Under $5M",
  "5m-25m": "$5M – $25M",
  "25m-100m": "$25M – $100M",
  "100m-500m": "$100M – $500M",
  "500m-plus": "$500M+",
}

/**
 * Project enquiry.
 *
 * Re-validated server-side with the same schema the browser used. Persistence
 * is optional: without a database the enquiry is still accepted so a genuine
 * prospect is never shown an error for our infrastructure gap. Route this to
 * email or a CRM when the client picks one.
 */
export async function submitInquiry(
  input: InquiryInput
): Promise<ActionResult<{ reference: string }>> {
  const parsed = inquirySchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error.issues),
    }
  }

  const data = parsed.data
  const reference = `MER-${data.intent.slice(0, 3).toUpperCase()}-${Date.now()
    .toString(36)
    .slice(-5)
    .toUpperCase()}`

  if (hasDatabase) {
    try {
      await prisma.inquiry.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          country: data.country || null,
          intent: intentToEnum[data.intent],
          projectType: data.projectType || null,
          budgetBand: data.budgetBand ? budgetLabels[data.budgetBand] : null,
          timeline: data.timeline || null,
          message: data.message,
        },
      })
    } catch (error) {
      console.error("[contact] Failed to persist enquiry", error)
      return {
        ok: false,
        message:
          "We could not record your enquiry. Please email projects@meridian-construction.com directly.",
      }
    }
  } else if (!isProduction) {
    console.warn(
      `[contact] No DATABASE_URL — ${data.intent} enquiry from ${data.email} was validated but not stored.`
    )
  }

  return {
    ok: true,
    data: { reference },
    message: "Enquiry received. A director will respond within two working days.",
  }
}

/** Newsletter subscription — same contract, same graceful degradation. */
export async function subscribeToNewsletter(
  input: NewsletterInput
): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
      fieldErrors: toFieldErrors(parsed.error.issues),
    }
  }

  if (hasDatabase) {
    try {
      await prisma.newsletterSubscriber.upsert({
        where: { email: parsed.data.email },
        update: {},
        create: { email: parsed.data.email },
      })
    } catch (error) {
      console.error("[contact] Failed to store subscriber", error)
      return { ok: false, message: "Subscription failed. Please try again." }
    }
  } else if (!isProduction) {
    console.warn(
      `[contact] No DATABASE_URL — subscriber ${parsed.data.email} was validated but not stored.`
    )
  }

  return { ok: true, message: "You're on the list." }
}

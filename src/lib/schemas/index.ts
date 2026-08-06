import { z } from "zod"

/**
 * Shared validation contracts.
 * The same schema instance is used by React Hook Form on the client and by the
 * Server Action on the server — one definition, no drift.
 */

export const inquiryIntents = [
  "general",
  "quote",
  "site-visit",
  "consultation",
  "partnership",
  "press",
] as const

export const budgetBands = [
  "under-5m",
  "5m-25m",
  "25m-100m",
  "100m-500m",
  "500m-plus",
] as const

const name = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(80, "That name is a little too long.")

const email = z
  .string()
  .trim()
  .min(1, "An email address is required.")
  .email("Please enter a valid email address.")

const phone = z
  .string()
  .trim()
  .regex(/^[+()\d\s-]{7,24}$/, "Please enter a valid phone number.")
  .optional()
  .or(z.literal(""))

export const inquirySchema = z.object({
  fullName: name,
  email,
  phone,
  company: z.string().trim().max(120).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  intent: z.enum(inquiryIntents).default("general"),
  projectType: z.string().trim().max(120).optional().or(z.literal("")),
  budgetBand: z.enum(budgetBands).optional(),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — 20 characters minimum.")
    .max(4000, "Please keep the brief under 4000 characters."),
  consent: z.literal(true, {
    message: "Please accept the privacy policy to continue.",
  }),
})

/**
 * `intent` carries a `.default()`, which makes the schema's input and output
 * types differ — the field is optional going in, guaranteed coming out.
 * React Hook Form needs both: `InquiryFormValues` for what the fields hold,
 * `InquiryInput` for what `handleSubmit` and the Server Action receive.
 */
export type InquiryFormValues = z.input<typeof inquirySchema>
export type InquiryInput = z.output<typeof inquirySchema>

export const jobApplicationSchema = z.object({
  jobSlug: z.string().min(1),
  fullName: name,
  email,
  phone,
  linkedinUrl: z
    .string()
    .trim()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),
  resumeUrl: z
    .string()
    .trim()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),
  coverLetter: z
    .string()
    .trim()
    .max(4000, "Please keep your letter under 4000 characters.")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    message: "Please accept the privacy policy to continue.",
  }),
})

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>

export const newsletterSchema = z.object({
  email,
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

export const costEstimatorSchema = z.object({
  buildType: z.string().min(1, "Select a build type."),
  areaSqm: z
    .number({ message: "Enter the built-up area." })
    .min(50, "Minimum 50 m².")
    .max(500_000, "Please contact us directly for projects this large."),
  qualityTier: z.enum(["standard", "premium", "signature"]).default("premium"),
  region: z.string().min(1, "Select a region."),
  floors: z.number().min(1).max(160).default(1),
})

/**
 * Two `.default()` fields, so — as with `inquirySchema` — the input and output
 * types diverge and React Hook Form needs both.
 */
export type CostEstimatorFormValues = z.input<typeof costEstimatorSchema>
export type CostEstimatorInput = z.output<typeof costEstimatorSchema>

/** A single turn in the AI assistant transcript. */
export const assistantMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(4000),
})

export const assistantRequestSchema = z.object({
  messages: z.array(assistantMessageSchema).min(1).max(24),
})

export type AssistantMessage = z.infer<typeof assistantMessageSchema>
export type AssistantRequest = z.infer<typeof assistantRequestSchema>

/** Uniform Server Action result envelope. */
export type ActionResult<T = undefined> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> }

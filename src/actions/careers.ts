"use server"

import { getJob } from "@/data/jobs"
import { hasDatabase, prisma } from "@/lib/prisma"
import {
  jobApplicationSchema,
  type ActionResult,
  type JobApplicationInput,
} from "@/lib/schemas"
import { isProduction } from "@/lib/env"

/** Zod issues → the `{ field: [messages] }` shape React Hook Form expects. */
function toFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string[]> = {}
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form")
    fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message]
  }
  return fieldErrors
}

/**
 * Job application submission.
 *
 * Validated a second time on the server with the same schema the browser used.
 * Client-side validation is a convenience for the applicant; it is not a
 * security boundary, and anything reaching this function may have skipped it
 * entirely.
 *
 * Persistence degrades gracefully: with no DATABASE_URL the application is
 * accepted and acknowledged rather than throwing a 500 at someone who has just
 * spent ten minutes writing a covering letter. Wire an email or ATS handoff
 * here when the client's system is chosen.
 */
export async function submitApplication(
  input: JobApplicationInput
): Promise<ActionResult<{ reference: string }>> {
  const parsed = jobApplicationSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error.issues),
    }
  }

  const job = getJob(parsed.data.jobSlug)
  if (!job) {
    return { ok: false, message: "That role is no longer open." }
  }

  const reference = `MER-${job.slug.slice(0, 6).toUpperCase()}-${Date.now()
    .toString(36)
    .slice(-5)
    .toUpperCase()}`

  if (hasDatabase) {
    try {
      const posting = await prisma.jobPosting.findUnique({
        where: { slug: job.slug },
        select: { id: true },
      })

      if (posting) {
        await prisma.jobApplication.create({
          data: {
            jobId: posting.id,
            fullName: parsed.data.fullName,
            email: parsed.data.email,
            phone: parsed.data.phone || null,
            linkedinUrl: parsed.data.linkedinUrl || null,
            resumeUrl: parsed.data.resumeUrl || null,
            coverLetter: parsed.data.coverLetter || null,
          },
        })
      }
    } catch (error) {
      console.error("[careers] Failed to persist application", error)
      return {
        ok: false,
        message:
          "We could not record your application. Please email careers@meridian-construction.com directly.",
      }
    }
  } else if (!isProduction) {
    console.warn(
      `[careers] No DATABASE_URL — application from ${parsed.data.email} for ${job.title} was validated but not stored.`
    )
  }

  return {
    ok: true,
    data: { reference },
    message: `Application received for ${job.title}.`,
  }
}

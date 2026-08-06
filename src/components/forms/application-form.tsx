"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { submitApplication } from "@/actions/careers"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useHydrated } from "@/hooks/use-hydrated"
import { jobApplicationSchema, type JobApplicationInput } from "@/lib/schemas"
import { cn } from "@/lib/utils"

/**
 * Application form.
 *
 * The same Zod schema validates here and inside the Server Action, so the two
 * can never drift. Field-level errors returned by the server are mapped back
 * onto the form rather than dumped into a toast — if the server rejects a
 * field, the applicant should see it next to that field.
 */
export function ApplicationForm({
  jobSlug,
  jobTitle,
  className,
}: {
  jobSlug: string
  jobTitle: string
  className?: string
}) {
  const hydrated = useHydrated()
  const [reference, setReference] = React.useState<string | null>(null)

  const form = useForm<JobApplicationInput>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      jobSlug,
      fullName: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      resumeUrl: "",
      coverLetter: "",
      consent: false as unknown as true,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const result = await submitApplication(values)

    if (!result.ok) {
      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          form.setError(field as keyof JobApplicationInput, {
            message: messages[0],
          })
        }
      }
      toast.error(result.message)
      return
    }

    setReference(result.data?.reference ?? null)
    toast.success(result.message ?? "Application received.", {
      description: result.data?.reference
        ? `Reference ${result.data.reference}`
        : undefined,
    })
    form.reset({ jobSlug, fullName: "", email: "", phone: "", linkedinUrl: "", resumeUrl: "", coverLetter: "", consent: false as unknown as true })
  })

  if (reference) {
    return (
      <div
        className={cn(
          "border-border rounded-xs border p-9 lg:p-12",
          className
        )}
      >
        <span className="bg-signal-success/10 text-signal-success inline-flex size-12 items-center justify-center rounded-full">
          <Check aria-hidden className="size-6" />
        </span>
        <h3 className="font-display text-foreground mt-7 text-2xl font-bold">
          Application received.
        </h3>
        <p className="text-muted-foreground mt-4 max-w-md text-base">
          Thank you for applying for {jobTitle}. A member of the hiring team —
          not a recruiter — will read it and come back to you within five
          working days.
        </p>
        <p className="text-muted-foreground mt-6 font-mono text-xs tracking-[0.14em] uppercase">
          Reference{" "}
          <span className="text-accent-text tabular">{reference}</span>
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-8"
          onClick={() => setReference(null)}
        >
          Submit another application
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={cn("space-y-6", className)} noValidate>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="name"
                    placeholder="Alex Moreau"
                    className="h-12 rounded-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-12 rounded-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 212 555 0180"
                    className="h-12 rounded-xs"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Optional.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://linkedin.com/in/…"
                    className="h-12 rounded-xs"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Optional.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="resumeUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link to your CV</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://…"
                  className="h-12 rounded-xs"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A shared link is fine — Drive, Dropbox or a personal site. File
                upload arrives with the applicant portal.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why this role</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="A few sentences is plenty. We would rather read something specific than something polished."
                  className="rounded-xs"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </FormControl>
                <FormLabel className="text-muted-foreground text-sm leading-relaxed font-normal">
                  I agree that Meridian may store and process this application
                  in line with the privacy policy.
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Disabled until hydrated — a pre-hydration submit would fall through
            to a native GET and serialise the whole application into the URL. */}
        <Button
          type="submit"
          size="xl"
          variant="gold"
          disabled={!hydrated || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 aria-hidden className="animate-spin" />
              Submitting
            </>
          ) : (
            <>
              Submit application
              <ArrowRight aria-hidden />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

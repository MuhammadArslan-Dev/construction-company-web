"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { submitInquiry } from "@/actions/contact"
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
import {
  budgetBands,
  inquirySchema,
  inquiryIntents,
  type InquiryFormValues,
  type InquiryInput,
} from "@/lib/schemas"
import { cn } from "@/lib/utils"

const intentLabels: Record<(typeof inquiryIntents)[number], string> = {
  general: "General enquiry",
  quote: "Request a quote",
  "site-visit": "Book a site visit",
  consultation: "Book a consultation",
  partnership: "Partnership",
  press: "Press",
}

const budgetLabels: Record<(typeof budgetBands)[number], string> = {
  "under-5m": "Under $5M",
  "5m-25m": "$5M – $25M",
  "25m-100m": "$25M – $100M",
  "100m-500m": "$100M – $500M",
  "500m-plus": "$500M+",
}

const projectTypes = [
  "Luxury villa",
  "Residential community",
  "Commercial tower",
  "Shopping or retail",
  "Hotel or resort",
  "Hospital or healthcare",
  "School or university",
  "Industrial or energy",
  "Infrastructure",
  "Other",
]

const emptyValues = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  projectType: "",
  timeline: "",
  message: "",
}

/**
 * Project enquiry form.
 *
 * The intent is seeded from `?intent=` so every CTA on the site — "Request a
 * Quote", "Book a Site Visit", "Book a Consultation" — lands here with the
 * right option already selected and the heading already matching. It stays
 * changeable, because a deep link is a guess about what someone wants, not a
 * decision made for them.
 */
export function InquiryForm({ className }: { className?: string }) {
  const hydrated = useHydrated()
  const [reference, setReference] = React.useState<string | null>(null)

  /* Read the intent from `window.location` rather than `useSearchParams`.
     The hook would force this subtree behind a Suspense boundary on a static
     page, so the real <form> only appears after hydration — and a submit in
     that gap falls through to a native GET that dumps every field into the
     URL. Reading the location directly keeps the form in the prerendered HTML
     and removes the gap entirely. */
  const [initialIntent, setInitialIntent] = React.useState<
    (typeof inquiryIntents)[number]
  >("general")

  React.useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("intent")
    if (inquiryIntents.includes(param as (typeof inquiryIntents)[number])) {
      setInitialIntent(param as (typeof inquiryIntents)[number])
    }
  }, [])

  /* Three generics, not one: <what the fields hold, context, what submit gets>.
     With a single generic, the resolver's output type collides with the form's
     value type wherever the schema applies a default. */
  const form = useForm<InquiryFormValues, unknown, InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      ...emptyValues,
      intent: initialIntent,
      consent: false as unknown as true,
    },
  })

  const { setValue } = form
  React.useEffect(() => {
    setValue("intent", initialIntent)
  }, [initialIntent, setValue])

  /* The cost estimator hands off with `?projectType=` so nobody has to retype
     what they just selected. Only accepted when it matches an option we
     actually offer — a query parameter is not a form field. */
  React.useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("projectType")
    if (type && projectTypes.includes(type)) setValue("projectType", type)
  }, [setValue])

  const onSubmit = form.handleSubmit(async (values) => {
    const result = await submitInquiry(values)

    if (!result.ok) {
      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          form.setError(field as keyof InquiryFormValues, {
            message: messages[0],
          })
        }
      }
      toast.error(result.message)
      return
    }

    setReference(result.data?.reference ?? null)
    toast.success(result.message ?? "Enquiry received.", {
      description: result.data?.reference
        ? `Reference ${result.data.reference}`
        : undefined,
    })
    form.reset({
      ...emptyValues,
      intent: initialIntent,
      consent: false as unknown as true,
    })
  })

  if (reference) {
    return (
      <div className={cn("border-border rounded-xs border p-9 lg:p-12", className)}>
        <span className="bg-signal-success/10 text-signal-success inline-flex size-12 items-center justify-center rounded-full">
          <Check aria-hidden className="size-6" />
        </span>
        <h3 className="font-display text-foreground mt-7 text-2xl font-bold">
          Enquiry received.
        </h3>
        <p className="text-muted-foreground mt-4 max-w-md text-base">
          A director will respond within two working days with an honest view of
          feasibility, programme and cost — before any commitment.
        </p>
        <p className="text-muted-foreground mt-6 font-mono text-xs tracking-[0.14em] uppercase">
          Reference <span className="text-accent-text tabular">{reference}</span>
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-8"
          onClick={() => setReference(null)}
        >
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={cn("space-y-6", className)} noValidate>
        <FormField
          control={form.control}
          name="intent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What can we help with?</FormLabel>
              <div
                role="radiogroup"
                aria-label="Enquiry type"
                className="flex flex-wrap gap-2"
              >
                {inquiryIntents.map((intent) => {
                  const selected = field.value === intent
                  return (
                    <button
                      key={intent}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => field.onChange(intent)}
                      className={cn(
                        "focus-visible:ring-ring rounded-xs border px-4 py-2.5 text-sm transition-colors duration-300 focus-visible:ring-2",
                        selected
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {intentLabels[intent]}
                    </button>
                  )
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    placeholder="you@company.com"
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
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="organization"
                    placeholder="Aldara Development"
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border-input text-foreground focus-visible:ring-ring h-12 w-full rounded-xs border bg-transparent px-3 text-sm focus-visible:ring-2"
                  >
                    <option value="">Select…</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budgetBand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indicative budget</FormLabel>
                <FormControl>
                  <select
                    value={field.value ?? ""}
                    onChange={(event) =>
                      field.onChange(event.target.value || undefined)
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    className="border-input text-foreground focus-visible:ring-ring h-12 w-full rounded-xs border bg-transparent px-3 text-sm focus-visible:ring-2"
                  >
                    <option value="">Prefer not to say</option>
                    {budgetBands.map((band) => (
                      <option key={band} value={band}>
                        {budgetLabels[band]}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormDescription>
                  A range is enough. It only shapes who picks this up.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell us about the project</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="A brief, a sketch or a single paragraph. What are you building, where, and by when?"
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
                  I agree that Meridian may store and process this enquiry in
                  line with the privacy policy.
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Disabled until hydrated — see `useHydrated`. */}
        <Button
          type="submit"
          size="xl"
          variant="gold"
          disabled={!hydrated || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 aria-hidden className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight aria-hidden />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

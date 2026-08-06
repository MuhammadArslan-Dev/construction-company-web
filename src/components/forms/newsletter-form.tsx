"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowRight, Check } from "lucide-react"
import { toast } from "sonner"

import { subscribeToNewsletter } from "@/actions/contact"
import { useHydrated } from "@/hooks/use-hydrated"
import { Input } from "@/components/ui/input"
import { newsletterSchema, type NewsletterInput } from "@/lib/schemas"
import { cn } from "@/lib/utils"

/**
 * Newsletter capture. Validated by the shared Zod contract on the client and
 * again inside the Server Action, which upserts so a repeat subscribe is not
 * an error the reader has to see.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const hydrated = useHydrated()
  const [done, setDone] = React.useState(false)

  const form = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const result = await subscribeToNewsletter(values)

    if (!result.ok) {
      form.setError("email", { message: result.message })
      toast.error(result.message)
      return
    }

    setDone(true)
    toast.success(result.message ?? "You're on the list.", {
      description: `We'll write to ${values.email} four times a year.`,
    })
    form.reset()
    setTimeout(() => setDone(false), 4000)
  })

  const error = form.formState.errors.email

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="relative">
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="border-border bg-transparent h-12 rounded-xs pr-14 text-sm"
          {...form.register("email")}
        />
        <button
          type="submit"
          disabled={!hydrated || form.formState.isSubmitting}
          aria-label="Subscribe"
          className="bg-gold-500 text-ink-900 focus-visible:ring-ring absolute top-1.5 right-1.5 inline-flex size-9 items-center justify-center rounded-xs transition-all duration-300 ease-[var(--ease-luxe)] hover:bg-gold-400 focus-visible:ring-2 disabled:opacity-50"
        >
          {done ? (
            <Check aria-hidden className="size-4" />
          ) : (
            <ArrowRight aria-hidden className="size-4" />
          )}
        </button>
      </div>
      {error ? (
        <p id="newsletter-error" className="text-destructive mt-2 text-xs">
          {error.message}
        </p>
      ) : null}
    </form>
  )
}

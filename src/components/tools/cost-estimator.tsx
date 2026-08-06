"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Info, MessageSquareText, RotateCcw } from "lucide-react"
import { useForm, useWatch } from "react-hook-form"

import { Button } from "@/components/ui/button"
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
import { Slider } from "@/components/ui/slider"
import { useHydrated } from "@/hooks/use-hydrated"
import {
  buildTypes,
  estimateCost,
  formatUsd,
  qualityTiers,
  regions,
  type Estimate,
} from "@/lib/estimator"
import { DURATION, EASE_LUXE } from "@/lib/motion"
import {
  costEstimatorSchema,
  type CostEstimatorFormValues,
  type CostEstimatorInput,
} from "@/lib/schemas"
import { cn } from "@/lib/utils"

const DEFAULT_TYPE = buildTypes.find((type) => type.id === "commercial-tower")!

/**
 * Interactive cost estimator.
 *
 * The model runs in the browser on every change, so dragging a slider moves
 * the number immediately — a round trip per keystroke would make the whole
 * thing feel broken, and the maths has no secrets worth protecting. The same
 * `estimateCost` function backs the AI assistant server-side, so the two
 * surfaces can never quote different figures.
 *
 * Validation still goes through the shared Zod schema, which is what stops a
 * pasted "0" or a 900,000 m² fantasy from producing a confident wrong answer.
 */
export function CostEstimator({ className }: { className?: string }) {
  const hydrated = useHydrated()

  /* Three generics — `qualityTier` and `floors` both carry `.default()`, so
     the schema's input and output types differ. */
  const form = useForm<CostEstimatorFormValues, unknown, CostEstimatorInput>({
    resolver: zodResolver(costEstimatorSchema),
    mode: "onChange",
    defaultValues: {
      buildType: DEFAULT_TYPE.id,
      areaSqm: DEFAULT_TYPE.typicalAreaSqm,
      floors: DEFAULT_TYPE.floors.typical,
      qualityTier: "premium",
      region: "middle-east",
    },
  })

  const { control, setValue } = form
  const values = useWatch({ control })

  const buildType =
    buildTypes.find((type) => type.id === values.buildType) ?? DEFAULT_TYPE

  /* Changing the build type re-seeds area and floors. A warehouse defaulting
     to a 28-storey tower's inputs would produce a nonsense first number, and
     the user would have to undo our guess before making their own. */
  const previousTypeRef = React.useRef(buildType.id)
  React.useEffect(() => {
    if (previousTypeRef.current === buildType.id) return
    previousTypeRef.current = buildType.id
    setValue("areaSqm", buildType.typicalAreaSqm, { shouldValidate: true })
    setValue("floors", buildType.floors.typical, { shouldValidate: true })
  }, [buildType, setValue])

  const estimate: Estimate | null = React.useMemo(() => {
    const parsed = costEstimatorSchema.safeParse(values)
    return parsed.success ? estimateCost(parsed.data) : null
  }, [values])

  const reset = () =>
    form.reset({
      buildType: DEFAULT_TYPE.id,
      areaSqm: DEFAULT_TYPE.typicalAreaSqm,
      floors: DEFAULT_TYPE.floors.typical,
      qualityTier: "premium",
      region: "middle-east",
    })

  /* Hands the estimate to the enquiry form rather than making the visitor
     retype it. The contact page seeds `intent` from the same query string. */
  const handoffHref = estimate
    ? `/contact?intent=quote&projectType=${encodeURIComponent(
        estimate.buildType.inquiryProjectType
      )}`
    : "/contact?intent=quote"

  return (
    <div className={cn("grid gap-12 lg:grid-cols-12 lg:gap-16", className)}>
      {/* Inputs -------------------------------------------------------- */}
      <Form {...form}>
        <form
          className="space-y-9 lg:col-span-7"
          onSubmit={(event) => event.preventDefault()}
          noValidate
        >
          <FormField
            control={form.control}
            name="buildType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are you building?</FormLabel>
                <div
                  role="radiogroup"
                  aria-label="Build type"
                  className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3"
                >
                  {buildTypes.map((type) => {
                    const selected = field.value === type.id
                    return (
                      <button
                        key={type.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => field.onChange(type.id)}
                        className={cn(
                          "focus-visible:ring-ring rounded-xs border px-3.5 py-3 text-left text-sm transition-colors duration-300 focus-visible:ring-2",
                          selected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/35"
                        )}
                      >
                        {type.label}
                      </button>
                    )
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="areaSqm"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between gap-4">
                  <FormLabel>Gross built-up area</FormLabel>
                  <span className="text-accent-text font-mono text-sm tabular">
                    {Number(field.value ?? 0).toLocaleString("en-US")} m²
                  </span>
                </div>
                <FormControl>
                  <Slider
                    className="mt-4"
                    thumbLabels="Gross built-up area in square metres"
                    min={50}
                    max={Math.max(buildType.typicalAreaSqm * 4, 5_000)}
                    step={50}
                    value={[Number(field.value ?? 0)]}
                    onValueChange={([next]) => field.onChange(next)}
                  />
                </FormControl>
                <div className="mt-4 flex items-center gap-3">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={50}
                    max={500_000}
                    step={50}
                    aria-label="Gross built-up area, exact value in square metres"
                    value={String(field.value ?? "")}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? undefined
                          : Number(event.target.value)
                      )
                    }
                    onBlur={field.onBlur}
                    className="h-11 w-40 rounded-xs tabular"
                  />
                  <FormDescription className="m-0">
                    Square metres, all floors combined.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floors"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between gap-4">
                  <FormLabel>Floors above ground</FormLabel>
                  <span className="text-accent-text font-mono text-sm tabular">
                    {Number(field.value ?? 1)}
                  </span>
                </div>
                <FormControl>
                  <Slider
                    className="mt-4"
                    thumbLabels="Number of floors above ground"
                    min={buildType.floors.min}
                    max={buildType.floors.max}
                    step={1}
                    value={[Number(field.value ?? 1)]}
                    onValueChange={([next]) => field.onChange(next)}
                  />
                </FormControl>
                <FormDescription>
                  {buildType.floors.min}–{buildType.floors.max} for a{" "}
                  {buildType.label.toLowerCase()}. Above four storeys, the core
                  and facade access start to move the rate.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-9 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="qualityTier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specification</FormLabel>
                  <div
                    role="radiogroup"
                    aria-label="Specification level"
                    className="mt-3 flex flex-col gap-2"
                  >
                    {qualityTiers.map((tier) => {
                      const selected = field.value === tier.id
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => field.onChange(tier.id)}
                          className={cn(
                            "focus-visible:ring-ring rounded-xs border px-4 py-3 text-left transition-colors duration-300 focus-visible:ring-2",
                            selected
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground/35"
                          )}
                        >
                          <span className="block text-sm font-medium">
                            {tier.label}
                          </span>
                          <span
                            className={cn(
                              "mt-1 block text-xs leading-relaxed",
                              selected
                                ? "text-background/70"
                                : "text-muted-foreground"
                            )}
                          >
                            {tier.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="border-input text-foreground focus-visible:ring-ring mt-3 h-12 w-full rounded-xs border bg-transparent px-3 text-sm focus-visible:ring-2"
                    >
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormDescription>
                    Location factor covers labour, materials and logistics —
                    not land, fees or finance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <button
            type="button"
            onClick={reset}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-2 rounded-sm text-xs transition-colors focus-visible:ring-2"
          >
            <RotateCcw aria-hidden className="size-3.5" />
            Reset to defaults
          </button>
        </form>
      </Form>

      {/* Output --------------------------------------------------------- */}
      <div className="lg:col-span-5">
        <div className="border-border sticky top-28 rounded-xs border">
          <AnimatePresence mode="wait" initial={false}>
            {estimate ? (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATION.fast, ease: EASE_LUXE }}
              >
                <div className="bg-ink-950 dark rounded-t-xs px-7 py-8">
                  <p className="text-eyebrow text-white/60 uppercase">
                    Indicative construction cost
                  </p>
                  <p
                    aria-live="polite"
                    className="font-display mt-4 text-[clamp(1.9rem,1.3rem+1.8vw,2.75rem)] leading-none font-bold text-white tabular"
                  >
                    {formatUsd(estimate.lowUsd)}
                    <span className="text-gold-500 px-2">–</span>
                    {formatUsd(estimate.highUsd)}
                  </p>
                  <dl className="mt-7 grid grid-cols-2 gap-5 border-t border-white/12 pt-6">
                    <div>
                      <dt className="text-eyebrow text-white/55 uppercase">
                        Blended rate
                      </dt>
                      <dd className="mt-2 text-lg font-medium text-white tabular">
                        ${estimate.ratePerSqm.toLocaleString("en-US")}
                        <span className="text-sm text-white/60">/m²</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-eyebrow text-white/55 uppercase">
                        Programme
                      </dt>
                      <dd className="mt-2 text-lg font-medium text-white tabular">
                        {estimate.programmeMonths}
                        <span className="text-sm text-white/60"> months</span>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="px-7 py-7">
                  <p className="text-eyebrow text-muted-foreground uppercase">
                    Where it goes
                  </p>
                  <ul className="mt-5 space-y-3.5">
                    {estimate.lines.map((line) => (
                      <li key={line.label}>
                        <div className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="text-foreground/85">{line.label}</span>
                          <span className="text-muted-foreground tabular">
                            {formatUsd(line.amountUsd)}
                          </span>
                        </div>
                        <div
                          aria-hidden
                          className="bg-muted mt-2 h-px w-full overflow-hidden"
                        >
                          <motion.div
                            className="bg-gold-500 h-px origin-left"
                            initial={false}
                            animate={{ scaleX: line.share / 0.4 }}
                            transition={{
                              duration: DURATION.base,
                              ease: EASE_LUXE,
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>

                  <details className="border-border mt-7 border-t pt-5">
                    <summary className="text-muted-foreground hover:text-foreground marker:content-none flex cursor-pointer list-none items-center gap-2 text-xs transition-colors">
                      <Info aria-hidden className="size-3.5" />
                      How this was calculated
                    </summary>
                    <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                      {estimate.factors.map((factor) => (
                        <div
                          key={factor.label}
                          className="flex items-baseline justify-between gap-3 text-xs"
                        >
                          <dt className="text-muted-foreground">{factor.label}</dt>
                          <dd className="text-foreground/80 font-mono tabular">
                            {factor.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
                      {estimate.buildType.note} Excludes land, professional
                      fees, finance, tenant fit-out and statutory charges. The
                      band is ±18%, which is the honest width of any number
                      produced before a design exists.
                    </p>
                  </details>

                  <div className="mt-8 flex flex-col gap-3">
                    <Button asChild size="lg" variant="gold">
                      <Link href={handoffHref}>
                        Get a real quote
                        <ArrowRight aria-hidden />
                      </Link>
                    </Button>
                    {/* Kept short deliberately. `Button` is `whitespace-nowrap`
                        and `shrink-0`, so a longer label sets the panel's
                        minimum width and pushes the whole page sideways at
                        360px. */}
                    <Button asChild size="lg" variant="outline">
                      <Link href="/tools/assistant">
                        <MessageSquareText aria-hidden />
                        Ask the assistant
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATION.fast, ease: EASE_LUXE }}
                className="px-7 py-12"
              >
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {hydrated
                    ? "Complete the fields to the left and the estimate appears here."
                    : "Loading the estimator…"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

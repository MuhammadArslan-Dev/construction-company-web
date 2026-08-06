import type { CostEstimatorInput } from "@/lib/schemas"

/**
 * Deterministic construction cost model.
 *
 * Pure functions, no side effects and no network — so the same code runs in
 * the browser for live feedback as the user drags a slider, and on the server
 * when the AI assistant is asked "roughly what would a 40-storey tower cost".
 * One model, one set of numbers, no drift between the two surfaces.
 *
 * The rates below are illustrative order-of-magnitude figures expressed in
 * USD per square metre of gross built-up area. They are deliberately banded
 * ±18% in the output, because anyone who quotes a single number for a project
 * that has not been designed is either guessing or selling something.
 */

export type BuildType = {
  id: string
  label: string
  /** Base construction cost, USD per m² of gross built area. */
  baseRate: number
  /** Typical range of floors, used to seed and bound the floors control. */
  floors: { min: number; max: number; typical: number }
  /** Typical gross area, used to seed the area control. */
  typicalAreaSqm: number
  /** Months of programme per 10,000 m², before the height adjustment. */
  monthsPer10kSqm: number
  /** Matching option in the enquiry form, so the handoff arrives pre-filled. */
  inquiryProjectType: string
  note: string
}

export const buildTypes: BuildType[] = [
  {
    id: "luxury-villa",
    label: "Luxury villa",
    baseRate: 4200,
    floors: { min: 1, max: 4, typical: 2 },
    typicalAreaSqm: 1200,
    monthsPer10kSqm: 62,
    inquiryProjectType: "Luxury villa",
    note: "Bespoke joinery, stone and smart-home integration dominate the rate.",
  },
  {
    id: "residential-community",
    label: "Residential community",
    baseRate: 1450,
    floors: { min: 2, max: 12, typical: 6 },
    typicalAreaSqm: 45_000,
    monthsPer10kSqm: 7.5,
    inquiryProjectType: "Residential community",
    note: "Assumes repeated typologies and infrastructure delivered in phases.",
  },
  {
    id: "commercial-tower",
    label: "Commercial tower",
    baseRate: 2350,
    floors: { min: 6, max: 120, typical: 28 },
    typicalAreaSqm: 68_000,
    monthsPer10kSqm: 4.2,
    inquiryProjectType: "Commercial tower",
    note: "Core, facade and vertical transport drive cost above 40 storeys.",
  },
  {
    id: "retail-mall",
    label: "Shopping centre",
    baseRate: 1850,
    floors: { min: 1, max: 6, typical: 3 },
    typicalAreaSqm: 55_000,
    monthsPer10kSqm: 4.8,
    inquiryProjectType: "Shopping or retail",
    note: "Shell-and-core only; tenant fit-out is contracted separately.",
  },
  {
    id: "hotel",
    label: "Hotel or resort",
    baseRate: 2900,
    floors: { min: 2, max: 60, typical: 12 },
    typicalAreaSqm: 32_000,
    monthsPer10kSqm: 6.4,
    inquiryProjectType: "Hotel or resort",
    note: "FF&E and back-of-house plant carry a heavier rate than offices.",
  },
  {
    id: "hospital",
    label: "Hospital",
    baseRate: 3800,
    floors: { min: 2, max: 20, typical: 7 },
    typicalAreaSqm: 40_000,
    monthsPer10kSqm: 8.1,
    inquiryProjectType: "Hospital or healthcare",
    note: "Medical gas, isolation and redundancy push MEP past 40% of cost.",
  },
  {
    id: "education",
    label: "School or university",
    baseRate: 2100,
    floors: { min: 1, max: 12, typical: 4 },
    typicalAreaSqm: 22_000,
    monthsPer10kSqm: 7.2,
    inquiryProjectType: "School or university",
    note: "Assumes term-time-sensitive phasing and public procurement.",
  },
  {
    id: "warehouse",
    label: "Warehouse or logistics",
    baseRate: 720,
    floors: { min: 1, max: 3, typical: 1 },
    typicalAreaSqm: 30_000,
    monthsPer10kSqm: 3.1,
    inquiryProjectType: "Industrial or energy",
    note: "Portal frame and slab dominate; office content held at 5%.",
  },
  {
    id: "industrial",
    label: "Industrial plant",
    baseRate: 2650,
    floors: { min: 1, max: 8, typical: 2 },
    typicalAreaSqm: 25_000,
    monthsPer10kSqm: 9.4,
    inquiryProjectType: "Industrial or energy",
    note: "Process equipment is excluded — this is the built envelope only.",
  },
  {
    id: "infrastructure",
    label: "Infrastructure works",
    baseRate: 1250,
    floors: { min: 1, max: 4, typical: 1 },
    typicalAreaSqm: 60_000,
    monthsPer10kSqm: 5.6,
    inquiryProjectType: "Infrastructure",
    note: "Area is deck or structure footprint; earthworks vary most.",
  },
]

export type QualityTier = CostEstimatorInput["qualityTier"]

export const qualityTiers: {
  id: QualityTier
  label: string
  multiplier: number
  description: string
}[] = [
  {
    id: "standard",
    label: "Standard",
    multiplier: 0.82,
    description: "Robust, code-compliant specification with commodity finishes.",
  },
  {
    id: "premium",
    label: "Premium",
    multiplier: 1,
    description: "Our default: specified to outlast a 25-year holding period.",
  },
  {
    id: "signature",
    label: "Signature",
    multiplier: 1.46,
    description: "Bespoke fabrication, imported stone and one-off engineering.",
  },
]

export type Region = {
  id: string
  label: string
  /** Location factor applied to the base rate. */
  multiplier: number
}

export const regions: Region[] = [
  { id: "north-america", label: "North America", multiplier: 1.18 },
  { id: "western-europe", label: "Western Europe", multiplier: 1.12 },
  { id: "middle-east", label: "Middle East", multiplier: 0.94 },
  { id: "east-asia", label: "East Asia", multiplier: 1.02 },
  { id: "south-asia", label: "South Asia", multiplier: 0.61 },
  { id: "southeast-asia", label: "Southeast Asia", multiplier: 0.68 },
  { id: "africa", label: "Africa", multiplier: 0.74 },
  { id: "oceania", label: "Oceania", multiplier: 1.09 },
]

/**
 * Cost distribution by element, per build type. Values sum to 1.
 * `default` covers anything not explicitly listed.
 */
const costSplits: Record<string, Record<string, number>> = {
  default: {
    "Substructure": 0.09,
    "Superstructure": 0.24,
    "Facade & envelope": 0.16,
    "MEP services": 0.24,
    "Fit-out & finishes": 0.14,
    "External works": 0.05,
    "Preliminaries": 0.08,
  },
  hospital: {
    "Substructure": 0.07,
    "Superstructure": 0.19,
    "Facade & envelope": 0.11,
    "MEP services": 0.38,
    "Fit-out & finishes": 0.14,
    "External works": 0.04,
    "Preliminaries": 0.07,
  },
  "luxury-villa": {
    "Substructure": 0.11,
    "Superstructure": 0.19,
    "Facade & envelope": 0.14,
    "MEP services": 0.16,
    "Fit-out & finishes": 0.27,
    "External works": 0.07,
    "Preliminaries": 0.06,
  },
  warehouse: {
    "Substructure": 0.22,
    "Superstructure": 0.31,
    "Facade & envelope": 0.15,
    "MEP services": 0.13,
    "Fit-out & finishes": 0.06,
    "External works": 0.08,
    "Preliminaries": 0.05,
  },
  infrastructure: {
    "Substructure": 0.34,
    "Superstructure": 0.3,
    "Facade & envelope": 0.03,
    "MEP services": 0.11,
    "Fit-out & finishes": 0.03,
    "External works": 0.12,
    "Preliminaries": 0.07,
  },
}

export type CostLine = {
  label: string
  amountUsd: number
  share: number
}

export type Estimate = {
  buildType: BuildType
  region: Region
  qualityLabel: string
  areaSqm: number
  floors: number
  /** Blended all-in rate actually applied, USD per m². */
  ratePerSqm: number
  /** Point estimate, USD. */
  totalUsd: number
  /** Honest band around the point estimate. */
  lowUsd: number
  highUsd: number
  /** Element breakdown, largest first. */
  lines: CostLine[]
  /** Indicative construction programme in months. */
  programmeMonths: number
  /** Multipliers applied, for the "how this was calculated" disclosure. */
  factors: { label: string; value: string }[]
}

/**
 * Height premium. Cost per m² is flat for low-rise, then climbs as the core,
 * facade access and vertical transport start to dominate. Modelled as a gentle
 * power curve rather than a step so dragging the floors slider never produces
 * a visible jump in the total.
 */
function heightFactor(floors: number) {
  if (floors <= 4) return 1
  return 1 + 0.145 * Math.pow((floors - 4) / 10, 0.86)
}

/**
 * Scale economy. Larger schemes amortise setup, plant and preliminaries, but
 * the benefit tails off — a 400,000 m² scheme is not twice as efficient as a
 * 200,000 m² one. Normalised so a 20,000 m² project sits at 1.0.
 */
function scaleFactor(areaSqm: number) {
  const raw = Math.pow(20_000 / Math.max(areaSqm, 50), 0.055)
  return Math.min(1.22, Math.max(0.9, raw))
}

const CONTINGENCY = 0.07

function round(value: number, to: number) {
  return Math.round(value / to) * to
}

/** Rounds to a sensible precision for the magnitude — never a false $1,234,567. */
function roundMoney(value: number) {
  if (value >= 100_000_000) return round(value, 1_000_000)
  if (value >= 10_000_000) return round(value, 100_000)
  if (value >= 1_000_000) return round(value, 50_000)
  if (value >= 100_000) return round(value, 5_000)
  return round(value, 1_000)
}

export function findBuildType(id: string) {
  return buildTypes.find((type) => type.id === id)
}

export function findRegion(id: string) {
  return regions.find((region) => region.id === id)
}

/**
 * The model. Given validated input, returns a full estimate including the
 * element breakdown and the multipliers that produced it — the disclosure is
 * part of the output rather than a footnote, because an estimate you cannot
 * interrogate is worth nothing to a board.
 */
export function estimateCost(input: CostEstimatorInput): Estimate | null {
  const buildType = findBuildType(input.buildType)
  const region = findRegion(input.region)
  const tier = qualityTiers.find((entry) => entry.id === input.qualityTier)

  if (!buildType || !region || !tier) return null

  const floors = Math.min(
    Math.max(input.floors, buildType.floors.min),
    buildType.floors.max
  )
  const areaSqm = input.areaSqm

  const height = heightFactor(floors)
  const scale = scaleFactor(areaSqm)

  const ratePerSqm =
    buildType.baseRate * tier.multiplier * region.multiplier * height * scale

  const construction = ratePerSqm * areaSqm
  const totalUsd = roundMoney(construction * (1 + CONTINGENCY))

  const split = costSplits[buildType.id] ?? costSplits.default
  const lines: CostLine[] = Object.entries(split)
    .map(([label, share]) => ({
      label,
      share,
      amountUsd: roundMoney(construction * share),
    }))
    .sort((a, b) => b.share - a.share)

  lines.push({
    label: "Contingency",
    share: CONTINGENCY,
    amountUsd: roundMoney(construction * CONTINGENCY),
  })

  /* Programme scales with area but compresses on tall buildings, where a
     repeating floor cycle beats horizontal sequencing. */
  const programmeMonths = Math.max(
    4,
    Math.round(
      (areaSqm / 10_000) * buildType.monthsPer10kSqm * (floors > 12 ? 0.72 : 1) +
        (floors > 4 ? floors * 0.28 : 0)
    )
  )

  return {
    buildType,
    region,
    qualityLabel: tier.label,
    areaSqm,
    floors,
    ratePerSqm: Math.round(ratePerSqm),
    totalUsd,
    lowUsd: roundMoney(totalUsd * 0.82),
    highUsd: roundMoney(totalUsd * 1.18),
    lines,
    programmeMonths,
    factors: [
      {
        label: "Base rate",
        value: `$${buildType.baseRate.toLocaleString("en-US")}/m²`,
      },
      { label: "Quality", value: `×${tier.multiplier.toFixed(2)}` },
      { label: "Region", value: `×${region.multiplier.toFixed(2)}` },
      { label: "Height", value: `×${height.toFixed(2)}` },
      { label: "Scale", value: `×${scale.toFixed(2)}` },
      { label: "Contingency", value: `+${Math.round(CONTINGENCY * 100)}%` },
    ],
  }
}

/** Compact money formatting used across the estimator UI. */
export function formatUsd(value: number) {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`
  }
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`
  return `$${Math.round(value)}`
}

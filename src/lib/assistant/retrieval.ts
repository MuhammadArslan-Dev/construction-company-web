import "server-only"

import { contactConfig, siteConfig } from "@/config/site"
import {
  engineeringPrinciples,
  sustainability,
  sustainabilityStats,
} from "@/data/company"
import { jobs } from "@/data/jobs"
import { offices } from "@/data/offices"
import { processSteps } from "@/data/process"
import { projects } from "@/data/projects"
import { services } from "@/data/services"
import { heroStats } from "@/data/stats"
import { buildTypes, estimateCost, formatUsd, regions } from "@/lib/estimator"

/**
 * Deterministic fallback.
 *
 * When no ANTHROPIC_API_KEY is configured the assistant still has to be useful
 * — a chat panel that answers "the assistant is unavailable" is worse than no
 * chat panel at all. This is a small retrieval engine over the site's own
 * content: it scores every service, project, office, role and process step
 * against the question and writes a short answer from the best matches.
 *
 * It is not a language model and does not pretend to be. It answers "what",
 * "where" and "how much"; the UI is explicit that a person handles the rest.
 */

type Doc = {
  id: string
  kind: "service" | "project" | "office" | "job" | "process" | "fact"
  title: string
  href?: string
  /** Everything searchable, lowercased at build time. */
  haystack: string
  /** One line the composer can quote verbatim. */
  summary: string
}

/**
 * Function words, plus the verbs people wrap a question in — "show me your
 * projects", "tell me about", "I'm looking for". None of them narrow anything
 * down, and left in they make an otherwise empty query look content-bearing.
 */
const STOP_WORDS = new Set([
  "and", "are", "but", "can", "could", "did", "does", "for", "from", "had",
  "has", "have", "how", "its", "our", "should", "that", "the", "their", "them",
  "there", "these", "they", "this", "was", "were", "what", "when", "where",
  "which", "who", "will", "with", "would", "you", "your",
  "about", "any", "give", "know", "like", "list", "look", "looking",
  "many", "much", "need", "please", "show", "some", "tell", "want",
])

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token))
}

/**
 * Very small stemmer — enough to match "buildings"→"build", "towers"→"tower".
 * Never returns an empty string: over-stemming a short word would silently
 * drop it from the query.
 */
function stem(token: string) {
  if (token.endsWith("ies") && token.length > 4) return `${token.slice(0, -3)}y`
  const stripped = token.replace(/(ings|ing|ed|es|s)$/, "")
  return stripped.length >= 3 ? stripped : token
}

function keys(input: string) {
  return tokenize(input).map(stem)
}

const docs: Doc[] = [
  ...services.map<Doc>((service) => ({
    id: `service:${service.slug}`,
    kind: "service",
    title: service.title,
    href: `/services/${service.slug}`,
    haystack: [
      service.title,
      service.category,
      service.excerpt,
      service.description,
      service.highlights.join(" "),
      service.deliverables.join(" "),
    ]
      .join(" ")
      .toLowerCase(),
    summary: service.excerpt,
  })),
  ...projects.map<Doc>((project) => ({
    id: `project:${project.slug}`,
    kind: "project",
    title: project.title,
    href: `/projects/${project.slug}`,
    haystack: [
      project.title,
      project.subtitle ?? "",
      project.summary,
      project.sector,
      project.status,
      project.city,
      project.country,
      project.client ?? "",
      project.narrative.join(" "),
    ]
      .join(" ")
      .toLowerCase(),
    summary: `${project.summary} (${project.city}, ${project.country})`,
  })),
  ...offices.map<Doc>((office) => ({
    id: `office:${office.city}`,
    kind: "office",
    title: `${office.city} office`,
    href: "/contact",
    haystack: [
      office.city,
      office.country,
      office.region,
      office.address,
      office.isHeadquarters ? "headquarters head office global" : "",
    ]
      .join(" ")
      .toLowerCase(),
    summary: `${office.address} — ${office.email}, ${office.phone}. ${office.projectCount} projects delivered from this office.`,
  })),
  ...jobs.map<Doc>((job) => ({
    id: `job:${job.slug}`,
    kind: "job",
    title: job.title,
    href: `/careers/${job.slug}`,
    haystack: [
      job.title,
      job.department,
      job.location,
      job.country,
      job.type,
      job.seniority,
      job.summary,
      "career job role hiring vacancy apply",
    ]
      .join(" ")
      .toLowerCase(),
    summary: `${job.department} · ${job.location} · ${job.type} · ${job.seniority}`,
  })),
  ...processSteps.map<Doc>((step) => ({
    id: `process:${step.index}`,
    kind: "process",
    title: `${step.index} — ${step.title}`,
    href: "/services",
    haystack: [
      step.title,
      step.description,
      step.deliverables.join(" "),
      "process stage phase how we work methodology",
    ]
      .join(" ")
      .toLowerCase(),
    summary: step.description,
  })),
  {
    id: "fact:contact",
    kind: "fact",
    title: "Talk to a director",
    href: "/contact",
    haystack:
      "contact email phone call reach speak talk enquiry inquiry quote tender proposal rfp meeting".toLowerCase(),
    summary: `${contactConfig.phone} · ${contactConfig.email}. A director responds to every enquiry within two working days.`,
  },
  {
    id: "fact:scale",
    kind: "fact",
    title: "Scale",
    href: "/about",
    haystack:
      "how big large size company employees countries projects revenue turnover founded history years experience".toLowerCase(),
    summary: `${siteConfig.legalName}, founded ${siteConfig.founded}. ${heroStats
      .map(
        (stat) =>
          `${stat.prefix ?? ""}${stat.value.toLocaleString("en-US")}${stat.suffix ?? ""} ${stat.label.toLowerCase()}`
      )
      .join(", ")}.`,
  },
  {
    id: "fact:estimator",
    kind: "fact",
    title: "Cost estimator",
    href: "/tools/cost-estimator",
    haystack:
      "cost price budget estimate estimator how much expensive rate per sqm square metre spend".toLowerCase(),
    summary:
      "The cost estimator gives an indicative range with an element-by-element breakdown for ten build types across eight regions.",
  },
  {
    id: "fact:sustainability",
    kind: "fact",
    title: "Sustainability",
    href: "/about#sustainability",
    haystack: [
      "sustainability sustainable carbon net zero emissions environment green energy waste recycling embodied breeam leed certification rating",
      sustainability.map((item) => `${item.title} ${item.body}`).join(" "),
    ]
      .join(" ")
      .toLowerCase(),
    summary: `${sustainabilityStats
      .map((stat) => `${stat.value}${stat.suffix ?? ""} ${stat.label.toLowerCase()}`)
      .join(", ")}. Carbon is modelled at concept, existing structure is retained wherever the engineering permits, and materials are sourced within the project's region wherever specification allows.`,
  },
  {
    id: "fact:engineering",
    kind: "fact",
    title: "How we engineer",
    href: "/about",
    haystack: [
      "engineering principles self-perform self performed structure facade critical path buildability safety quality defects handover incentives",
      engineeringPrinciples.map((item) => `${item.title} ${item.body}`).join(" "),
    ]
      .join(" ")
      .toLowerCase(),
    summary:
      "Structure and facade are self-performed on every project, buildability is resolved on paper before site, and lost-time injuries, on-time handover and defect rates are published annually — including the years they get worse.",
  },
]

/** Inverse document frequency, computed once. */
const idf = (() => {
  const counts = new Map<string, number>()
  for (const doc of docs) {
    for (const token of new Set(keys(doc.haystack))) {
      counts.set(token, (counts.get(token) ?? 0) + 1)
    }
  }
  const table = new Map<string, number>()
  for (const [token, count] of counts) {
    table.set(token, Math.log(1 + docs.length / count))
  }
  return table
})()

/** Term frequencies and length, computed once per document. */
const index = new Map<
  string,
  { bag: Map<string, number>; length: number; title: Set<string> }
>()

for (const doc of docs) {
  const docKeys = keys(doc.haystack)
  const bag = new Map<string, number>()
  for (const token of docKeys) bag.set(token, (bag.get(token) ?? 0) + 1)
  index.set(doc.id, {
    bag,
    length: docKeys.length,
    title: new Set(keys(doc.title)),
  })
}

const averageLength =
  [...index.values()].reduce((sum, entry) => sum + entry.length, 0) /
  Math.max(index.size, 1)

/**
 * Query intent. Someone asking for "healthcare projects" wants a project, not
 * the job posting whose title happens to contain the word — so the noun used
 * to describe *what* is wanted carries weight of its own.
 */
const KIND_HINTS: { pattern: RegExp; kind: Doc["kind"] }[] = [
  {
    pattern: /\bprojects?\b|\bportfolio\b|\bbuilt\b|\bdelivered\b|\bcase stud/i,
    kind: "project",
  },
  { pattern: /\bservices?\b|\bcapabilit|\bdiscipline/i, kind: "service" },
  { pattern: /\boffices?\b|\blocations?\b|\bbased\b|\bcover\b/i, kind: "office" },
  {
    pattern: /\bjobs?\b|\brole|\bcareer|\bhiring\b|\bvacanc|\bapply\b|\brecruit/i,
    kind: "job",
  },
  { pattern: /\bprocess\b|\bstage|\bphase|\bmethodolog|\bwork with/i, kind: "process" },
]
const K1 = 1.4
const B = 0.6

/**
 * BM25, with two additions.
 *
 * Title hits are boosted *in proportion to how rare the term is* — a flat
 * bonus would let "Project Director" win every question containing the word
 * "project", which on a builder's site is most of them. And documents of the
 * kind the question asked for are lifted, so "healthcare projects" returns
 * hospitals rather than whatever else mentions healthcare.
 */
function score(doc: Doc, queryKeys: string[], wantedKinds: Set<Doc["kind"]>) {
  const entry = index.get(doc.id)
  if (!entry) return 0

  let total = 0
  for (const token of queryKeys) {
    const weight = idf.get(token) ?? 1.4
    const frequency = entry.bag.get(token)

    if (frequency) {
      total +=
        (weight * frequency * (K1 + 1)) /
        (frequency + K1 * (1 - B + (B * entry.length) / averageLength))
    }

    if (entry.title.has(token)) total += 1.5 * weight
  }

  if (total === 0) return 0
  return wantedKinds.has(doc.kind) ? total * 1.8 : total
}

function search(query: string, limit = 4) {
  const fired = KIND_HINTS.filter((hint) => hint.pattern.test(query))
  const wantedKinds = new Set(fired.map((hint) => hint.kind))

  /* An intent word is consumed once it has been read as intent. Leaving
     "projects" in the scoring bag makes it compete as an ordinary term — and
     on a builder's site the job titled "Project Director" contains it far more
     densely than any actual project page does, so "healthcare projects" would
     return a vacancy. The word already said what it needed to say. */
  const queryKeys = tokenize(query)
    .filter((token) => !fired.some((hint) => hint.pattern.test(token)))
    .map(stem)

  if (queryKeys.length === 0) {
    /* Nothing left but the intent — "show me your projects". Answering with a
       sample of that kind beats answering with nothing. */
    return wantedKinds.size > 0
      ? docs.filter((doc) => wantedKinds.has(doc.kind)).slice(0, limit)
      : []
  }

  /* "Do you build submarines?" contains one word we have never heard of and
     one that appears on almost every page. Matching on the common word alone
     would answer a question nobody asked — returning nothing is what lets the
     composer say honestly that it does not know. */
  const unknown = queryKeys.filter((token) => !idf.has(token))
  const distinctive = queryKeys.filter((token) => (idf.get(token) ?? 0) >= 1.6)
  if (distinctive.length === 0 && unknown.length > 0) return []

  return docs
    .map((doc) => ({ doc, value: score(doc, queryKeys, wantedKinds) }))
    .filter((entry) => entry.value > 0.4)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit)
    .map((entry) => entry.doc)
}

/**
 * Cost questions get a real number rather than a link, when the question
 * contains enough to run the model. Everything unstated falls back to the
 * build type's typical values, and the answer says so.
 */
function costAnswer(question: string) {
  const lower = question.toLowerCase()
  if (!/(cost|price|budget|expensive|how much|rate|\$)/.test(lower)) return null

  const buildType =
    buildTypes.find((type) =>
      keys(type.label).some((token) => keys(lower).includes(token))
    ) ??
    (/(tower|high.?rise|office)/.test(lower)
      ? buildTypes.find((type) => type.id === "commercial-tower")
      : undefined) ??
    (/(villa|house|home|mansion)/.test(lower)
      ? buildTypes.find((type) => type.id === "luxury-villa")
      : undefined) ??
    (/(hospital|clinic|healthcare)/.test(lower)
      ? buildTypes.find((type) => type.id === "hospital")
      : undefined) ??
    (/(school|university|campus|college)/.test(lower)
      ? buildTypes.find((type) => type.id === "education")
      : undefined) ??
    (/(warehouse|logistics|distribution)/.test(lower)
      ? buildTypes.find((type) => type.id === "warehouse")
      : undefined) ??
    (/(hotel|resort)/.test(lower)
      ? buildTypes.find((type) => type.id === "hotel")
      : undefined)

  if (!buildType) return null

  const areaMatch = lower.match(
    /([\d,.]+)\s*(?:sq\s?m|sqm|m2|m²|square\s+met(?:re|er)s?)/
  )
  const floorMatch = lower.match(/([\d,.]+)[\s-]*(?:storey|story|storeys|stories|floors?|levels?)/)

  /* Longest label first: "East Asia" is a substring of "Southeast Asia", so
     source order would silently price a Jakarta tower at Shanghai rates. */
  const region =
    [...regions]
      .sort((a, b) => b.label.length - a.label.length)
      .find((entry) => lower.includes(entry.label.toLowerCase())) ??
    regions.find((entry) => entry.id === "middle-east")!

  const regionStated = lower.includes(region.label.toLowerCase())

  const areaSqm = areaMatch
    ? Math.min(500_000, Math.max(50, Number(areaMatch[1].replace(/,/g, ""))))
    : buildType.typicalAreaSqm

  const floors = floorMatch
    ? Math.min(160, Math.max(1, Math.round(Number(floorMatch[1].replace(/,/g, "")))))
    : buildType.floors.typical

  const estimate = estimateCost({
    buildType: buildType.id,
    areaSqm,
    floors,
    qualityTier: "premium",
    region: region.id,
  })

  if (!estimate) return null

  const assumed: string[] = []
  if (!areaMatch) assumed.push(`${areaSqm.toLocaleString("en-US")} m² gross`)
  if (!floorMatch) assumed.push(`${floors} floor${floors === 1 ? "" : "s"}`)
  assumed.push("premium specification")
  if (!regionStated) assumed.push(`${region.label} rates`)

  return [
    `A ${buildType.label.toLowerCase()} of that description lands around ${formatUsd(estimate.lowUsd)}–${formatUsd(estimate.highUsd)}, or roughly $${estimate.ratePerSqm.toLocaleString("en-US")} per m². Indicative programme is about ${estimate.programmeMonths} months of construction.`,
    `Assumptions I had to make: ${assumed.join(", ")}. ${buildType.note}`,
    `Change any of those on /tools/cost-estimator and you will get the element-by-element breakdown behind the number. For a figure you can take to a board, send the brief through /contact?intent=quote.`,
  ].join("\n\n")
}

const GREETING =
  /^(hi|hey|hello|good (morning|afternoon|evening)|what can you do|help|who are you)\b/i

function greetingAnswer() {
  return [
    `I am the ${siteConfig.name} site assistant. I can answer questions about our ${services.length} services, ${projects.length} projects, ${offices.length} offices and ${jobs.length} open roles — and give you an indicative construction cost.`,
    "Try: “what does a 40-storey tower cost”, “show me healthcare projects”, or “where are your offices in Asia”.",
  ].join("\n\n")
}

/** Composes a short answer from the best-matching site content. */
export function retrieveAnswer(question: string): string {
  const trimmed = question.trim()

  if (GREETING.test(trimmed) && trimmed.length < 42) return greetingAnswer()

  const cost = costAnswer(trimmed)
  if (cost) return cost

  const matches = search(trimmed)

  if (matches.length === 0) {
    return [
      "I could not find that on the site, and I would rather say so than guess.",
      `A director can answer directly — ${contactConfig.email} or ${contactConfig.phone}, or send a brief through /contact. For roles, /careers; for press, ${contactConfig.pressEmail}.`,
    ].join("\n\n")
  }

  const [best, ...rest] = matches

  const lines = [`${best.title} — ${best.summary}${best.href ? ` See ${best.href}.` : ""}`]

  if (rest.length > 0) {
    lines.push(
      "Also relevant:\n" +
        rest
          .map((doc) => `- ${doc.title}${doc.href ? ` (${doc.href})` : ""} — ${doc.summary}`)
          .join("\n")
    )
  }

  lines.push(
    `If you need detail beyond what the site publishes, a director will answer within two working days — /contact or ${contactConfig.email}.`
  )

  return lines.join("\n\n")
}

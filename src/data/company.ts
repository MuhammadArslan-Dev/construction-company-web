import {
  Compass,
  Eye,
  Handshake,
  Leaf,
  Recycle,
  ShieldCheck,
  Sun,
  Target,
  Truck,
  type LucideIcon,
} from "lucide-react"

import type { Stat, TimelineEvent } from "@/types"

/** Twenty-five years, told through the decisions rather than the revenue. */
export const timeline: TimelineEvent[] = [
  {
    year: "2001",
    title: "Founded in New York",
    description:
      "Four engineers leave a national contractor over a value-engineering dispute and take the client with them.",
    metric: "4 employees",
  },
  {
    year: "2005",
    title: "Structure brought in-house",
    description:
      "The decision that defines the company: frame and facade self-performed on every project, permanently.",
    metric: "First self-performed tower",
  },
  {
    year: "2009",
    title: "First international office",
    description:
      "Lisbon opens to deliver a coastal resort, and becomes the template for staffing offices with local engineers.",
    metric: "3 countries",
  },
  {
    year: "2013",
    title: "Infrastructure division formed",
    description:
      "Bridges and transit enter the portfolio, bringing in-house post-tensioning and marine works capability.",
    metric: "$1B annual turnover",
  },
  {
    year: "2016",
    title: "Design studios established",
    description:
      "Architects hired directly and seated alongside delivery teams, ending the handover gap between design and build.",
    metric: "210 designers",
  },
  {
    year: "2019",
    title: "Digital twin as standard",
    description:
      "Every handover starts including a federated as-built model. Reality capture moves to a fortnightly cycle.",
    metric: "ISO 19650 certified",
  },
  {
    year: "2022",
    title: "Carbon modelling made mandatory",
    description:
      "No scheme proceeds past concept without a carbon model, and Sustainability gains the authority to stop one.",
    metric: "42 Platinum ratings",
  },
  {
    year: "2026",
    title: "Eighteen countries",
    description:
      "Five hundred completed projects, 2,500 employees, and the same refusal that started it.",
    metric: "500+ projects",
  },
]

export const mission = {
  icon: Target as LucideIcon,
  title: "Mission",
  statement:
    "To build structures that outlive the schedules and budgets that produced them.",
  body: "Every commercial pressure in construction pushes toward a building that is cheaper to deliver and more expensive to own. We exist to resist that, and we structure our contracts so that resisting it is our risk rather than the client's.",
}

export const vision = {
  icon: Eye as LucideIcon,
  title: "Vision",
  statement:
    "A construction industry where the contractor carries the consequences of its own decisions.",
  body: "We want single-point accountability to be unremarkable — where clients stop being asked to absorb the cost of a subcontractor's error, and where the organisation that designed a connection is the one that installs it.",
}

export const values: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Compass,
    title: "Tell them early",
    body: "If part of a brief is undeliverable, the client hears it before signing — not in month eleven when the programme fails.",
  },
  {
    icon: ShieldCheck,
    title: "Safety is not a metric",
    body: "Health and safety reports to the board, never to operations. Nobody whose bonus depends on programme can overrule it.",
  },
  {
    icon: Handshake,
    title: "Carry the risk",
    body: "Guaranteed maximum price, fixed dates, performance guarantees. If we priced it wrong, that is ours to absorb.",
  },
  {
    icon: Leaf,
    title: "Build for the second owner",
    body: "The specification is written for whoever owns the building in forty years, not for whoever signs the cheque today.",
  },
]

export const engineeringPrinciples = [
  {
    title: "Self-perform the critical path",
    body: "Structure and facade are ours. The two packages that determine whether a project finishes on time are never handed to someone whose incentives differ from the client's.",
  },
  {
    title: "Resolve buildability on paper",
    body: "Architects and engineers sit in the same building as the delivery teams. A connection that cannot be installed is caught in review, not on a Tuesday morning at height.",
  },
  {
    title: "Measure what is uncomfortable",
    body: "Lost-time injuries, on-time handover and defect rates are published annually, including the years they get worse.",
  },
]

export const sustainability: {
  icon: LucideIcon
  title: string
  body: string
}[] = [
  {
    icon: Sun,
    title: "Carbon modelled at concept",
    body: "Every scheme is modelled before design is fixed, when the decisions that matter are still reversible.",
  },
  {
    icon: Recycle,
    title: "Reuse before demolition",
    body: "Existing structure is retained wherever the engineering permits — the lowest-carbon frame is the one already standing.",
  },
  {
    icon: Truck,
    title: "Local supply chains",
    body: "Materials sourced within the region of the project wherever specification allows, cutting transport emissions and lead times together.",
  },
]

export const sustainabilityStats: Stat[] = [
  { value: 42, label: "Platinum / Outstanding Ratings" },
  { value: 61, suffix: "%", label: "Average Operational Carbon Cut" },
  { value: 94, suffix: "%", label: "Construction Waste Diverted" },
  { value: 2035, label: "Net Zero Target" },
]

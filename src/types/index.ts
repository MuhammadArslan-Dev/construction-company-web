import type { LucideIcon } from "lucide-react"

export type Sector =
  | "residential"
  | "commercial"
  | "hospitality"
  | "healthcare"
  | "education"
  | "retail"
  | "industrial"
  | "infrastructure"

export type ProjectStatus =
  | "concept"
  | "in-progress"
  | "completed"
  | "handed-over"

export type ImageKind =
  | "photo"
  | "drone"
  | "blueprint"
  | "floor-plan"
  | "progress"
  | "before"
  | "after"
  | "panorama-360"

export type MediaAsset = {
  url: string
  alt: string
  kind?: ImageKind
  caption?: string
  width?: number
  height?: number
}

export type Stat = {
  value: number
  suffix?: string
  prefix?: string
  label: string
  decimals?: number
}

export type ServiceCategory = "Build" | "Infrastructure" | "Design" | "Delivery"

export type Service = {
  slug: string
  title: string
  category: ServiceCategory
  icon: LucideIcon
  excerpt: string
  description: string
  image: MediaAsset
  highlights: string[]
  /** Contractual outputs the client receives — rendered on the detail page. */
  deliverables: string[]
  /** Discipline-specific proof points. */
  metrics: Stat[]
  /** Slugs from `src/data/projects.ts` used as evidence. */
  relatedProjects: string[]
  featured?: boolean
}

export type ProjectMilestone = {
  label: string
  description?: string
  date: string
  position?: number
}

export type Project = {
  slug: string
  title: string
  subtitle?: string
  summary: string
  narrative: string[]
  sector: Sector
  status: ProjectStatus
  featured?: boolean
  hero: MediaAsset
  gallery: MediaAsset[]
  city: string
  country: string
  coordinates?: { lat: number; lng: number }
  client: string
  architect?: string
  valueUsd?: number
  areaSqm?: number
  floors?: number
  startedAt?: string
  completedAt?: string
  awards?: string[]
  challenges: string[]
  results: string[]
  milestones: ProjectMilestone[]
  /** Aspect hint used by the masonry grid. */
  span?: "tall" | "wide" | "regular"
}

export type TeamMember = {
  name: string
  role: string
  bio: string
  portrait: MediaAsset
  location?: string
  linkedin?: string
}

export type Testimonial = {
  quote: string
  author: string
  role: string
  company: string
  logo?: string
  project?: string
}

export type ClientLogo = {
  name: string
  category:
    | "Government"
    | "Real Estate"
    | "Hospitality"
    | "Banking"
    | "Healthcare"
    | "Corporate"
  wordmark: string
}

export type ProcessStep = {
  index: string
  title: string
  description: string
  deliverables: string[]
  icon: LucideIcon
}

export type TimelineEvent = {
  year: string
  title: string
  description: string
  metric?: string
}

export type ValueProp = {
  title: string
  description: string
  icon: LucideIcon
  metric?: string
}

export type Post = {
  slug: string
  title: string
  excerpt: string
  body: string[]
  cover: MediaAsset
  category:
    | "Construction News"
    | "Architecture"
    | "Engineering"
    | "Technology"
    | "Sustainability"
  author: string
  authorRole: string
  publishedAt: string
  readMinutes: number
  featured?: boolean
}

export type JobPosting = {
  slug: string
  title: string
  department: string
  location: string
  country: string
  type: "Full-time" | "Contract" | "Internship"
  seniority: string
  summary: string
  responsibilities: string[]
  requirements: string[]
  postedAt: string
}

export type Office = {
  city: string
  country: string
  region: "Americas" | "EMEA" | "APAC"
  address: string
  phone: string
  email: string
  coordinates: { lat: number; lng: number }
  isHeadquarters?: boolean
  projectCount: number
}

export type Award = {
  year: string
  title: string
  awarding: string
  project?: string
}

export type Certification = {
  code: string
  title: string
  description: string
}

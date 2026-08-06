import {
  BookOpen,
  Globe2,
  HeartPulse,
  Scale,
  Timer,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { unsplash } from "@/lib/images"
import type { MediaAsset } from "@/types"

export const benefits: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: BookOpen,
    title: "Chartership, paid and mentored",
    body: "Fees, study leave and an assigned mentor from day one. 100% of our discipline leads are chartered because we pay for it, not because we filter for it.",
  },
  {
    icon: Globe2,
    title: "Move between countries",
    body: "Eighteen countries, and internal transfer is a standard route rather than an exception. Relocation is funded, including for family.",
  },
  {
    icon: HeartPulse,
    title: "Health cover that includes site staff",
    body: "The same private medical and mental-health provision for a site supervisor as for a director. There is no two-tier scheme.",
  },
  {
    icon: Wallet,
    title: "Profit share across the business",
    body: "A single company-wide profit share paid at the same percentage of salary at every grade, from apprentice to executive.",
  },
  {
    icon: Timer,
    title: "Rotas that account for site hours",
    body: "Night and weekend possessions are compensated with time, not just money, and long-shift rosters are capped and enforced.",
  },
  {
    icon: Scale,
    title: "The standing to stop work",
    body: "Every employee has written authority to halt an unsafe operation. It has never once been held against anyone who used it.",
  },
]

export const culturePoints = [
  {
    title: "Your first year is on site",
    body: "Designers and engineers start in the rain. Buildability is not something you learn from a review comment, and it shapes how you draw for the rest of your career.",
  },
  {
    title: "You will be asked to say no",
    body: "If a brief is undeliverable, we expect you to say so before the contract is signed — to the client, in the room. Nobody here is rewarded for optimism.",
  },
  {
    title: "The numbers get published",
    body: "On-time handover, injury rate and defect rates go into the annual review whether they improved or not. You will see your project in it.",
  },
]

export const cultureImages: MediaAsset[] = [
  {
    url: unsplash("photo-1531834685032-c34bf0d84c77"),
    alt: "Site crews fixing reinforcement cages on a live project",
  },
  {
    url: unsplash("photo-1516216628859-9bccecab13ca"),
    alt: "Engineers taking a setting-out survey with precision instruments",
  },
  {
    url: unsplash("photo-1497366811353-6870744d04b2"),
    alt: "Design review underway in a glazed meeting room",
  },
  {
    url: unsplash("photo-1614127938540-a1139bee1841"),
    alt: "Steel erectors working at height on a structural frame",
  },
]

export const hiringSteps = [
  {
    title: "Application",
    body: "A CV and a short note. No cover letter template, no timed assessment.",
  },
  {
    title: "Conversation",
    body: "Forty-five minutes with the person who would manage you, not a recruiter.",
  },
  {
    title: "Technical review",
    body: "A discussion of real problems from live projects. No whiteboard puzzles.",
  },
  {
    title: "Site visit",
    body: "You spend half a day on one of our sites before deciding. So do we.",
  },
]

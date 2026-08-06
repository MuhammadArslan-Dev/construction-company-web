import { portrait } from "@/lib/images"
import type { TeamMember } from "@/types"

export const leadership: TeamMember[] = [
  {
    name: "Kwame Adjei",
    role: "Group Chief Executive",
    bio: "Joined as a site engineer in 2004 and has run every division since. Holds the view that a contractor who will not say no is not worth hiring.",
    portrait: {
      url: portrait("photo-1588178454780-441fa5b99fa5"),
      alt: "Kwame Adjei, Group Chief Executive",
    },
    location: "New York",
  },
  {
    name: "Ingrid Lindqvist",
    role: "Chief Operating Officer",
    bio: "Runs delivery across all eighteen countries. Introduced the weekly programme report that no project is permitted to skip, including her own.",
    portrait: {
      url: portrait("photo-1685760259914-ee8d2c92d2e0"),
      alt: "Ingrid Lindqvist, Chief Operating Officer",
    },
    location: "Oslo",
  },
  {
    name: "Rafael Duarte",
    role: "Chief Technology Officer",
    bio: "Built the federated BIM environment and the reality-capture programme. Believes a digital twin that is not used on site is an expensive drawing.",
    portrait: {
      url: portrait("photo-1600878459138-e1123b37cb30"),
      alt: "Rafael Duarte, Chief Technology Officer",
    },
    location: "Lisbon",
  },
  {
    name: "Mei-Lin Chen",
    role: "Chief Architect",
    bio: "Leads the design studios. Insists her architects spend their first year on site, because buildability is learned in the rain, not in a review.",
    portrait: {
      url: portrait("photo-1701728667207-54b43dbdab97"),
      alt: "Mei-Lin Chen, Chief Architect",
    },
    location: "Singapore",
  },
  {
    name: "Anders Holm",
    role: "Group Engineering Director",
    bio: "Structural engineer behind the Silverstrand closure method. Signs off every long-span and high-rise scheme the group undertakes.",
    portrait: {
      url: portrait("photo-1560250097-0b93528c311a"),
      alt: "Anders Holm, Group Engineering Director",
    },
    location: "Copenhagen",
  },
  {
    name: "Priya Raghunathan",
    role: "Director of Sustainability",
    bio: "Carbon-models every scheme at concept stage and has the authority to stop one. Forty-two Platinum-rated buildings carry her sign-off.",
    portrait: {
      url: portrait("photo-1609436132311-e4b0c9370469"),
      alt: "Priya Raghunathan, Director of Sustainability",
    },
    location: "Singapore",
  },
  {
    name: "Michael Ferrand",
    role: "Chief Financial Officer",
    bio: "Structures the guaranteed-maximum-price agreements that let Meridian carry risk other contractors decline to price.",
    portrait: {
      url: portrait("photo-1472099645785-5658abf4ff4e"),
      alt: "Michael Ferrand, Chief Financial Officer",
    },
    location: "New York",
  },
  {
    name: "Sofia Marchetti",
    role: "Director of Health & Safety",
    bio: "Owns the 0.08 lost-time injury rate and publishes it annually whether it improves or not. Reports directly to the board, not to operations.",
    portrait: {
      url: portrait("photo-1652471949169-9c587e8898cd"),
      alt: "Sofia Marchetti, Director of Health and Safety",
    },
    location: "Milan",
  },
]

/** Headcount by discipline — the people behind the leadership page. */
export const disciplines = [
  { label: "Chartered Engineers", count: 1400 },
  { label: "Architects & Designers", count: 210 },
  { label: "Project Managers", count: 340 },
  { label: "Site Supervisors", count: 520 },
]

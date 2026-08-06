import {
  ClipboardCheck,
  Compass,
  DraftingCompass,
  HardHat,
  KeyRound,
  Ruler,
} from "lucide-react"

import type { ProcessStep } from "@/types"

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Planning",
    description:
      "Feasibility, site investigation, consents and a cost plan you can take to a board. Nothing is drawn until the constraints are known.",
    deliverables: ["Feasibility study", "Cost plan", "Consent strategy"],
    icon: Compass,
  },
  {
    index: "02",
    title: "Architecture",
    description:
      "Concept through to construction documentation, produced in the same building as the people who will build it.",
    deliverables: ["Concept design", "Planning submission", "IFC drawings"],
    icon: DraftingCompass,
  },
  {
    index: "03",
    title: "Engineering",
    description:
      "Structural, civil and MEP engineering resolved to construction tolerance — with the digital twin the site team will actually use.",
    deliverables: ["Structural design", "MEP coordination", "Federated BIM model"],
    icon: Ruler,
  },
  {
    index: "04",
    title: "Construction",
    description:
      "Self-performed structure and facade, directly employed supervision, and a programme reported against every week without exception.",
    deliverables: ["Weekly programme report", "Safety assurance", "Progress imagery"],
    icon: HardHat,
  },
  {
    index: "05",
    title: "Inspection",
    description:
      "Independent commissioning, statutory sign-off and a defect list closed out before handover rather than after it.",
    deliverables: ["Commissioning records", "Statutory approvals", "Zero-defect certificate"],
    icon: ClipboardCheck,
  },
  {
    index: "06",
    title: "Delivery",
    description:
      "Keys, the as-built model, operation and maintenance manuals, and a named engineer on call for the full defects liability period.",
    deliverables: ["As-built model", "O&M manuals", "12-month aftercare"],
    icon: KeyRound,
  },
]

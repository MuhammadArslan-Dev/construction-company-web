import {
  Award,
  CalendarCheck,
  Cpu,
  Gem,
  Headset,
  Leaf,
  ShieldCheck,
  Users,
} from "lucide-react"

import type { ValueProp } from "@/types"

export const valueProps: ValueProp[] = [
  {
    title: "Engineering Excellence",
    description:
      "Structure and facade are self-performed on every project. The people who design the connection are the people who install it.",
    icon: Award,
    metric: "1,400 engineers in-house",
  },
  {
    title: "On-Time Delivery",
    description:
      "96% of our projects hand over on or before the contract date. The remaining 4% are reported publicly in our annual review.",
    icon: CalendarCheck,
    metric: "96% on-time",
  },
  {
    title: "Premium Materials",
    description:
      "Direct relationships with quarries, mills and fabricators. Specification is locked at contract, not value-engineered later.",
    icon: Gem,
    metric: "No substitution clause",
  },
  {
    title: "Certified Engineers",
    description:
      "Chartered engineers lead every discipline on every site, accredited under ICE, ASCE or the local equivalent.",
    icon: Users,
    metric: "100% chartered leads",
  },
  {
    title: "Modern Technology",
    description:
      "Federated BIM, reality capture on a fortnightly cycle and a digital twin handed over with the keys.",
    icon: Cpu,
    metric: "Digital twin as standard",
  },
  {
    title: "Safety Standards",
    description:
      "A lost-time injury rate of 0.08 per 200,000 hours — roughly a tenth of the global construction average.",
    icon: ShieldCheck,
    metric: "0.08 LTIR",
  },
  {
    title: "Sustainability",
    description:
      "Every project is carbon-modelled at concept stage. We have delivered 42 LEED Platinum and BREEAM Outstanding buildings.",
    icon: Leaf,
    metric: "42 Platinum ratings",
  },
  {
    title: "24/7 Support",
    description:
      "A named engineer on call throughout the defects liability period, reachable on one number in your own time zone.",
    icon: Headset,
    metric: "12-month aftercare",
  },
]

import type { Stat } from "@/types"

export const heroStats: Stat[] = [
  { value: 25, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 18, label: "Countries" },
  { value: 2500, suffix: "+", label: "Employees" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
]

/** Labels kept short — at four across they wrap to three lines otherwise. */
export const capabilityStats: Stat[] = [
  { value: 42.6, decimals: 1, prefix: "$", suffix: "B", label: "Delivered" },
  { value: 14, suffix: "M", label: "Sq Metres Built" },
  { value: 0.08, decimals: 2, label: "Injury Rate" },
  { value: 96, suffix: "%", label: "On-Time" },
]

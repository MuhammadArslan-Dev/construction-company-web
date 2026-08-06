import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google"

/**
 * Type system.
 *
 * - Plus Jakarta Sans → display / headings. Geometric, wide apertures, reads
 *   confident at 72px+ without feeling like a tech startup.
 * - Geist → UI and body copy. Neutral, high legibility at 18px.
 * - Geist Mono → data, indices, coordinates, project metadata.
 *
 * (General Sans is a Fontshare face and is not available through next/font's
 * Google provider; Plus Jakarta Sans fills the display role with the same
 * geometric character while keeping the self-hosted, zero-layout-shift path.)
 */

export const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
})

export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const fontVariables = [
  fontDisplay.variable,
  fontSans.variable,
  fontMono.variable,
].join(" ")

/** Presentation helpers shared across marketing surfaces. */

const compactUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
})

const decimal = new Intl.NumberFormat("en-US")

export function formatCurrencyCompact(value: number | bigint | null | undefined) {
  if (value === null || value === undefined) return "—"
  return compactUsd.format(typeof value === "bigint" ? Number(value) : value)
}

export function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined) return "—"
  return decimal.format(value)
}

export function formatArea(sqm: number | null | undefined) {
  if (!sqm) return "—"
  return `${decimal.format(sqm)} m²`
}

export function formatDate(
  value: Date | string | null | undefined,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" }
) {
  if (!value) return "—"
  const date = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return "—"
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(
    date
  )
}

export function formatYear(value: Date | string | null | undefined) {
  return formatDate(value, { year: "numeric" })
}

/** "LUXURY_VILLAS" → "Luxury Villas" */
export function humanizeEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Zero-pads a step index: 1 → "01" */
export function padIndex(index: number, length = 2) {
  return String(index).padStart(length, "0")
}

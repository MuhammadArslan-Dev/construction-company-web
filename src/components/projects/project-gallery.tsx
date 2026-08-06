"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"

import { imageKindLabels } from "@/data/galleries"
import type { MediaAsset } from "@/types"
import { EASE_LUXE } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Kind = NonNullable<MediaAsset["kind"]>

/**
 * Case-study gallery with a media-type filter and a lightbox.
 *
 * The lightbox is a plain focus-trapped overlay rather than a Radix dialog:
 * it needs arrow-key paging and an image that fills the viewport, which is
 * simpler to get right directly than to bend a dialog into.
 */
export function ProjectGallery({ images }: { images: MediaAsset[] }) {
  const [filter, setFilter] = React.useState<Kind | "all">("all")
  const [open, setOpen] = React.useState<number | null>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)

  const kinds = React.useMemo(() => {
    const seen: Kind[] = []
    for (const image of images) {
      const kind = image.kind ?? "photo"
      if (!seen.includes(kind)) seen.push(kind)
    }
    return seen
  }, [images])

  const visible = React.useMemo(
    () =>
      filter === "all"
        ? images
        : images.filter((image) => (image.kind ?? "photo") === filter),
    [images, filter]
  )

  const step = React.useCallback(
    (delta: number) => {
      setOpen((current) => {
        if (current === null) return current
        const next = current + delta
        if (next < 0) return visible.length - 1
        if (next >= visible.length) return 0
        return next
      })
    },
    [visible.length]
  )

  // Arrow-key paging and Escape, plus a scroll lock while the overlay is up.
  React.useEffect(() => {
    if (open === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null)
      if (event.key === "ArrowRight") step(1)
      if (event.key === "ArrowLeft") step(-1)
    }

    document.addEventListener("keydown", onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, step])

  const active = open === null ? null : visible[open]

  return (
    <div>
      {/* Media-type filter --------------------------------------------- */}
      <div
        role="group"
        aria-label="Filter gallery by media type"
        className="flex flex-wrap items-center gap-x-2 gap-y-3"
      >
        {(["all", ...kinds] as (Kind | "all")[]).map((kind) => {
          const selected = kind === filter
          const count =
            kind === "all"
              ? images.length
              : images.filter((image) => (image.kind ?? "photo") === kind).length
          return (
            <button
              key={kind}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(kind)}
              className={cn(
                "focus-visible:ring-ring inline-flex items-center gap-2 rounded-xs px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:ring-2",
                selected
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {kind === "all" ? "All Media" : imageKindLabels[kind]}
              <span
                className={cn(
                  "font-mono text-[10px] tabular",
                  selected ? "text-background/80" : "text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid ------------------------------------------------------------ */}
      <motion.ul
        layout
        className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {visible.map((image, index) => (
          <motion.li
            key={`${image.url}-${index}`}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_LUXE }}
            className={cn(
              "relative",
              index % 7 === 0 ? "col-span-2 aspect-4/3" : "aspect-square"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`Open image: ${image.alt}`}
              className="group/shot focus-visible:ring-ring bg-muted relative block size-full overflow-hidden rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover/shot:scale-[1.06]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-ink-950/0 transition-colors duration-500 group-hover/shot:bg-ink-950/25"
              />
              <span
                aria-hidden
                className="glass-ink absolute top-3 left-3 rounded-xs px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-white/85 uppercase"
              >
                {imageKindLabels[image.kind ?? "photo"]}
              </span>
              <span
                aria-hidden
                className="text-ink-900 absolute right-3 bottom-3 inline-flex size-8 translate-y-2 items-center justify-center rounded-xs bg-white/90 opacity-0 transition-all duration-400 ease-[var(--ease-luxe)] group-hover/shot:translate-y-0 group-hover/shot:opacity-100"
              >
                <Expand className="size-3.5" />
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {/* Lightbox --------------------------------------------------------- */}
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="bg-ink-950/96 fixed inset-0 z-[80] flex flex-col backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(null)
          }}
        >
          <div className="flex items-center justify-between gap-4 p-5 lg:p-7">
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">
              {imageKindLabels[active.kind ?? "photo"]}
              <span className="mx-3 text-white/25">/</span>
              <span className="tabular">
                {String((open ?? 0) + 1).padStart(2, "0")} —{" "}
                {String(visible.length).padStart(2, "0")}
              </span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close gallery"
              className="focus-visible:ring-ring inline-flex size-11 items-center justify-center rounded-xs border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:ring-2"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <Image
              key={active.url}
              src={active.url}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="flex items-center justify-between gap-6 p-5 lg:p-7">
            <p className="max-w-xl text-sm text-white/70">
              {active.caption ?? active.alt}
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="focus-visible:ring-ring inline-flex size-11 items-center justify-center rounded-xs border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:ring-2"
              >
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="focus-visible:ring-ring inline-flex size-11 items-center justify-center rounded-xs border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:ring-2"
              >
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

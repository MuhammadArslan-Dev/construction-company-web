import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { Service } from "@/types"
import { cn } from "@/lib/utils"

type ServiceCardProps = {
  service: Service
  /** Hero tile in the homepage grid — taller frame and larger title. */
  large?: boolean
  priority?: boolean
  className?: string
}

/**
 * The capability tile. Shared by the homepage grid and the services index so
 * the two surfaces can never drift apart.
 *
 * One hover gesture, three synchronised parts: the photograph pushes in, the
 * icon plate flips to gold, and a gold rule wipes across the base.
 */
export function ServiceCard({
  service,
  large = false,
  priority = false,
  className,
}: ServiceCardProps) {
  const Icon = service.icon

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group/service focus-visible:ring-ring relative isolate flex size-full flex-col justify-end overflow-hidden rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4",
        className
      )}
    >
      <Image
        src={service.image.url}
        alt={service.image.alt}
        fill
        priority={priority}
        sizes={
          large
            ? "(max-width: 1024px) 100vw, 50vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        className="-z-10 object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover/service:scale-[1.07]"
      />
      <div
        aria-hidden
        className="scrim-bottom absolute inset-0 -z-10 transition-opacity duration-700 group-hover/service:opacity-90"
      />

      <div className={cn("p-7", large && "lg:p-9")}>
        <span
          aria-hidden
          className="group-hover/service:border-gold-500 group-hover/service:bg-gold-500 group-hover/service:text-ink-900 mb-6 inline-flex size-12 items-center justify-center border border-white/30 text-white transition-colors duration-500 ease-[var(--ease-luxe)]"
        >
          <Icon className="size-5" />
        </span>

        <h3
          className={cn(
            "font-display flex items-start gap-2 font-bold text-white",
            large ? "text-subheading" : "text-2xl"
          )}
        >
          {service.title}
          <ArrowUpRight
            aria-hidden
            className="text-gold-500 mt-1 size-5 shrink-0 opacity-0 transition-all duration-500 ease-[var(--ease-luxe)] group-hover/service:translate-x-1 group-hover/service:-translate-y-1 group-hover/service:opacity-100"
          />
        </h3>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
          {service.excerpt}
        </p>

        <span
          aria-hidden
          className="bg-gold-500 mt-6 block h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-luxe)] group-hover/service:scale-x-100"
        />
      </div>
    </Link>
  )
}

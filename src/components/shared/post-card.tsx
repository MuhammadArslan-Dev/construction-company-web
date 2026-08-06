import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { formatDate } from "@/lib/format"
import type { Post } from "@/types"
import { cn } from "@/lib/utils"

export function PostCard({
  post,
  priority = false,
  className,
}: {
  post: Post
  priority?: boolean
  className?: string
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group/post focus-visible:ring-ring block rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4",
        className
      )}
    >
      <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-xs">
        <Image
          src={post.cover.url}
          alt={post.cover.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover/post:scale-[1.06]"
        />
      </div>

      <p className="text-eyebrow text-muted-foreground mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 uppercase">
        <span className="text-accent-text">{post.category}</span>
        <span aria-hidden className="bg-border h-px w-4" />
        <time dateTime={post.publishedAt} className="tabular">
          {formatDate(post.publishedAt, {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      </p>

      <h3 className="font-display text-foreground mt-4 flex items-start gap-2 text-xl leading-snug font-semibold text-balance lg:text-2xl">
        {post.title}
        <ArrowUpRight
          aria-hidden
          className="text-gold-500 mt-1.5 size-4 shrink-0 opacity-0 transition-all duration-500 ease-[var(--ease-luxe)] group-hover/post:translate-x-1 group-hover/post:-translate-y-1 group-hover/post:opacity-100"
        />
      </h3>

      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        {post.excerpt}
      </p>

      <p className="text-muted-foreground mt-5 font-mono text-[11px] tracking-[0.14em] uppercase">
        {post.author} · {post.readMinutes} min read
      </p>
    </Link>
  )
}

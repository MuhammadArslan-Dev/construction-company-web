import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

/**
 * Renders one assistant turn.
 *
 * The stream is plain prose, not markdown — deliberately, because a half-parsed
 * markdown tree flickering on every token is worse than no formatting at all.
 * Two things are worth structuring, so only two are handled: hyphen lists, and
 * internal `/paths`, which become real <Link>s so a recommendation is one tap
 * from the page it describes.
 */

/* Matches a site path at a word boundary: /projects/meridian-one,
   /contact?intent=quote. Trailing punctuation is excluded so a path at the end
   of a sentence does not swallow the full stop. */
const PATH = /(\/[a-z0-9][a-z0-9\-/]*(?:\?[a-z-]+=[a-z0-9-]+)?)/gi

function withLinks(text: string, key: string) {
  const parts = text.split(PATH)
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <Link
          key={`${key}-${index}`}
          href={part}
          className="text-accent-text underline decoration-current/40 underline-offset-4 transition-colors hover:decoration-current"
        >
          {part}
        </Link>
      )
    }
    return <React.Fragment key={`${key}-${index}`}>{part}</React.Fragment>
  })
}

export function AssistantMessageBody({
  content,
  className,
}: {
  content: string
  className?: string
}) {
  const blocks = content.split(/\n{2,}/).filter((block) => block.trim().length > 0)

  return (
    <div className={cn("space-y-3", className)}>
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n")
        const bulletLines = lines.filter((raw) => /^\s*[-•]\s+/.test(raw))

        if (bulletLines.length > 0 && bulletLines.length === lines.length) {
          return (
            <ul key={blockIndex} className="space-y-2">
              {lines.map((raw, lineIndex) => (
                <li key={lineIndex} className="flex gap-2.5">
                  <span aria-hidden className="text-accent-text mt-[0.45em] size-1 shrink-0 rounded-full bg-current" />
                  <span>
                    {withLinks(
                      raw.replace(/^\s*[-•]\s+/, ""),
                      `${blockIndex}-${lineIndex}`
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )
        }

        /* A block that mixes a lead-in line with bullets — the common shape of
           "Also relevant:" followed by a list. */
        if (bulletLines.length > 0) {
          const lead = lines.filter((raw) => !/^\s*[-•]\s+/.test(raw))
          return (
            <div key={blockIndex} className="space-y-2">
              {lead.map((raw, lineIndex) => (
                <p key={`lead-${lineIndex}`}>
                  {withLinks(raw, `${blockIndex}-lead-${lineIndex}`)}
                </p>
              ))}
              <ul className="space-y-2">
                {bulletLines.map((raw, lineIndex) => (
                  <li key={lineIndex} className="flex gap-2.5">
                    <span aria-hidden className="text-accent-text mt-[0.45em] size-1 shrink-0 rounded-full bg-current" />
                    <span>
                      {withLinks(
                        raw.replace(/^\s*[-•]\s+/, ""),
                        `${blockIndex}-${lineIndex}`
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        }

        return <p key={blockIndex}>{withLinks(block, String(blockIndex))}</p>
      })}
    </div>
  )
}

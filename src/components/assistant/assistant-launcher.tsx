"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Maximize2, MessageSquareText, X } from "lucide-react"

import { AssistantChat } from "@/components/assistant/assistant-chat"
import { useHydrated } from "@/hooks/use-hydrated"
import { DURATION, EASE_LUXE } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Site-wide assistant dock.
 *
 * A single fixed button that expands into a docked panel. Deliberately not a
 * modal: someone comparing an answer against the page behind it should not
 * have the page taken away from them, so there is no overlay and no scroll
 * lock on desktop. On phones the panel takes the viewport, because at 360px
 * there is no "behind" worth preserving.
 *
 * Hidden on /tools/assistant — offering a floating shortcut to the page you
 * are already on is noise.
 */
export function AssistantLauncher() {
  const hydrated = useHydrated()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const panelRef = React.useRef<HTMLDivElement | null>(null)
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)

  /* Escape closes and returns focus to the launcher — the panel is dismissible
     by keyboard even though it is not a dialog. */
  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  /* Close on route change, otherwise the panel follows you around the site. */
  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  if (!hydrated || pathname?.startsWith("/tools/assistant")) return null

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="assistant-panel"
            ref={panelRef}
            role="region"
            aria-label="AI construction assistant"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: DURATION.base, ease: EASE_LUXE }}
            className={cn(
              "border-border bg-background shadow-luxe fixed z-50 flex flex-col overflow-hidden",
              "inset-x-0 bottom-0 top-0 border-t",
              "sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-24 sm:h-[min(38rem,calc(100dvh-9rem))] sm:w-[26rem] sm:rounded-xs sm:border"
            )}
          >
            <header className="border-border flex items-center justify-between gap-3 border-b px-5 py-4">
              <div className="min-w-0">
                <p className="font-display text-foreground text-sm font-semibold">
                  Construction assistant
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  Services, projects, costs and programme
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Link
                  href="/tools/assistant"
                  aria-label="Open the assistant full screen"
                  className="text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] focus-visible:ring-ring flex size-8 items-center justify-center rounded-sm transition-colors focus-visible:ring-2"
                >
                  <Maximize2 aria-hidden className="size-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    buttonRef.current?.focus()
                  }}
                  aria-label="Close assistant"
                  className="text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] focus-visible:ring-ring flex size-8 items-center justify-center rounded-sm transition-colors focus-visible:ring-2"
                >
                  <X aria-hidden className="size-4" />
                </button>
              </div>
            </header>

            <AssistantChat autoFocus className="min-h-0 flex-1" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Ask the construction assistant"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DURATION.base, ease: EASE_LUXE, delay: 1.4 }}
        className={cn(
          "bg-gold-500 text-ink-900 shadow-luxe hover:shadow-gold focus-visible:ring-ring",
          "fixed right-5 bottom-5 z-50 flex size-13 items-center justify-center rounded-full",
          "transition-[box-shadow,transform] duration-500 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2",
          "sm:right-6 sm:bottom-6",
          open && "max-sm:hidden"
        )}
      >
        {open ? (
          <X aria-hidden className="size-5" />
        ) : (
          <MessageSquareText aria-hidden className="size-5" />
        )}
      </motion.button>
    </>
  )
}

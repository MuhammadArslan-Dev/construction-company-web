"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, Phone, X } from "lucide-react"

import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { contactConfig } from "@/config/site"
import { mainNav } from "@/config/navigation"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { EASE_LUXE } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Pages that open with a dark, full-bleed `<PageHero>` or `<Hero>`. */
const darkHeroRoutes = [
  /^\/$/,
  /^\/services$/,
  /^\/services\/[^/]+$/,
  /^\/projects$/,
  /^\/projects\/[^/]+$/,
  /^\/about$/,
  /^\/careers$/,
  /^\/contact$/,
  /^\/blog$/,
  /^\/blog\/[^/]+$/,
  /^\/tools$/,
  /^\/tools\/[^/]+$/,
]

/**
 * Sticky navigation.
 *
 * Over the hero it is transparent with white type; the moment the reader
 * scrolls past it, the glass panel and the theme-correct colours fade in. It
 * also retracts on downward scroll and returns on upward scroll, so a long
 * editorial page is never competing with a permanent bar.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const { isScrolled, direction } = useScrollPosition(24)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  /**
   * Routes whose first section is a full-bleed dark hero. The header runs
   * transparent over these until the reader scrolls, then fades to glass.
   * Anything not listed gets the solid treatment from the first pixel.
   */
  const overHero = darkHeroRoutes.some((pattern) => pattern.test(pathname))
  const solid = isScrolled || !overHero || mobileOpen

  React.useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-luxe)]",
        direction === "down" && !mobileOpen ? "-translate-y-full" : "translate-y-0",
        solid
          ? "glass border-border border-b"
          : "dark border-b border-transparent"
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <Container className="flex h-20 items-center justify-between gap-8 lg:h-24">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li
                  key={item.href}
                  onMouseEnter={() =>
                    setOpenMenu(item.children ? item.label : null)
                  }
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-foreground/85 hover:text-foreground focus-visible:ring-ring relative inline-flex items-center rounded-xs px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2",
                      active && "text-foreground"
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "bg-gold-500 absolute inset-x-4 bottom-0 h-px origin-left transition-transform duration-500 ease-[var(--ease-luxe)]",
                        active ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={contactConfig.phoneHref}
            className="text-foreground/80 hover:text-foreground focus-visible:ring-ring hidden items-center gap-2 rounded-xs text-sm font-medium transition-colors focus-visible:ring-2 xl:inline-flex"
          >
            <Phone aria-hidden className="size-4" />
            {contactConfig.phone}
          </a>

          {/* Hidden below lg — at 360px it collided with the menu trigger and
              overflowed the viewport. The drawer carries the same CTA. */}
          <Button
            asChild
            size="lg"
            variant={solid ? "default" : "onImage"}
            className="hidden lg:inline-flex"
          >
            <Link href="/contact?intent=quote">Start Your Project</Link>
          </Button>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="text-foreground focus-visible:ring-ring -mr-2 inline-flex size-11 items-center justify-center rounded-xs focus-visible:ring-2 lg:hidden"
          >
            {mobileOpen ? (
              <X aria-hidden className="size-6" />
            ) : (
              <Menu aria-hidden className="size-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Desktop mega menu ------------------------------------------------ */}
      <AnimatePresence>
        {openMenu ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_LUXE }}
            className="border-border bg-background hidden border-t lg:block"
          >
            <Container className="grid grid-cols-4 gap-x-10 gap-y-8 py-12">
              {mainNav
                .find((item) => item.label === openMenu)
                ?.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="group/mega focus-visible:ring-ring rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4"
                  >
                    <span className="text-foreground flex items-center gap-2 text-base font-medium">
                      {child.label}
                      <ArrowUpRight
                        aria-hidden
                        className="text-gold-500 size-4 opacity-0 transition-all duration-400 ease-[var(--ease-luxe)] group-hover/mega:translate-x-0.5 group-hover/mega:-translate-y-0.5 group-hover/mega:opacity-100"
                      />
                    </span>
                    <span className="text-muted-foreground mt-2 block text-sm">
                      {child.description}
                    </span>
                  </Link>
                ))}
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile drawer ---------------------------------------------------- */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_LUXE }}
            className="bg-background h-[calc(100dvh-5rem)] overflow-y-auto lg:hidden"
          >
            <Container className="py-8">
              <ul className="divide-hairline divide-y">
                {mainNav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.04 * index,
                      ease: EASE_LUXE,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="text-subheading font-display text-foreground block py-5"
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="-mt-2 grid gap-3 pb-6">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="text-muted-foreground hover:text-foreground text-base"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 grid gap-4">
                <Button asChild size="xl" variant="gold" className="w-full">
                  <Link href="/contact?intent=quote">Start Your Project</Link>
                </Button>
                <a
                  href={contactConfig.phoneHref}
                  className="text-muted-foreground inline-flex items-center gap-2 text-sm"
                >
                  <Phone aria-hidden className="size-4" />
                  {contactConfig.phone}
                </a>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

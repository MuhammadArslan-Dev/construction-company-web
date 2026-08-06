import * as React from "react"

import { AssistantLauncher } from "@/components/assistant/assistant-launcher"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { OrganizationSchema } from "@/components/seo/structured-data"

/**
 * Marketing shell. Every public page renders inside the sticky header and the
 * dark footer; the style guide sits outside this group deliberately so the
 * design system can be reviewed without site chrome.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <OrganizationSchema />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <AssistantLauncher />
    </div>
  )
}

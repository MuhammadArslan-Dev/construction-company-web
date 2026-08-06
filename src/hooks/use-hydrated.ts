"use client"

import { useEffect, useState } from "react"

/**
 * True once the component has mounted on the client.
 *
 * Used to hold form submit buttons disabled until React has attached its
 * handlers. Server-rendered form markup is interactive before hydration
 * completes, and a submit in that window falls through to the browser's
 * default behaviour — a GET navigation that serialises every field into the
 * query string. That is both broken and a privacy problem, since query strings
 * end up in browser history, proxies and server logs.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}

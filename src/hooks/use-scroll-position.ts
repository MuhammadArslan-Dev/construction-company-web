"use client"

import { useEffect, useState } from "react"

type ScrollState = {
  y: number
  /** Past the threshold — used to condense the sticky header. */
  isScrolled: boolean
  /** "up" reveals the header, "down" hides it. */
  direction: "up" | "down"
}

export function useScrollPosition(threshold = 24): ScrollState {
  const [state, setState] = useState<ScrollState>({
    y: 0,
    isScrolled: false,
    direction: "up",
  })

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      const y = window.scrollY
      setState({
        y,
        isScrolled: y > threshold,
        direction: y > lastY && y > 96 ? "down" : "up",
      })
      lastY = y
      frame = 0
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold])

  return state
}

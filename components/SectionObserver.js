"use client"

import { useEffect, useRef } from "react"

/* Per-section accent color for the entry sweep line */
const SWEEP_COLORS = [
  "#60a5fa", /* skills       → blue   */
  "#a78bfa", /* experience   → purple */
  "#22d3ee", /* case-studies → cyan   */
  "#34d399", /* other-proj   → green  */
  "#f59e0b", /* ai-approach  → amber  */
  "#e879f9", /* education    → pink   */
  "#f97316", /* certs        → orange */
  "#60a5fa", /* contact      → blue   */
]

export default function SectionObserver() {
  const lastY = useRef(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    lastY.current = window.scrollY

    const sections = Array.from(document.querySelectorAll("section[id]")).filter(
      (s) => s.id !== "hero"
    )
    if (!sections.length) return

    /* ── Classify each section on mount ───────────────────── */
    sections.forEach((s) => {
      const r = s.getBoundingClientRect()
      if (r.top >= window.innerHeight) {
        s.classList.add("sec-from-bottom")   /* below viewport */
      } else if (r.bottom <= 0) {
        s.classList.add("sec-from-top")      /* above viewport */
      } else {
        s.classList.add("sec-visible")       /* already in view */
      }
    })

    /* ── IntersectionObserver ─────────────────────────────── */
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          /* Only act on entering, and only once per section */
          if (!e.isIntersecting || e.target.classList.contains("sec-visible")) return

          const scrollingDown = window.scrollY >= lastY.current

          /* Reveal the section */
          e.target.classList.remove("sec-from-bottom", "sec-from-top")
          e.target.classList.add("sec-visible")

          /* Inject ephemeral colored sweep line */
          const idx   = sections.indexOf(e.target)
          const color = SWEEP_COLORS[idx % SWEEP_COLORS.length]
          const line  = document.createElement("div")
          line.className = "sec-entry-line"
          line.style.setProperty("--sec-col", color)
          e.target.prepend(line)
          setTimeout(() => { if (line.parentNode) line.remove() }, 1300)
        })

        lastY.current = window.scrollY
      },
      { threshold: 0.07, rootMargin: "0px 0px -60px 0px" }
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return null
}

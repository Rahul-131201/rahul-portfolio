"use client"

import { useEffect } from "react"

/* Alternating entrance directions per section index */
const VARIANTS = ["sec-enter-up", "sec-enter-left", "sec-enter-right"]

export default function SectionObserver() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]")).filter(
      (s) => s.id !== "hero"
    )
    if (!sections.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("sec-visible")
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    )

    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect()
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0
      if (alreadyVisible) {
        /* Already in viewport on load — show immediately without transition */
        s.classList.add("sec-visible")
      } else {
        s.classList.add(VARIANTS[i % VARIANTS.length])
        obs.observe(s)
      }
    })

    return () => obs.disconnect()
  }, [])

  return null
}

"use client"

import { useEffect, useRef } from "react"

// Singleton observer — shared across all sections, zero duplication
let _observer = null
function getObserver() {
  if (typeof window === "undefined") return null
  if (!_observer) {
    _observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-up")
            e.target.style.opacity = "1"
            _observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
  }
  return _observer
}

export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const obs = getObserver()
    if (!obs || !ref.current) return
    const els = ref.current.querySelectorAll(".reveal")
    els.forEach((el) => {
      el.style.opacity = "0"
      obs.observe(el)
    })
    return () => els.forEach((el) => obs.unobserve(el))
  }, [])
  return ref
}

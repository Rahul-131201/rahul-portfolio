"use client"

import { useEffect, useState } from "react"

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className={`fixed bottom-8 right-8 z-[9996] transition-all duration-500 ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}`}>
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(96,165,250,0.18)", animationDuration: "1.8s" }} />
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(167,139,250,0.1)", animationDuration: "1.8s", animationDelay: "0.6s" }} />
      <a
        href="#contact"
        className="relative flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white"
        style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", boxShadow: "0 0 28px rgba(96,165,250,0.45), 0 8px 20px rgba(0,0,0,0.35)" }}
      >
        <span>✉</span>
        <span>Hire Me</span>
      </a>
    </div>
  )
}


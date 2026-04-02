"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px]" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div
        style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #60a5fa, #a78bfa, #22d3ee)", boxShadow: "0 0 10px rgba(96,165,250,0.7), 0 0 20px rgba(96,165,250,0.3)", transition: "width 0.05s linear" }}
      />
    </div>
  )
}

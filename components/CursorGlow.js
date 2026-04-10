"use client"

import { useEffect, useRef } from "react"

export default function CursorGlow() {
  const blobRef = useRef(null)
  const dotRef  = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    // Skip on touch / coarse-pointer devices (mobile)
    if (window.matchMedia("(hover: none)").matches) return

    let tx = 0, ty = 0   // target
    let cx = 0, cy = 0   // current (blob)
    let dx = 0, dy = 0   // current (dot)
    let id

    const onMove = (e) => { tx = e.clientX; ty = e.clientY }
    window.addEventListener("mousemove", onMove, { passive: true })

    const tick = () => {
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07
      dx += (tx - dx) * 0.6
      dy += (ty - dy) * 0.6
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(id)
    }
  }, [])

  return (
    <>
      {/* Large slow-following blob */}
      <div
        ref={blobRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.045) 0%, rgba(167,139,250,0.025) 40%, transparent 70%)",
          filter: "blur(60px)",
          transition: "none",
          willChange: "transform",
        }}
      />
      {/* Small fast dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-2 h-2 rounded-full"
        style={{
          background: "rgba(96,165,250,0.7)",
          boxShadow: "0 0 12px rgba(96,165,250,0.8), 0 0 4px #fff",
          transition: "none",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />
    </>
  )
}

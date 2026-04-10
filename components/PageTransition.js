"use client"

import { useEffect, useRef, useState } from "react"

/* ── Pre-computed hex tick mark endpoints (avoids SSR/client float mismatch) ── */
const HEX_TICKS = [
  { cx: 32,  cy:  3,   ix: 26,   iy:  3    },
  { cx: 57,  cy: 17.5, ix: 54,   iy: 12.30 },
  { cx: 57,  cy: 46.5, ix: 60,   iy: 41.30 },
  { cx: 32,  cy: 61,   ix: 38,   iy: 61    },
  { cx:  7,  cy: 46.5, ix: 10,   iy: 51.70 },
  { cx:  7,  cy: 17.5, ix:  4,   iy: 22.70 },
]

/* ── AI Boot Sequence page-load transition ──────────────────
   Timeline (ms):
     0      – canvas neural net starts fading in
     150    – card scales in
     380    – 2nd boot msg appears
     500    – name chars cascade in
     700    – role starts typing (30 chars × 30ms ≈ 900ms)
     900    – "READY" msg turns green
     1000   – progress bar reaches 100%
     1800   – exit: clip-path iris shrinks to nothing
     2600   – component unmounts
   ──────────────────────────────────────────────────────── */

const BOOT_MSGS = [
  "NEURAL NETWORK ONLINE",
  "LOADING AI ENGINE...",
  "PORTFOLIO READY",
]
const NAME_STR = "RAHUL  RAMANE"
const ROLE_STR = "Gen AI Engineer · QA Automation"

export default function PageTransition() {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  const [progress, setProgress] = useState(0)
  const [msgIdx,   setMsgIdx]   = useState(0)
  const [showName, setShowName] = useState(false)
  const [roleText, setRoleText] = useState("")
  const [exiting,  setExiting]  = useState(false)
  const [done,     setDone]     = useState(false)

  /* ── Neural-network canvas background ─────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    let W = window.innerWidth
    let H = window.innerHeight
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    resize()
    window.addEventListener("resize", resize, { passive: true })

    /* Nodes – wrap-around, slow drift */
    const N = 48
    const nodes = Array.from({ length: N }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.26,
      vy: (Math.random() - 0.5) * 0.26,
      r:  1.4 + Math.random() * 1.6,
    }))

    /* Travelling pulses along edges */
    const pulses = []
    const MAX_D  = 175
    let start = null

    const draw = (ts) => {
      if (!start) start = ts
      const elapsed = (ts - start) / 1000
      ctx.clearRect(0, 0, W, H)

      /* Move nodes */
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy
        if (n.x < -10) n.x = W + 10; else if (n.x > W + 10) n.x = -10
        if (n.y < -10) n.y = H + 10; else if (n.y > H + 10) n.y = -10
      })

      /* Ramp global alpha in over 1s */
      const ga = Math.min(elapsed / 1.0, 1) * 0.52

      /* Edges */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.hypot(dx, dy)
          if (d < MAX_D) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(96,165,250,${ga * (1 - d / MAX_D) * 0.55})`
            ctx.lineWidth = 0.7
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      /* Node dots */
      nodes.forEach((n) => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${ga * 0.82})`
        ctx.fill()
      })

      /* Spawn pulse occasionally */
      if (Math.random() < 0.04 && pulses.length < 12) {
        const i = Math.floor(Math.random() * N)
        const j = Math.floor(Math.random() * N)
        if (i !== j && Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < MAX_D) {
          pulses.push({
            fi: i, ti: j, t: 0,
            dur: 0.40 + Math.random() * 0.30,
            col: Math.random() > 0.5 ? "96,165,250" : "167,139,250",
          })
        }
      }

      /* Draw & advance pulses */
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p  = pulses[k]
        p.t += 1 / 60
        const pr = p.t / p.dur
        if (pr >= 1) { pulses.splice(k, 1); continue }
        const px  = nodes[p.fi].x + (nodes[p.ti].x - nodes[p.fi].x) * pr
        const py  = nodes[p.fi].y + (nodes[p.ti].y - nodes[p.fi].y) * pr
        const pa  = ga * Math.sin(pr * Math.PI) * 2.2
        ctx.beginPath()
        ctx.arc(px, py, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.col},${Math.min(pa, 1)})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  /* ── Sequence timeline ─────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = "hidden"

    /* Progress 0 → 100 over ~1 000 ms */
    let prog = 0
    const progId = setInterval(() => {
      prog = Math.min(prog + 1.5, 100)
      setProgress(Math.round(prog))
      if (prog >= 100) clearInterval(progId)
    }, 15)

    const t_m1   = setTimeout(() => setMsgIdx(1),     380)
    const t_m2   = setTimeout(() => setMsgIdx(2),     900)
    const t_name = setTimeout(() => setShowName(true), 500)

    let ci = 0, typeId
    const t_role = setTimeout(() => {
      typeId = setInterval(() => {
        ci++
        setRoleText(ROLE_STR.slice(0, ci))
        if (ci >= ROLE_STR.length) clearInterval(typeId)
      }, 30)
    }, 700)

    const t_exit = setTimeout(() => setExiting(true), 1900)
    const t_done = setTimeout(() => {
      setDone(true)
      document.body.style.overflow = ""
    }, 2780)

    return () => {
      [progId, typeId].forEach(clearInterval)
      ;[t_m1, t_m2, t_name, t_role, t_exit, t_done].forEach(clearTimeout)
      document.body.style.overflow = ""
    }
  }, [])

  if (done) return null

  return (
    <div
      aria-hidden="true"
      className={`pt-overlay${exiting ? " pt-overlay--exit" : ""}`}
    >
      {/* Animated neural network */}
      <canvas ref={canvasRef} className="pt-canvas" />

      {/* Subtle cyber grid */}
      <div className="pt-grid" />

      {/* Horizontal scan sweep */}
      <div className="pt-scan" />

      {/* ── Centre card ──────────────────────────────────── */}
      <div className="pt-card">

        {/* Circuit hexagon icon */}
        <div className="pt-icon-wrap">
          <svg width="76" height="76" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="ptG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#60a5fa"/>
                <stop offset="50%"  stopColor="#a78bfa"/>
                <stop offset="100%" stopColor="#22d3ee"/>
              </linearGradient>
            </defs>
            {/* Outer hexagon — clockwise rotate */}
            <polygon
              points="32,3 57,17.5 57,46.5 32,61 7,46.5 7,17.5"
              stroke="url(#ptG)" strokeWidth="1.4" fill="none"
              className="pt-hex-cw"
            />
            {/* Inner hexagon — counter-clockwise */}
            <polygon
              points="32,13 46,21 46,37 32,45 18,37 18,21"
              stroke="rgba(167,139,250,0.30)" strokeWidth="0.9" fill="none"
              className="pt-hex-ccw"
            />
            {/* Corner tick marks — static coords prevent SSR/client hydration mismatch */}
            {HEX_TICKS.map(({ cx, cy, ix, iy }, i) => (
              <line key={i} x1={cx} y1={cy} x2={ix} y2={iy}
                stroke="url(#ptG)" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
            ))}
            {/* Neural nodes */}
            <circle cx="32" cy="23" r="2.8" fill="#60a5fa" className="pt-node" style={{animationDelay:"0ms"}}/>
            <circle cx="23" cy="38" r="2.8" fill="#a78bfa" className="pt-node" style={{animationDelay:"530ms"}}/>
            <circle cx="41" cy="38" r="2.8" fill="#22d3ee" className="pt-node" style={{animationDelay:"1060ms"}}/>
            {/* Centre core */}
            <circle cx="32" cy="32" r="5.5" fill="none" stroke="url(#ptG)" strokeWidth="0.9" opacity="0.55"/>
            <circle cx="32" cy="32" r="2.2" fill="#60a5fa" opacity="0.90"/>
            {/* Connectors */}
            <line x1="32" y1="23" x2="32" y2="29.5" stroke="#60a5fa" strokeWidth="0.9" opacity="0.65"/>
            <line x1="32" y1="34.5" x2="23" y2="38"  stroke="#a78bfa" strokeWidth="0.9" opacity="0.65"/>
            <line x1="32" y1="34.5" x2="41" y2="38"  stroke="#22d3ee" strokeWidth="0.9" opacity="0.65"/>
          </svg>
          <div className="pt-icon-halo" />
        </div>

        {/* Boot messages */}
        <div className="pt-msgs" role="status">
          {BOOT_MSGS.map((m, i) => (
            <span
              key={m}
              className={`pt-msg${i <= msgIdx ? " pt-msg--on" : ""}${i === 2 && msgIdx === 2 ? " pt-msg--done" : ""}`}
            >
              <span className="pt-bullet">{i < msgIdx ? "✓" : "›"}</span>
              {m}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="pt-prog-row">
          <div className="pt-prog-track">
            <div className="pt-prog-fill" style={{ width: `${progress}%` }}>
              <div className="pt-prog-sheen" />
            </div>
          </div>
          <span className="pt-prog-pct">{progress}%</span>
        </div>

        {/* Name + role */}
        {showName && (
          <div className="pt-namewrap">
            <div className="pt-heroname" aria-label={NAME_STR}>
              {NAME_STR.split("").map((ch, i) => (
                <span
                  key={i}
                  className="pt-char"
                  style={{ animationDelay: `${i * 48}ms` }}
                >
                  {ch === " " ? "\u2009\u2009" : ch}
                </span>
              ))}
            </div>
            <div className="pt-herorole">
              {roleText}
              <span className="pt-cursor" aria-hidden="true">_</span>
            </div>
            <div className="pt-divider" />
          </div>
        )}

      </div>
    </div>
  )
}

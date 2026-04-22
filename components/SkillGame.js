"use client"

import { useEffect, useRef, useState } from "react"

const DV = (n, f) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${n}/${f}.svg`
const SI = (s, h)  => `https://cdn.simpleicons.org/${s}/${h}`

/* ── Skills: inner orbit = AI/core (fastest), outer = tools (slowest) ── */
const SKILLS = [
  { name: "Python",     src: DV("python",     "python-original"),         color: "#4dabf7" },
  { name: "OpenAI",     src: SI("openai",     "e2e8f0"),                  color: "#e2e8f0" },
  { name: "LangChain",  src: SI("langchain",  "22d3ee"),                  color: "#22d3ee" },
  { name: "JavaScript", src: DV("javascript", "javascript-original"),     color: "#fcc419" },
  { name: "Django",     src: DV("django",     "django-original"),         color: "#51cf66" },
  { name: "Selenium",   src: DV("selenium",   "selenium-original"),       color: "#94d82d" },
  { name: "GitHub",     src: DV("github",     "github-original"),         color: "#cc5de8" },
  { name: "Java",       src: DV("java",       "java-original"),           color: "#ff922b" },
  { name: "Git",        src: DV("git",        "git-original"),            color: "#fa5252" },
  { name: "VS Code",    src: DV("vscode",     "vscode-original"),         color: "#339af0" },
  { name: "Postman",    src: DV("postman",    "postman-original"),        color: "#ff6b35" },
  { name: "GitLab",     src: DV("gitlab",     "gitlab-original"),         color: "#fd7e14" },
]

/* [orbitIndex, startPhase(0-1)] — inner(0)=3, mid(1)=4, outer(2)=5 */
const PLANET_ORBIT = [
  [0, 0 / 3], [0, 1 / 3], [0, 2 / 3],
  [1, 0 / 4], [1, 1 / 4], [1, 2 / 4], [1, 3 / 4],
  [2, 0 / 5], [2, 1 / 5], [2, 2 / 5], [2, 3 / 5], [2, 4 / 5],
]

const ORBIT_SPEED  = [0.65, 0.37, 0.21]   /* rad/sec */
const CANVAS_H     = 500
const PLANET_R     = 22
const CORE_R       = 44
const CAPTURE_DUR  = 800   /* ms for spiral-in */
const CLICK_PAD    = 16

/* ── Pentatonic scale ──────────────────────────────────────── */
const NOTES = [261.63,329.63,392,523.25,659.25,783.99,
               523.25,659.25,783.99,1046.5,1174.66,1318.51]

let _AC = null
const ac = () => {
  if (!_AC) _AC = new (window.AudioContext || window.webkitAudioContext)()
  return _AC
}

function sndHit(i) {
  try {
    const ctx = ac()
    if (ctx.state === "suspended") ctx.resume()
    const f = NOTES[i % NOTES.length]
    const t = ctx.currentTime + 0.025
    ;[
      [f,     "sine",     0.28, 0.46],
      [f*1.5, "sine",     0.11, 0.30],
      [f*2,   "triangle", 0.05, 0.16],
    ].forEach(([freq, type, v, d]) => {
      const g = ctx.createGain()
      g.gain.setValueAtTime(v, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + d)
      g.connect(ctx.destination)
      const o = ctx.createOscillator()
      o.type = type; o.frequency.setValueAtTime(freq, t)
      o.connect(g); o.start(t); o.stop(t + d + 0.05)
    })
  } catch (_) {}
}

function sndWin() {
  try {
    const ctx = ac()
    if (ctx.state === "suspended") ctx.resume()
    ;[523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((f, k) => {
      const t = ctx.currentTime + 0.025 + k * 0.11
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.20, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.55)
      g.connect(ctx.destination)
      const o = ctx.createOscillator()
      o.type = "sine"; o.frequency.setValueAtTime(f, t)
      o.connect(g); o.start(t); o.stop(t + 0.60)
    })
  } catch (_) {}
}

function burst(particles, x, y, color, n = 32) {
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2
    const s = 2.5 + Math.random() * 4.5
    particles.push({ x, y, vx: Math.cos(a)*s, vy: Math.sin(a)*s,
                     r: 2.5 + Math.random()*3, life: 1, color })
  }
}

/* ════════════════════════════════════════════════════════════ */
export default function SkillGame() {
  const canvasRef  = useRef(null)
  const gsRef      = useRef(null)
  const rafRef     = useRef(null)
  const imgsRef    = useRef([])

  const [captured,  setCaptured]  = useState([])
  const [complete,  setComplete]  = useState(false)
  const [imgsReady, setImgsReady] = useState(false)
  const [gameKey,   setGameKey]   = useState(0)

  /* ── Pre-load logos ──────────────────────────────────────── */
  useEffect(() => {
    let n = 0
    imgsRef.current = SKILLS.map(sk => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = img.onerror = () => { if (++n === SKILLS.length) setImgsReady(true) }
      img.src = sk.src
      return img
    })
    try { ac() } catch (_) {}
  }, [])

  /* ── Auto-capture ────────────────────────────────────────── */
  const autoCapture = () => {
    const gs = gsRef.current; if (!gs) return
    const orbiting = gs.planets.filter(p => p.state === "orbiting")
    orbiting.forEach((p, i) => {
      setTimeout(() => {
        if (p.state !== "orbiting") return
        p.state = "capturing"
        p.captureStart  = performance.now()
        p.captureAngle  = p.angle
        p.captureR      = p.orbitR
      }, i * 130)
    })
  }

  /* ── Replay ──────────────────────────────────────────────── */
  const replay = () => {
    setCaptured([]); setComplete(false); setGameKey(k => k + 1)
  }

  /* ── Main game loop ──────────────────────────────────────── */
  useEffect(() => {
    if (!imgsReady) return
    const canvas = canvasRef.current; if (!canvas) return

    const W  = Math.max(canvas.offsetWidth, 300)
    canvas.width  = W
    canvas.height = CANVAS_H

    const C    = { x: W / 2, y: CANVAS_H / 2 }
    const base = Math.min(W / 2 - PLANET_R - 10, CANVAS_H / 2 - PLANET_R - 18)
    const orbitR = [base * 0.27, base * 0.56, base * 0.87]

    /* Stars */
    const stars = Array.from({ length: 110 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * CANVAS_H,
      r:     0.4 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
    }))

    /* Shooting stars state */
    const shoots = []

    /* Planets */
    const planets = SKILLS.map((sk, i) => {
      const [oIdx, phase] = PLANET_ORBIT[i]
      return {
        idx: i, ...sk,
        orbitIdx:      oIdx,
        angle:         phase * Math.PI * 2,
        orbitR:        orbitR[oIdx],
        speed:         ORBIT_SPEED[oIdx],
        state:         "orbiting",
        captureStart:  0,
        captureAngle:  0,
        captureR:      0,
        px: C.x, py: C.y,
      }
    })

    const particles   = []
    const capturedRef = { list: [] }

    let alive  = true
    let lastT  = 0
    let mouseX = -9999, mouseY = -9999

    gsRef.current = { planets, particles, capturedRef, C, orbitR }

    const ctx = canvas.getContext("2d")

    /* ── Pointer ─────────────────────────────────────────── */
    const onMove = e => {
      const r = canvas.getBoundingClientRect()
      mouseX = (e.clientX - r.left) * (W / r.width)
      mouseY = (e.clientY - r.top)  * (CANVAS_H / r.height)
      const near = planets.some(p =>
        p.state === "orbiting" &&
        Math.hypot(mouseX - p.px, mouseY - p.py) < PLANET_R + CLICK_PAD
      )
      canvas.style.cursor = near ? "pointer" : "crosshair"
    }
    const onLeave = () => { mouseX = -9999; mouseY = -9999 }

    const doCapture = (mx, my) => {
      for (const p of planets) {
        if (p.state !== "orbiting") continue
        if (Math.hypot(mx - p.px, my - p.py) > PLANET_R + CLICK_PAD) continue
        p.state         = "capturing"
        p.captureStart  = performance.now()
        p.captureAngle  = p.angle
        p.captureR      = p.orbitR
        break
      }
    }
    const onClickCanvas = e => {
      const r = canvas.getBoundingClientRect()
      doCapture(
        (e.clientX - r.left) * (W / r.width),
        (e.clientY - r.top)  * (CANVAS_H / r.height)
      )
    }
    const onTouch = e => {
      const t = e.changedTouches[0]
      const r = canvas.getBoundingClientRect()
      doCapture(
        (t.clientX - r.left) * (W / r.width),
        (t.clientY - r.top)  * (CANVAS_H / r.height)
      )
    }

    canvas.addEventListener("mousemove",  onMove,        { passive: true })
    canvas.addEventListener("mouseleave", onLeave)
    canvas.addEventListener("click",      onClickCanvas)
    canvas.addEventListener("touchend",   onTouch,       { passive: true })

    /* ── Draw helpers ────────────────────────────────────── */
    const drawStars = (now) => {
      ctx.fillStyle = "#c8d8f0"
      stars.forEach(s => {
        const a = 0.25 + 0.75 * Math.abs(Math.sin(now / 2200 + s.phase))
        ctx.globalAlpha = a * 0.55
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill()
      })
      ctx.globalAlpha = 1

      /* Shooting stars */
      if (Math.random() < 0.003)
        shoots.push({
          x: Math.random() * W, y: Math.random() * CANVAS_H * 0.4,
          vx: 3.5 + Math.random() * 3, vy: 1 + Math.random() * 2, life: 1,
        })
      ctx.lineWidth = 1.4; ctx.strokeStyle = "#ffffff"
      for (let k = shoots.length - 1; k >= 0; k--) {
        const sh = shoots[k]
        ctx.globalAlpha = sh.life * 0.60
        ctx.beginPath()
        ctx.moveTo(sh.x, sh.y)
        ctx.lineTo(sh.x - sh.vx * 16, sh.y - sh.vy * 16)
        ctx.stroke()
        sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.055
        if (sh.life <= 0 || sh.x > W) shoots.splice(k, 1)
      }
      ctx.globalAlpha = 1
    }

    const drawOrbits = () => {
      ctx.setLineDash([3, 9])
      orbitR.forEach((r, oi) => {
        const nCap   = planets.filter(p => p.orbitIdx === oi && p.state === "captured").length
        const nTotal = PLANET_ORBIT.filter(([idx]) => idx === oi).length
        const glow   = 0.06 + (nCap / nTotal) * 0.24
        ctx.beginPath(); ctx.arc(C.x, C.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(96,165,250,${glow})`
        ctx.lineWidth   = nCap > 0 ? 1.2 : 0.6
        ctx.stroke()
      })
      ctx.setLineDash([])
    }

    const drawCore = (now) => {
      /* Outer halos */
      ;[120, 88, 64].forEach((r, k) => {
        const g  = ctx.createRadialGradient(C.x, C.y, 0, C.x, C.y, r)
        const as = [[0.03, 0.02], [0.07, 0.04], [0.14, 0.08]][k]
        g.addColorStop(0,   `rgba(110,170,255,${as[1] * 3})`)
        g.addColorStop(0.5, `rgba(140,100,220,${as[0]})`)
        g.addColorStop(1,   "rgba(0,0,0,0)")
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(C.x, C.y, r, 0, Math.PI * 2); ctx.fill()
      })

      /* Pulsing rings */
      ;[0, 0.33, 0.66].forEach(off => {
        const t  = ((now / 1700) + off) % 1
        const rr = CORE_R + t * 48
        ctx.beginPath(); ctx.arc(C.x, C.y, rr, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(96,165,250,${(1 - t) * 0.55})`
        ctx.lineWidth   = 1.8; ctx.stroke()
      })

      /* Core sphere */
      ctx.shadowColor = "#80d0ff"; ctx.shadowBlur = 40
      const cg = ctx.createRadialGradient(C.x - 15, C.y - 15, 0, C.x, C.y, CORE_R)
      cg.addColorStop(0,    "#d8eeff")
      cg.addColorStop(0.30, "#60a5fa")
      cg.addColorStop(0.65, "#7c3aed")
      cg.addColorStop(1,    "#14022e")
      ctx.beginPath(); ctx.arc(C.x, C.y, CORE_R, 0, Math.PI * 2)
      ctx.fillStyle = cg; ctx.fill()
      ctx.shadowBlur = 0

      /* Labels */
      ctx.textAlign = "center"; ctx.textBaseline = "middle"
      ctx.fillStyle = "rgba(255,255,255,0.95)"
      ctx.font      = "bold 15px system-ui"
      ctx.fillText("AI", C.x, C.y - 5)
      ctx.fillStyle = "rgba(180,220,255,0.52)"
      ctx.font      = "500 7.5px system-ui"
      ctx.fillText("CORE", C.x, C.y + 9)
    }

    const drawPlanet = (p, now, dt) => {
      if (p.state === "captured") return

      let px, py, sc = 1, al = 1

      if (p.state === "orbiting") {
        p.angle += p.speed * dt
        px = C.x + Math.cos(p.angle) * p.orbitR
        py = C.y + Math.sin(p.angle) * p.orbitR
        p.px = px; p.py = py

        /* Hover: glow ring + faint tether line */
        if (Math.hypot(mouseX - px, mouseY - py) < PLANET_R + CLICK_PAD) {
          ctx.beginPath(); ctx.arc(px, py, PLANET_R + 10, 0, Math.PI * 2)
          ctx.strokeStyle = p.color + "55"; ctx.lineWidth = 2.0; ctx.stroke()
          ctx.setLineDash([3, 6])
          ctx.strokeStyle = p.color + "28"; ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo((px + C.x) / 2, (py + C.y) / 2)
          ctx.stroke(); ctx.setLineDash([])
        }
      } else {
        /* Spiral capture: keep spinning faster as radius shrinks */
        const prog = Math.min((now - p.captureStart) / CAPTURE_DUR, 1)
        const ease = 1 - Math.pow(1 - prog, 2.4)
        p.captureAngle += p.speed * dt * (1 + ease * 6)  /* spin up */
        const curR = p.captureR * (1 - ease)
        px = C.x + Math.cos(p.captureAngle) * curR
        py = C.y + Math.sin(p.captureAngle) * curR
        sc = 1 - ease * 0.85
        al = 1 - ease * 0.40

        if (prog >= 1) {
          p.state = "captured"
          burst(particles, C.x, C.y, p.color)
          sndHit(p.idx)
          capturedRef.list.push(p.idx)
          setCaptured([...capturedRef.list])
          if (capturedRef.list.length === SKILLS.length)
            setTimeout(() => { setComplete(true); sndWin() }, 180)
          return
        }
      }

      ctx.save()
      ctx.globalAlpha = al
      ctx.translate(px, py); ctx.scale(sc, sc)

      /* Glow */
      ctx.shadowColor = p.color; ctx.shadowBlur = 22

      /* Sphere body */
      const pg = ctx.createRadialGradient(-7, -7, 0, 0, 0, PLANET_R)
      pg.addColorStop(0,    "rgba(255,255,255,0.42)")
      pg.addColorStop(0.42, p.color + "cc")
      pg.addColorStop(1,    p.color + "33")
      ctx.beginPath(); ctx.arc(0, 0, PLANET_R, 0, Math.PI * 2)
      ctx.fillStyle = pg; ctx.fill()
      ctx.strokeStyle = p.color; ctx.lineWidth = 1.5; ctx.stroke()
      ctx.shadowBlur = 0

      /* Logo */
      const img = imgsRef.current[p.idx]
      if (img?.complete && img.naturalWidth > 0) {
        const s = PLANET_R * 1.12
        ctx.drawImage(img, -s / 2, -s / 2, s, s)
      } else {
        ctx.fillStyle = "#fff"; ctx.font = "bold 9px system-ui"
        ctx.textAlign = "center"; ctx.textBaseline = "middle"
        ctx.fillText(p.name.slice(0, 2).toUpperCase(), 0, 0)
      }

      /* Name label — only while orbiting */
      if (p.state === "orbiting") {
        ctx.shadowBlur    = 0
        ctx.globalAlpha   = 0.82
        ctx.fillStyle     = "rgba(210,228,255,0.85)"
        ctx.font          = "600 9.5px system-ui"
        ctx.textAlign     = "center"; ctx.textBaseline = "top"
        ctx.fillText(p.name, 0, PLANET_R + 5)
      }

      ctx.restore()
    }

    const drawParticles = () => {
      ctx.save()
      particles.forEach(p => {
        if (p.life <= 0) return
        ctx.globalAlpha = p.life * 0.88
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.2, p.r * p.life), 0, Math.PI * 2)
        ctx.fillStyle = p.color; ctx.fill()
      })
      ctx.restore()
    }

    /* ── Tick ────────────────────────────────────────────── */
    const tick = (now) => {
      if (!alive) return
      rafRef.current = requestAnimationFrame(tick)
      const dt = Math.min((now - lastT) / 1000, 0.05)
      lastT = now; if (dt <= 0) return

      ctx.clearRect(0, 0, W, CANVAS_H)
      drawStars(now)
      drawOrbits()
      drawCore(now)
      planets.forEach(p => drawPlanet(p, now, dt))

      /* Advance + prune particles */
      for (let k = particles.length - 1; k >= 0; k--) {
        const p = particles[k]
        p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life -= 0.022
        if (p.life <= 0) particles.splice(k, 1)
      }
      drawParticles()
    }

    requestAnimationFrame(t => { lastT = t; tick(t) })

    /* ── Resize ──────────────────────────────────────────── */
    const onResize = () => {
      const W2 = canvas.offsetWidth; if (W2 === W) return
      canvas.width = W2
      gsRef.current.C.x = W2 / 2
      const b2 = Math.min(W2 / 2 - PLANET_R - 10, CANVAS_H / 2 - PLANET_R - 18)
      const r2 = [b2 * 0.27, b2 * 0.56, b2 * 0.87]
      gsRef.current.orbitR = r2
      planets.forEach(p => { p.orbitR = r2[p.orbitIdx] })
    }
    window.addEventListener("resize", onResize, { passive: true })

    return () => {
      alive = false
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener("mousemove",  onMove)
      canvas.removeEventListener("mouseleave", onLeave)
      canvas.removeEventListener("click",      onClickCanvas)
      canvas.removeEventListener("touchend",   onTouch)
      window.removeEventListener("resize",     onResize)
    }
  }, [imgsReady, gameKey])

  /* ══ JSX ══════════════════════════════════════════════════ */
  return (
    <div style={{ width: "100%", userSelect: "none" }}>

      {/* Header bar */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: 10, minHeight: 28,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontFamily: "'Courier New',monospace", fontSize: 10,
            letterSpacing: "0.20em", color: "#60a5fa",
            textTransform: "uppercase",
          }}>
            Skill Solar System
          </span>
          {captured.length > 0 && (
            <span style={{
              fontFamily: "monospace", fontSize: 10,
              color: "rgba(96,165,250,0.45)",
            }}>
              {captured.length} / {SKILLS.length} orbits collapsed
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {!complete && (
            <button onClick={autoCapture} style={{
              background: "transparent",
              border: "1px solid rgba(96,165,250,0.28)",
              color: "rgba(96,165,250,0.72)",
              padding: "4px 13px", borderRadius: 7, cursor: "pointer",
              fontSize: 9, fontFamily: "monospace",
              letterSpacing: "0.14em", textTransform: "uppercase",
            }}>
              Auto-Capture
            </button>
          )}
          {complete && (
            <button onClick={replay} style={{
              background: "rgba(52,211,153,0.10)",
              border: "1px solid rgba(52,211,153,0.38)",
              color: "#34d399",
              padding: "4px 13px", borderRadius: 7, cursor: "pointer",
              fontSize: 9, fontFamily: "monospace",
              letterSpacing: "0.14em", textTransform: "uppercase",
            }}>
              ↺ Replay
            </button>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div style={{ position: "relative", width: "100%" }}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%", height: CANVAS_H, display: "block",
            cursor: "crosshair", borderRadius: 14,
            border: "1px solid rgba(96,165,250,0.07)",
            background:
              "radial-gradient(ellipse at 50% 52%, #060d24 0%, #020617 60%, #060212 100%)",
          }}
        />

        {/* Complete overlay */}
        {complete && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: 14,
            background: "rgba(2,6,23,0.62)", backdropFilter: "blur(4px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 14, pointerEvents: "none",
          }}>
            <div style={{ fontSize: 54, lineHeight: 1 }}>🌟</div>
            <div style={{
              fontSize: "clamp(16px,3vw,22px)", fontWeight: 800,
              color: "#f1f5f9", letterSpacing: "0.06em",
            }}>
              All Skills Captured
            </div>
            <div style={{
              fontFamily: "monospace", fontSize: 10.5,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(96,165,250,0.55)",
            }}>
              12 / 12 orbits collapsed · AI core at 100%
            </div>
          </div>
        )}
      </div>

      {/* Hint */}
      {captured.length === 0 && (
        <p style={{
          textAlign: "center", marginTop: 10,
          fontFamily: "monospace", fontSize: 10,
          color: "rgba(96,165,250,0.35)", letterSpacing: "0.14em",
        }}>
          Click any orbiting skill planet to pull it into the AI Core
        </p>
      )}

      {/* Captured chips */}
      {captured.length > 0 && (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8,
          marginTop: 16, justifyContent: "center",
        }}>
          {captured.map(idx => (
            <div key={idx} className="sg-chip" style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "5px 12px",
              background: SKILLS[idx].color + "14",
              border: `1px solid ${SKILLS[idx].color}40`,
              borderRadius: 9,
            }}>
              <img
                src={SKILLS[idx].src} width={18} height={18}
                alt={SKILLS[idx].name}
                style={{
                  objectFit: "contain",
                  filter: `drop-shadow(0 0 4px ${SKILLS[idx].color}aa)`,
                }}
              />
              <span style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.06em", color: SKILLS[idx].color,
              }}>
                {SKILLS[idx].name}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

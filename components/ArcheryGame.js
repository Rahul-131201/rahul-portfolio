"use client"

import { useEffect, useRef, useState } from "react"

const DV = (n, f) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${n}/${f}.svg`
const SI = (s, h)  => `https://cdn.simpleicons.org/${s}/${h}`

const SKILLS = [
  /* ── Core Expertise ─────────────────────────────────── */
  { name: "Generative AI",    src: SI("googlegemini", "8E75B2"), color: "#8E75B2" },
  { name: "Prompt Eng.",      src: SI("huggingface", "FFD21E"), color: "#FFD21E" },
  { name: "AI Frameworks",    src: SI("langchain",    "22d3ee"), color: "#22d3ee" },
  /* ── Engineering ────────────────────────────────────── */
  { name: "Python",           src: DV("python",      "python-original"),      color: "#4dabf7" },
  { name: "Java",             src: DV("java",        "java-original"),        color: "#ff922b" },
  { name: "JavaScript",       src: DV("javascript",  "javascript-original"),  color: "#fcc419" },
  { name: "Django",           src: DV("django",      "django-plain"),         color: "#51cf66" },
  { name: "REST APIs",        src: SI("swagger",     "85ea2d"),               color: "#85ea2d" },
  /* ── Testing & Automation ───────────────────────────── */
  { name: "Selenium",         src: DV("selenium",    "selenium-original"),    color: "#94d82d" },
  { name: "API Testing",      src: DV("postman",     "postman-original"),     color: "#ff6b35" },
  { name: "Cucumber",         src: DV("cucumber",    "cucumber-plain"),       color: "#23d96c" },
  { name: "TestNG",           src: DV("junit",       "junit-original"),       color: "#e53e3e" },
  { name: "Playwright",       src: DV("playwright",  "playwright-original"),  color: "#2EAD33" },
  /* ── AI Tooling ─────────────────────────────────────── */
  { name: "GitHub Copilot",   src: DV("github",      "github-original"),      color: "#cc5de8" },
  { name: "GitLab Duo",       src: DV("gitlab",      "gitlab-original"),      color: "#fd7e14" },
  { name: "LLM APIs",         src: SI("anthropic",   "CC785C"),               color: "#CC785C" },
  { name: "Claude",           src: SI("claude",      "D97757"),               color: "#D97757" },
]

const TGT_R  = 50    /* target radius px   */
const ARR_MS = 600   /* arrow flight ms    */
const SCR_MS = 1600  /* score display ms   */

/* ── Audio ─────────────────────────────────────────────────── */
let _AC = null
const getAC = () => {
  if (!_AC) _AC = new (window.AudioContext || window.webkitAudioContext)()
  return _AC
}
function playNote(f, type, vol, dur, when) {
  try {
    const ctx = getAC()
    if (ctx.state === "suspended") ctx.resume()
    const t = when ?? ctx.currentTime + 0.022
    const g = ctx.createGain()
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + dur)
    g.connect(ctx.destination)
    const o = ctx.createOscillator()
    o.type = type; o.frequency.setValueAtTime(f, t)
    o.connect(g); o.start(t); o.stop(t + dur + 0.05)
  } catch (_) {}
}
function playHit(zone) {
  const freqs = { bull:880, inner:659, mid:523, outer:440, edge:349, miss:195 }
  const f = freqs[zone] || 330
  playNote(f, "sine", 0.30, 0.44)
  if (zone !== "miss") playNote(f * 1.5, "sine", 0.11, 0.28)
}
function playWin() {
  const ctx = getAC(); if (!ctx) return
  if (ctx.state === "suspended") ctx.resume()
  ;[523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((f, k) => {
    playNote(f, "sine", 0.22, 0.55, ctx.currentTime + 0.022 + k * 0.13)
  })
}

/* ── Particles ──────────────────────────────────────────────── */
function burst(pts, cx, cy, col, n = 28) {
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2, s = 2.5 + Math.random() * 5.5
    pts.push({ x: cx, y: cy, vx: Math.cos(a)*s, vy: Math.sin(a)*s,
               r: 2 + Math.random() * 3.2, life: 1, col })
  }
}

/* ── Hit evaluation ─────────────────────────────────────────── */
function evalHit(dx, dy) {
  const d = Math.hypot(dx, dy)
  if (d < TGT_R * 0.20) return { zone:"bull",  label:"BULLSEYE!", color:"#fcd34d", pts:10 }
  if (d < TGT_R * 0.40) return { zone:"inner", label:"INNER 10!", color:"#f87171", pts:8  }
  if (d < TGT_R * 0.60) return { zone:"mid",   label:"GOOD!",     color:"#60a5fa", pts:6  }
  if (d < TGT_R * 0.90) return { zone:"outer", label:"HIT!",      color:"#cbd5e1", pts:4  }
  if (d < TGT_R * 1.30) return { zone:"edge",  label:"EDGE!",     color:"#94a3b8", pts:2  }
  return                        { zone:"miss",  label:"MISS!",     color:"#f87171", pts:0  }
}

/* ══════════════════════════════════════════════════════════════ */
export default function ArcheryGame({ onClose }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const gsRef     = useRef(null)

  const [revealed, setRevealed] = useState([])

  /* Pre-load logos */
  useEffect(() => {
    SKILLS.forEach(sk => {
      const img = new Image(); img.crossOrigin = "anonymous"; img.src = sk.src
    })
    try { getAC() } catch (_) {}
  }, [])

  /* Escape key */
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [onClose])

  /* ── Game loop ──────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    let innerCleanup = () => {}

    const initRaf = requestAnimationFrame(() => {
    const W = canvas.getBoundingClientRect().width || canvas.offsetWidth || 840, H = 400
    canvas.width = W; canvas.height = H
    const ctx = canvas.getContext("2d")

    /* Layout */
    const GY    = Math.round(H * 0.63)            /* ground line Y     */
    const ARCHX = Math.round(W * 0.12)            /* archer center X   */
    const TGTCX = Math.round(W * 0.60)            /* target osc center */
    const TGTAMP= Math.round(W * 0.17)            /* target osc range  */
    const TGTY  = Math.round(H * 0.36)            /* target center Y   */
    const GGW   = Math.min(220, W * 0.30)         /* gauge width       */
    const GGXL  = (W - GGW) / 2                   /* gauge left edge   */
    const GGYT  = H - 28                           /* gauge top Y       */

    /* Static stars */
    const STARS = Array.from({ length: 68 }, () => ({
      x: Math.random() * W, y: Math.random() * GY * 0.84,
      r: 0.4 + Math.random() * 1.6, p: Math.random() * Math.PI * 2,
    }))

    /* Mountain silhouette points */
    const MNTS = [
      [0.00, 0.88], [0.08, 0.75], [0.18, 0.67], [0.30, 0.79],
      [0.42, 0.68], [0.55, 0.74], [0.66, 0.63], [0.78, 0.72],
      [0.90, 0.68], [1.00, 0.80], [1.00, 1.00], [0.00, 1.00],
    ].map(([xf, yf]) => [xf * W, yf * GY])

    /* Game state */
    const gs = {
      phase:      "waiting", /* waiting | drawing | flying | scored | miss | complete */
      needleNorm: 0.5,       /* 0=left miss, 0.5=center perfect, 1=right miss */
      drawPower:  0,
      arrowStart: { x: 0, y: 0 },
      arrowEnd:   { x: 0, y: 0 },
      arrowFDx:   0, arrowFDy: 0,
      arrowT:     0,
      particles:  [],
      revealedSet:  new Set(),
      revealedList: [],
      scoreText:  "", scoreColor: "#fff",
      scoreTimer: 0,
      stuckArrows: [],
      tgtX:       TGTCX,
      pendingWin:  false,
    }
    gsRef.current = gs

    /* ── Input ────────────────────────────────────────────────── */
    const onDown = () => {
      if (gs.phase !== "waiting") return
      try { getAC().resume() } catch (_) {}
      gs.phase = "drawing"; gs.drawPower = 0
    }
    const onUp = () => {
      if (gs.phase !== "drawing") return
      const dev = Math.abs(gs.needleNorm - 0.5) * 2  /* 0=perfect, 1=edge */
      const hitDist  = dev * TGT_R * 2.15
      const hitAngle = Math.random() * Math.PI * 2
      gs.arrowFDx = Math.cos(hitAngle) * hitDist
      gs.arrowFDy = Math.sin(hitAngle) * hitDist * 0.38
      gs.arrowStart = { x: ARCHX + 60, y: GY - 50 }
      gs.arrowEnd   = { x: gs.tgtX, y: TGTY }
      gs.arrowT     = 0
      gs.phase      = "flying"
    }

    const onTouchStart = e => { e.preventDefault(); onDown() }
    const onTouchEnd   = e => { e.preventDefault(); onUp()   }

    canvas.addEventListener("mousedown",  onDown)
    window.addEventListener("mouseup",    onUp)
    canvas.addEventListener("touchstart", onTouchStart, { passive: false })
    canvas.addEventListener("touchend",   onTouchEnd,   { passive: false })

    /* ── Draw: Background ─────────────────────────────────────── */
    function drawBg(now) {
      const sky = ctx.createLinearGradient(0, 0, 0, GY)
      sky.addColorStop(0,   "#050b1c")
      sky.addColorStop(0.6, "#0b1732")
      sky.addColorStop(1,   "#0f1f3c")
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, GY)

      /* Stars */
      STARS.forEach(s => {
        const a = (0.28 + 0.72 * Math.abs(Math.sin(now / 2500 + s.p))) * 0.65
        ctx.globalAlpha = a
        ctx.fillStyle = "#cce0ff"
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill()
      })
      ctx.globalAlpha = 1

      /* Moon */
      const mx = W * 0.83, my = H * 0.11
      ctx.shadowColor = "rgba(190,215,255,0.60)"; ctx.shadowBlur = 30
      const mg = ctx.createRadialGradient(mx - 7, my - 7, 2, mx, my, 26)
      mg.addColorStop(0, "#eaf2ff"); mg.addColorStop(1, "rgba(160,195,255,0.10)")
      ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(mx, my, 24, 0, Math.PI * 2); ctx.fill()
      ctx.shadowBlur = 0

      /* Mountains */
      ctx.fillStyle = "#080e22"
      ctx.beginPath()
      MNTS.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
      ctx.closePath(); ctx.fill()

      /* Ground */
      const grd = ctx.createLinearGradient(0, GY, 0, H)
      grd.addColorStop(0,   "#183212")
      grd.addColorStop(0.4, "#1a3a12")
      grd.addColorStop(1,   "#112a0e")
      ctx.fillStyle = grd; ctx.fillRect(0, GY, W, H - GY)
      ctx.fillStyle = "rgba(44,100,24,0.55)"; ctx.fillRect(0, GY, W, 4)

      /* Stone path */
      ctx.fillStyle = "#242434"; ctx.fillRect(0, GY + 14, W, 20)
      ctx.fillStyle = "rgba(50,50,70,0.55)"
      for (let x = 18; x < W; x += 46) ctx.fillRect(x, GY + 16, 36, 16)
    }

    /* ── Draw: Trees ──────────────────────────────────────────── */
    function drawTrees() {
      const pine = (tx, base, h) => {
        const lw = h * 0.38
        for (let l = 0; l < 4; l++) {
          const ly = base - h * (0.24 + (l / 4) * 0.76)
          const lwr = lw * (1 - l / 4 * 0.50)
          const d = 14 + l * 5
          ctx.fillStyle = `rgb(${d},${30 + l * 3},${d - 2})`
          ctx.beginPath()
          ctx.moveTo(tx, ly - lwr * 0.52)
          ctx.lineTo(tx + lwr, ly + lwr * 0.28)
          ctx.lineTo(tx - lwr, ly + lwr * 0.28)
          ctx.closePath(); ctx.fill()
        }
        ctx.fillStyle = "#3a2010"; ctx.fillRect(tx - 4, base - h * 0.24, 8, h * 0.25)
      }
      pine(W * 0.03, GY, 138); pine(W * 0.08, GY, 110)
      pine(W * 0.93, GY, 128); pine(W * 0.97, GY, 102)
    }

    /* ── Draw: Olympic Target ─────────────────────────────────── */
    function drawTarget(tx, ty) {
      /* Wooden stand */
      ctx.fillStyle = "#6b4422"; ctx.fillRect(tx - 5, ty, 10, GY - ty)
      ctx.fillStyle = "#4a2f15"; ctx.fillRect(tx - 22, GY - 10, 44, 11)

      /* Rings outside → inside: white, black, blue, red, gold */
      const RINGS = [
        [TGT_R,       "#f5f5ee"],
        [TGT_R * .80, "#1a1a1a"],
        [TGT_R * .60, "#1e72c0"],
        [TGT_R * .40, "#d03030"],
        [TGT_R * .20, "#e9cb30"],
      ]
      RINGS.forEach(([r, col]) => {
        if (col === "#e9cb30") { ctx.shadowColor = "#f5de50"; ctx.shadowBlur = 14 }
        ctx.beginPath(); ctx.arc(tx, ty, r, 0, Math.PI * 2)
        ctx.fillStyle = col; ctx.fill()
        ctx.strokeStyle = "rgba(0,0,0,0.16)"; ctx.lineWidth = 1.2; ctx.stroke()
        ctx.shadowBlur = 0
      })
      ctx.beginPath(); ctx.arc(tx, ty, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255,255,255,0.90)"; ctx.fill()
    }

    /* ── Draw: Archer ─────────────────────────────────────────── */
    function drawArcher(t, phase, power) {
      const bob  = Math.sin(t * 1.5) * 2.2
      const bx   = ARCHX
      const by   = GY           /* feet level */
      const pull = phase === "drawing" ? power * 18 : 0

      /* Shadow ellipse */
      ctx.fillStyle = "rgba(0,0,0,0.22)"
      ctx.beginPath(); ctx.ellipse(bx, by, 20, 5, 0, 0, Math.PI * 2); ctx.fill()

      /* Boots */
      ctx.fillStyle = "#3a2010"
      ctx.fillRect(bx - 12, by - 5 + bob, 12, 6)
      ctx.fillRect(bx +  1, by - 5 + bob, 12, 6)

      /* Legs */
      ctx.fillStyle = "#1e2e52"
      ctx.fillRect(bx - 10, by - 26 + bob, 9, 22)
      ctx.fillRect(bx +  2, by - 26 + bob, 9, 22)

      /* Tunic */
      ctx.fillStyle = "#2a4a8a"
      ctx.fillRect(bx - 11, by - 58 + bob, 22, 34)

      /* Belt */
      ctx.fillStyle = "#8b5e3c"
      ctx.fillRect(bx - 12, by - 28 + bob, 24, 5)

      /* Bow arm (extends right toward target) */
      ctx.strokeStyle = "#f0c888"; ctx.lineWidth = 7; ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(bx + 10, by - 50 + bob)
      ctx.lineTo(bx + 36, by - 50 + bob)
      ctx.stroke()

      /* Draw arm (pulls string back) */
      ctx.beginPath()
      ctx.moveTo(bx - 4, by - 50 + bob)
      ctx.lineTo(bx - 18 - pull, by - 48 + bob)
      ctx.stroke()

      /* Head */
      ctx.fillStyle = "#f0c888"
      ctx.beginPath(); ctx.arc(bx, by - 70 + bob, 11, 0, Math.PI * 2); ctx.fill()

      /* Hair */
      ctx.fillStyle = "#3a2510"
      ctx.beginPath(); ctx.arc(bx, by - 70 + bob, 11, Math.PI, 0); ctx.fill()

      /* Eye */
      ctx.fillStyle = "#1a1a1a"
      ctx.beginPath(); ctx.arc(bx + 8, by - 70 + bob, 2.2, 0, Math.PI * 2); ctx.fill()

      /* Bow stave: ")" arc at (bx+36, by-50), opens to the right */
      const bowX  = bx + 36, bowY = by - 50 + bob, bowR = 24
      ctx.strokeStyle = "#9b6e3c"; ctx.lineWidth = 5; ctx.lineCap = "round"
      ctx.beginPath()
      ctx.arc(bowX, bowY, bowR, -Math.PI / 2 - 0.30, Math.PI / 2 + 0.30, false)
      ctx.stroke()

      /* Bowstring: from bow top → draw hand → bow bottom */
      const strTop = { x: bowX, y: bowY - bowR }
      const strBot = { x: bowX, y: bowY + bowR }
      const drawHx = bx - 18 - pull, drawHy = by - 48 + bob
      ctx.strokeStyle = "rgba(240,220,160,0.88)"; ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.moveTo(strTop.x, strTop.y)
      ctx.quadraticCurveTo(drawHx, drawHy, strBot.x, strBot.y)
      ctx.stroke()

      /* Arrow (only visible when waiting or drawing) */
      if (phase === "waiting" || phase === "drawing") {
        const arrowTipX = bowX + bowR + 10, arrowY = by - 50 + bob
        ctx.strokeStyle = "#c8a040"; ctx.lineWidth = 2.6; ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(drawHx, arrowY)
        ctx.lineTo(arrowTipX, arrowY)
        ctx.stroke()
        /* Arrowhead */
        ctx.fillStyle = "#909090"
        ctx.beginPath()
        ctx.moveTo(arrowTipX + 5, arrowY)
        ctx.lineTo(arrowTipX - 1, arrowY - 3)
        ctx.lineTo(arrowTipX - 1, arrowY + 3)
        ctx.closePath(); ctx.fill()
        /* Fletching */
        ctx.strokeStyle = "#c04030"; ctx.lineWidth = 1.8
        ctx.beginPath(); ctx.moveTo(drawHx + 4, arrowY); ctx.lineTo(drawHx - 6, arrowY - 5); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(drawHx + 4, arrowY); ctx.lineTo(drawHx - 6, arrowY + 5); ctx.stroke()
      }
    }

    /* ── Draw: Flying Arrow ───────────────────────────────────── */
    function drawArrowFlight(start, end, t, fdx, fdy) {
      const sx = start.x, sy = start.y
      const ex = end.x + fdx, ey = end.y + fdy
      const cpx = (sx + ex) / 2, cpy = Math.min(sy, ey) - 68

      const bx2 = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cpx + t * t * ex
      const by2 = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cpy + t * t * ey

      /* Tangent */
      const tdx = 2 * (1 - t) * (cpx - sx) + 2 * t * (ex - cpx)
      const tdy = 2 * (1 - t) * (cpy - sy) + 2 * t * (ey - cpy)
      const ang = Math.atan2(tdy, tdx)

      /* Trail */
      ctx.setLineDash([3, 9])
      ctx.strokeStyle = "rgba(200,165,60,0.26)"; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(sx, sy)
      ctx.quadraticCurveTo(cpx, cpy, bx2, by2)
      ctx.stroke(); ctx.setLineDash([])

      /* Shaft */
      ctx.save(); ctx.translate(bx2, by2); ctx.rotate(ang)
      ctx.strokeStyle = "#c8a040"; ctx.lineWidth = 2.8; ctx.lineCap = "round"
      ctx.beginPath(); ctx.moveTo(-28, 0); ctx.lineTo(2, 0); ctx.stroke()
      /* Tip */
      ctx.fillStyle = "#909090"
      ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(2, -3); ctx.lineTo(2, 3); ctx.closePath(); ctx.fill()
      /* Fletching */
      ctx.strokeStyle = "#c84030"; ctx.lineWidth = 1.8
      ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(-28, -5); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(-28,  5); ctx.stroke()
      ctx.restore()
    }

    /* ── Draw: Stuck arrow in target ─────────────────────────── */
    function drawStuck(tx, ty, dx, dy) {
      const ax = tx + dx, ay = ty + dy
      /* Point arrow back toward where it came from (left/up) */
      const ang = Math.atan2(ay - (TGTY - 70), ax - (ARCHX + 60))
      ctx.save(); ctx.translate(ax, ay); ctx.rotate(ang)
      ctx.strokeStyle = "#a08030"; ctx.lineWidth = 2.2; ctx.lineCap = "round"
      ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(2, 0); ctx.stroke()
      ctx.fillStyle = "#808080"
      ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(1, -2.5); ctx.lineTo(1, 2.5); ctx.closePath(); ctx.fill()
      ctx.strokeStyle = "#a83028"; ctx.lineWidth = 1.6
      ctx.beginPath(); ctx.moveTo(-16, 0); ctx.lineTo(-22, -4); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(-16, 0); ctx.lineTo(-22,  4); ctx.stroke()
      ctx.restore()
    }

    /* ── Draw: Aim Gauge ──────────────────────────────────────── */
    function drawGauge(norm, phase) {
      if (phase === "flying" || phase === "complete") return
      /* Background panel */
      ctx.fillStyle = "rgba(4, 7, 18, 0.80)"
      ctx.fillRect(GGXL - 14, GGYT - 12, GGW + 28, 20)

      /* Colored zones */
      const ZONES = [
        [0.00, 0.18, "#c0392b"],
        [0.18, 0.36, "#e67e22"],
        [0.36, 0.64, "#27ae60"],
        [0.64, 0.82, "#e67e22"],
        [0.82, 1.00, "#c0392b"],
      ]
      ZONES.forEach(([s, e, col]) => {
        ctx.fillStyle = col + "cc"
        ctx.fillRect(GGXL + s * GGW, GGYT, (e - s) * GGW, 7)
      })

      /* Needle */
      const nx = GGXL + norm * GGW
      const isGreen = Math.abs(norm - 0.5) < 0.14
      ctx.fillStyle = "#ffffff"
      ctx.shadowColor = isGreen ? "#4ade80" : "rgba(255,255,255,0.9)"
      ctx.shadowBlur  = isGreen ? 16 : 6
      ctx.fillRect(nx - 2, GGYT - 5, 4, 18)
      ctx.shadowBlur = 0

      /* Label above gauge */
      ctx.textAlign = "center"; ctx.textBaseline = "bottom"
      const msg = phase === "drawing"
        ? (isGreen ? "★  RELEASE NOW!" : "RELEASE TO SHOOT")
        : "CLICK & HOLD TO DRAW"
      ctx.font      = `600 ${isGreen && phase === "drawing" ? "12px" : "9.5px"} system-ui`
      ctx.fillStyle = isGreen ? "#4ade80" : "rgba(148,163,184,0.55)"
      ctx.fillText(msg, GGXL + GGW / 2, GGYT - 7)
    }

    /* ── Tick ─────────────────────────────────────────────────── */
    let lastT = 0, alive = true

    const tick = (now) => {
      if (!alive) return
      rafRef.current = requestAnimationFrame(tick)
      const dt = Math.min((now - lastT) / 1000, 0.05); lastT = now
      const el = now / 1000

      /* Needle — oscillates 0→1 */
      gs.needleNorm = Math.sin(el * 2.8 + 0.5) * 0.5 + 0.5

      /* Target movement — locks when arrow in flight */
      if (gs.phase === "waiting" || gs.phase === "drawing") {
        const sf = 1 + (gs.revealedList.length / SKILLS.length) * 0.65
        gs.tgtX = TGTCX + Math.sin(el * 0.88 * sf) * TGTAMP
      }

      /* Draw power build */
      if (gs.phase === "drawing") gs.drawPower = Math.min(gs.drawPower + dt * 1.7, 1)

      /* Arrow flight */
      if (gs.phase === "flying") {
        gs.arrowT += dt * (1000 / ARR_MS)
        if (gs.arrowT >= 1) {
          gs.arrowT = 1
          const res = evalHit(gs.arrowFDx, gs.arrowFDy)
          gs.stuckArrows.push({ dx: gs.arrowFDx, dy: gs.arrowFDy })
          if (gs.stuckArrows.length > 4) gs.stuckArrows.shift()
          playHit(res.zone)
          gs.scoreText  = res.label
          gs.scoreColor = res.color
          gs.scoreTimer = now
          if (res.pts > 0) {
            const free = SKILLS.map((_, i) => i).filter(i => !gs.revealedSet.has(i))
            if (free.length > 0) {
              const pick = free[Math.floor(Math.random() * free.length)]
              gs.revealedSet.add(pick)
              gs.revealedList.push(pick)
              burst(gs.particles, gs.tgtX + gs.arrowFDx, TGTY + gs.arrowFDy, SKILLS[pick].color)
              setRevealed([...gs.revealedList])
              if (gs.revealedList.length >= SKILLS.length) gs.pendingWin = true
            }
            gs.phase = "scored"
          } else {
            gs.phase = "miss"
          }
        }
      }

      /* Score/miss timer done */
      if ((gs.phase === "scored" || gs.phase === "miss") && now - gs.scoreTimer > SCR_MS) {
        if (gs.pendingWin) { gs.phase = "complete"; playWin() }
        else { gs.phase = "waiting"; gs.drawPower = 0 }
      }

      /* ── Render ─────────────────────────────────────────────── */
      ctx.clearRect(0, 0, W, H)
      drawBg(now)
      drawTrees()

      /* Stuck arrows follow target */
      gs.stuckArrows.forEach(a => drawStuck(gs.tgtX, TGTY, a.dx, a.dy))
      drawTarget(gs.tgtX, TGTY)
      drawArcher(el, gs.phase, gs.drawPower)

      /* Flying arrow */
      if (gs.phase === "flying" ||
          ((gs.phase === "scored" || gs.phase === "miss") && gs.arrowT < 1)) {
        drawArrowFlight(gs.arrowStart, gs.arrowEnd, gs.arrowT, gs.arrowFDx, gs.arrowFDy)
      }

      /* Particles */
      ctx.save()
      for (let k = gs.particles.length - 1; k >= 0; k--) {
        const p = gs.particles[k]
        p.x += p.vx; p.y += p.vy; p.vy += 0.07; p.life -= 0.022
        if (p.life <= 0) { gs.particles.splice(k, 1); continue }
        ctx.globalAlpha = p.life * 0.90
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.1, p.r * p.life), 0, Math.PI * 2)
        ctx.fillStyle = p.col; ctx.fill()
      }
      ctx.restore()

      /* Score popup */
      if (gs.phase === "scored" || gs.phase === "miss") {
        const age = now - gs.scoreTimer
        const al  = age < 250 ? age / 250 : Math.max(0, 1 - (age - 250) / (SCR_MS - 250))
        const yOff= -age * 0.034
        ctx.save(); ctx.globalAlpha = al
        ctx.textAlign = "center"; ctx.textBaseline = "middle"
        ctx.font = `bold 26px system-ui`
        ctx.shadowColor = gs.scoreColor; ctx.shadowBlur = 22
        ctx.fillStyle = gs.scoreColor
        ctx.fillText(gs.scoreText, gs.tgtX, TGTY - 82 + yOff)
        /* Skill name */
        if (gs.phase === "scored" && gs.revealedList.length > 0) {
          const last = SKILLS[gs.revealedList[gs.revealedList.length - 1]]
          ctx.shadowBlur = 0; ctx.font = "600 12.5px system-ui"
          ctx.fillStyle = last.color
          ctx.fillText(`✦ ${last.name} unlocked`, gs.tgtX, TGTY - 56 + yOff)
        }
        ctx.shadowBlur = 0; ctx.restore()
      }

      /* Aim gauge */
      drawGauge(gs.needleNorm, gs.phase)

      /* Progress bar (top strip) */
      const prog = gs.revealedList.length / SKILLS.length
      ctx.fillStyle = "rgba(255,255,255,0.06)"; ctx.fillRect(12, 10, W - 24, 4)
      if (prog > 0) {
        const pb = ctx.createLinearGradient(12, 0, W - 12, 0)
        pb.addColorStop(0, "#60a5fa"); pb.addColorStop(1, "#34d399")
        ctx.fillStyle = pb; ctx.fillRect(12, 10, (W - 24) * prog, 4)
      }
      ctx.fillStyle = "rgba(148,163,184,0.40)"; ctx.textAlign = "left"; ctx.textBaseline = "top"
      ctx.font = "500 8.5px system-ui"
      ctx.fillText(`${gs.revealedList.length} / ${SKILLS.length} skills unlocked`, 14, 18)

      /* Complete overlay */
      if (gs.phase === "complete") {
        ctx.fillStyle = "rgba(2,6,23,0.52)"; ctx.fillRect(0, 0, W, H)
        ctx.textAlign = "center"; ctx.textBaseline = "middle"
        const fz = Math.round(W * 0.050)
        ctx.font = `bold ${fz}px system-ui`
        ctx.shadowColor = "#fcd34d"; ctx.shadowBlur = 32; ctx.fillStyle = "#fcd34d"
        ctx.fillText("🏆 ALL SKILLS UNLOCKED!", W / 2, H / 2 - 18)
        ctx.shadowBlur = 0; ctx.font = "600 14px system-ui"
        ctx.fillStyle = "rgba(148,163,184,0.80)"
        ctx.fillText("All 17 skills revealed — you're a pro!", W / 2, H / 2 + 22)
      }
    }

    requestAnimationFrame(t => { lastT = t; tick(t) })

    const onResize = () => {
      const W2 = canvas.getBoundingClientRect().width || canvas.offsetWidth || 840
      canvas.width = W2; canvas.height = H
    }
    window.addEventListener("resize", onResize, { passive: true })

    innerCleanup = () => {
      alive = false; cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener("mousedown",  onDown)
      window.removeEventListener("mouseup",    onUp)
      canvas.removeEventListener("touchstart", onTouchStart)
      canvas.removeEventListener("touchend",   onTouchEnd)
      window.removeEventListener("resize",     onResize)
    }
    }) // end requestAnimationFrame(init)

    return () => {
      cancelAnimationFrame(initRaf)
      innerCleanup()
    }
  }, [onClose])

  /* ── JSX ──────────────────────────────────────────────────── */
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "rgba(2,6,23,0.88)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        width: "100%", maxWidth: 840,
        background: "linear-gradient(180deg, #090f1e 0%, #050915 100%)",
        border: "1px solid rgba(96,165,250,0.18)", borderRadius: 18, overflow: "hidden",
        boxShadow: "0 0 80px rgba(96,165,250,0.12), 0 30px 80px rgba(0,0,0,0.70)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px", borderBottom: "1px solid rgba(96,165,250,0.10)",
          background: "rgba(96,165,250,0.04)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>🏹</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#f1f5f9", letterSpacing: "0.04em" }}>
                Archery Challenge
              </div>
              <div style={{
                fontFamily: "monospace", fontSize: 9, letterSpacing: "0.15em",
                textTransform: "uppercase", color: "rgba(96,165,250,0.50)", marginTop: 2,
              }}>
                Click &amp; hold → needle enters green zone → release to shoot · each hit unlocks a skill
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(148,163,184,0.72)", width: 34, height: 34, borderRadius: 9,
              cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}
          >✕</button>
        </div>

        {/* Game canvas */}
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: 400, display: "block", cursor: "crosshair" }}
        />

        {/* Revealed skills strip */}
        {revealed.length > 0 && (
          <div style={{
            padding: "11px 18px", borderTop: "1px solid rgba(96,165,250,0.08)",
            background: "rgba(96,165,250,0.03)",
            display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center",
          }}>
            <span style={{
              fontSize: 9, fontFamily: "monospace", letterSpacing: "0.16em",
              textTransform: "uppercase", color: "rgba(96,165,250,0.40)",
              flexShrink: 0, marginRight: 4,
            }}>
              Unlocked:
            </span>
            {revealed.map(idx => (
              <div
                key={idx}
                className="sg-chip"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "4px 10px",
                  background: SKILLS[idx].color + "14",
                  border: `1px solid ${SKILLS[idx].color}38`,
                  borderRadius: 7,
                }}
              >
                <img
                  src={SKILLS[idx].src} width={15} height={15} alt={SKILLS[idx].name}
                  style={{ objectFit: "contain", filter: `drop-shadow(0 0 4px ${SKILLS[idx].color}99)` }}
                />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: SKILLS[idx].color }}>
                  {SKILLS[idx].name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

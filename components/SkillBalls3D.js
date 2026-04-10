"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const DV = (n, f) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${n}/${f}.svg`
const SI = (s, h)  => `https://cdn.simpleicons.org/${s}/${h}`

const LOGOS = [
  { name: "Python",     src: DV("python",     "python-original"),     color: "#4dabf7" },
  { name: "Java",       src: DV("java",       "java-original"),       color: "#ff922b" },
  { name: "JavaScript", src: DV("javascript", "javascript-original"), color: "#fcc419" },
  { name: "Django",     src: DV("django",     "django-original"),     color: "#51cf66" },
  { name: "Selenium",   src: DV("selenium",   "selenium-original"),   color: "#94d82d" },
  { name: "GitHub",     src: DV("github",     "github-original"),     color: "#cc5de8" },
  { name: "GitLab",     src: DV("gitlab",     "gitlab-original"),     color: "#fd7e14" },
  { name: "Git",        src: DV("git",        "git-original"),        color: "#fa5252" },
  { name: "VS Code",    src: DV("vscode",     "vscode-original"),     color: "#339af0" },
  { name: "Postman",    src: DV("postman",    "postman-original"),    color: "#ff6b35" },
  { name: "OpenAI",     src: SI("openai",     "e2e8f0"),              color: "#e2e8f0" },
  { name: "LangChain",  src: SI("langchain",  "22d3ee"),              color: "#22d3ee" },
]

/* ── Physics / visual constants ──────────────────────────── */
const RADIUS      = 0.70
const SPACING     = 1.88
const CAM_Z       = 7.5
const CANVAS_H    = 340
const SPRING      = 4.5
const REPEL_R     = 2.8
const REPEL_F     = 32
const DECAY       = 2.6
const RESTITUTION = 0.52
const MIN_DIST    = RADIUS * 2.05
const BOB_AMP     = 0.11
const BOB_SPEED   = 1.4

/* ── Pentatonic C scale ─────────────────────────────────── */
const NOTES = [
  261.63, 293.66, 329.63, 392.00, 440.00,
  523.25, 587.33, 659.25, 783.99, 880.00,
  1046.50, 1174.66,
]
let _audioCtx = null
let _audioWarmedUp = false

function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return _audioCtx
}

/* Prime the audio graph on first canvas interaction so subsequent
   notes play with zero perceptible latency. */
function warmUpAudio() {
  if (_audioWarmedUp) return
  _audioWarmedUp = true
  try {
    const ctx = getAudioCtx()
    const resume = ctx.state === "suspended" ? ctx.resume() : Promise.resolve()
    resume.then(() => {
      /* Play a completely silent note to force DSP graph compilation */
      const g = ctx.createGain()
      g.gain.setValueAtTime(0, ctx.currentTime)
      g.connect(ctx.destination)
      const o = ctx.createOscillator()
      o.connect(g)
      o.start(ctx.currentTime)
      o.stop(ctx.currentTime + 0.001)
    }).catch(() => {})
  } catch (_) {}
}

function playMarimbaNote(idx, vol = 0.38) {
  try {
    const ctx = getAudioCtx()
    const play = () => {
      /* Schedule 20ms ahead so note is never in the past */
      const now  = ctx.currentTime + 0.02
      const freq = NOTES[Math.min(idx, NOTES.length - 1)]
      const g1 = ctx.createGain()
      g1.gain.setValueAtTime(0, now)
      g1.gain.linearRampToValueAtTime(vol, now + 0.006)
      g1.gain.exponentialRampToValueAtTime(0.001, now + 0.52)
      g1.connect(ctx.destination)
      const o1 = ctx.createOscillator(); o1.type = "sine"
      o1.frequency.setValueAtTime(freq, now); o1.connect(g1); o1.start(now); o1.stop(now + 0.55)
      const g2 = ctx.createGain()
      g2.gain.setValueAtTime(vol * 0.28, now)
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.28)
      g2.connect(ctx.destination)
      const o2 = ctx.createOscillator(); o2.type = "sine"
      o2.frequency.setValueAtTime(freq * 2, now); o2.connect(g2); o2.start(now); o2.stop(now + 0.30)
      const g3 = ctx.createGain()
      g3.gain.setValueAtTime(vol * 0.10, now)
      g3.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
      g3.connect(ctx.destination)
      const o3 = ctx.createOscillator(); o3.type = "triangle"
      o3.frequency.setValueAtTime(freq * 4, now); o3.connect(g3); o3.start(now); o3.stop(now + 0.08)
    }
    /* If context is still suspended (e.g. browser policy), resume first then play */
    if (ctx.state === "suspended") {
      ctx.resume().then(play).catch(() => {})
    } else {
      play()
    }
  } catch (_) {}
}

/* ── Pure neon sphere texture — no logo (chips handle identity) */
function buildSphereTexture(hex) {
  const S   = 256
  const c   = document.createElement("canvas")
  c.width   = c.height = S
  const ctx = c.getContext("2d")

  /* Dark sphere base */
  const base = ctx.createRadialGradient(S * 0.36, S * 0.30, S * 0.01, S / 2, S / 2, S / 2)
  base.addColorStop(0,    "#1e2a48")
  base.addColorStop(0.46, "#0f1620")
  base.addColorStop(0.80, "#070b12")
  base.addColorStop(1,    "#020408")
  ctx.fillStyle = base
  ctx.fillRect(0, 0, S, S)

  /* Brand color glow — center */
  const glow = ctx.createRadialGradient(S * 0.50, S * 0.52, 0, S / 2, S / 2, S * 0.46)
  glow.addColorStop(0,   hex + "55")
  glow.addColorStop(0.5, hex + "1a")
  glow.addColorStop(1,   "transparent")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, S, S)

  /* Sharp specular top-left */
  const hi1 = ctx.createRadialGradient(S * 0.25, S * 0.19, 0, S * 0.28, S * 0.22, S * 0.13)
  hi1.addColorStop(0,    "rgba(255,255,255,0.95)")
  hi1.addColorStop(0.4,  "rgba(255,255,255,0.60)")
  hi1.addColorStop(1,    "rgba(255,255,255,0)")
  ctx.fillStyle = hi1
  ctx.fillRect(0, 0, S, S)

  /* Wide soft glow around specular */
  const hi2 = ctx.createRadialGradient(S * 0.32, S * 0.27, 0, S * 0.34, S * 0.30, S * 0.28)
  hi2.addColorStop(0,   "rgba(255,255,255,0.22)")
  hi2.addColorStop(1,   "rgba(255,255,255,0)")
  ctx.fillStyle = hi2
  ctx.fillRect(0, 0, S, S)

  /* Bottom-right shadow for depth */
  const shd = ctx.createRadialGradient(S * 0.70, S * 0.74, 0, S * 0.64, S * 0.70, S * 0.40)
  shd.addColorStop(0,   "rgba(0,0,0,0.40)")
  shd.addColorStop(1,   "rgba(0,0,0,0)")
  ctx.fillStyle = shd
  ctx.fillRect(0, 0, S, S)

  return new THREE.CanvasTexture(c)
}

/* ── Circle ring geometry ────────────────────────────────── */
function makeCircleGeo(r, segs = 72) {
  const pts = []
  for (let k = 0; k <= segs; k++) {
    const a = (k / segs) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0))
  }
  return new THREE.BufferGeometry().setFromPoints(pts)
}

/* ── Project 3D position → container pixel coords ────────── */
const _ndc = new THREE.Vector3()
function project3D(pos, camera, W, H) {
  _ndc.copy(pos).project(camera)
  return {
    x: (_ndc.x  *  0.5 + 0.5) * W,
    y: (-_ndc.y *  0.5 + 0.5) * H,
  }
}

export default function SkillBalls3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === "undefined") return

    const CW    = container.clientWidth
    const logos = CW < 600 ? LOGOS.slice(0, 6) : LOGOS
    const COUNT = logos.length
    const initX = (i) => (i - (COUNT - 1) / 2) * SPACING

    container.style.position = "relative"

    /* ── HTML chip overlays — logo img + name ───────────── */
    const chips = logos.map((logo) => {
      const wrap = document.createElement("div")
      Object.assign(wrap.style, {
        position:      "absolute",
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        gap:           "4px",
        pointerEvents: "none",
        transform:     "translateX(-50%)",
        willChange:    "transform, top, left",
        zIndex:        "5",
        transition:    "opacity 0.3s ease",
        opacity:       "1",
      })

      /* Logo img — white drop shadow so dark logos show on dark bg */
      const img = document.createElement("img")
      img.src    = logo.src
      img.width  = 26
      img.height = 26
      img.alt    = logo.name
      img.crossOrigin = "anonymous"
      Object.assign(img.style, {
        width:      "26px",
        height:     "26px",
        objectFit:  "contain",
        filter:     `drop-shadow(0 0 5px ${logo.color}cc) drop-shadow(0 1px 3px rgba(0,0,0,0.8))`,
        transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1), filter 0.25s ease",
        flexShrink: "0",
      })
      img.onerror = () => {
        /* Fallback: initials badge */
        img.replaceWith(badge)
      }

      /* Initials fallback badge */
      const badge = document.createElement("span")
      badge.textContent = logo.name.slice(0, 2).toUpperCase()
      Object.assign(badge.style, {
        width:       "26px",
        height:      "26px",
        borderRadius:"6px",
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
        fontSize:    "9px",
        fontWeight:  "900",
        color:       logo.color,
        background:  logo.color + "22",
        border:      `1px solid ${logo.color}55`,
        flexShrink:  "0",
      })

      /* Skill name text */
      const label = document.createElement("span")
      label.textContent = logo.name
      Object.assign(label.style, {
        fontSize:      "8.5px",
        fontWeight:    "700",
        letterSpacing: "0.06em",
        color:         logo.color,
        textShadow:    `0 0 10px ${logo.color}99`,
        whiteSpace:    "nowrap",
        fontFamily:    "system-ui, -apple-system, sans-serif",
        transition:    "color 0.2s ease, text-shadow 0.2s ease",
      })

      wrap.appendChild(img)
      wrap.appendChild(label)
      container.appendChild(wrap)
      return { wrap, img, label, badge }
    })

    /* ── Renderer ───────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(CW, CANVAS_H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled   = true
    renderer.shadowMap.type      = THREE.PCFSoftShadowMap
    renderer.toneMapping         = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    /* ── Camera ─────────────────────────────────────────── */
    const totalW   = (COUNT - 1) * SPACING + 2 * RADIUS
    const buildFOV = (w) => {
      const asp   = w / CANVAS_H
      const halfH = (totalW / asp / 2) * 1.16
      return 2 * Math.atan(halfH / CAM_Z) * (180 / Math.PI)
    }
    const camera = new THREE.PerspectiveCamera(buildFOV(CW), CW / CANVAS_H, 0.1, 100)
    camera.position.set(0, 0, CAM_Z)

    /* ── Lighting ───────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0x1a2240, 2.0))
    const key = new THREE.DirectionalLight(0x8ab8e0, 2.0)
    key.position.set(-5, 9, 8)
    key.castShadow            = true
    key.shadow.mapSize.width  = key.shadow.mapSize.height = 1024
    key.shadow.radius         = 6
    key.shadow.bias           = -0.001
    scene.add(key)
    const fillL = new THREE.PointLight(0x60a5fa, 3.2, 34)
    fillL.position.set(-12, 3, 6)
    scene.add(fillL)
    const rimR  = new THREE.PointLight(0xa78bfa, 2.6, 34)
    rimR.position.set(12, -2, 5)
    scene.add(rimR)

    /* ── Geometries ─────────────────────────────────────── */
    const ballGeo = new THREE.SphereGeometry(RADIUS, 64, 64)
    const circGeo = makeCircleGeo(RADIUS * 1.06, 72)
    const glowGeo = new THREE.CircleGeometry(RADIUS * 2.0, 40)

    /* ── Sphere meshes ───────────────────────────────────── */
    const meshes    = []
    const scales    = []
    const phases    = []
    const emTargets = []

    for (let i = 0; i < COUNT; i++) {
      const brandCol = new THREE.Color(logos[i].color)
      const tex = buildSphereTexture(logos[i].color)
      tex.colorSpace = THREE.SRGBColorSpace
      const mat = new THREE.MeshPhysicalMaterial({
        map:                tex,
        color:              new THREE.Color("#cce0f0"),
        emissive:           brandCol,
        emissiveIntensity:  0.14,
        roughness:          0.06,
        metalness:          0.06,
        clearcoat:          1.0,
        clearcoatRoughness: 0.04,
      })
      const mesh = new THREE.Mesh(ballGeo, mat)
      mesh.position.set(initX(i), 5.5 + i * 0.10, 0)
      mesh.rotation.y = -Math.PI / 2   /* UV fix: centre faces camera (+Z) */
      mesh.castShadow = true
      scene.add(mesh)
      meshes.push(mesh)
      scales.push(1.0)
      phases.push(i * (Math.PI * 2 / COUNT))
      emTargets.push(0.14)
    }

    /* ── Floor glow puddles ─────────────────────────────── */
    const floorGlows = logos.map((logo, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(logo.color), transparent: true, opacity: 0.10, depthWrite: false,
      })
      const m = new THREE.Mesh(glowGeo, mat)
      m.rotation.x = -Math.PI / 2
      m.position.set(initX(i), -RADIUS - 0.02, 0)
      scene.add(m)
      return m
    })

    /* ── Sound-wave ring pool ───────────────────────────── */
    const RINGS_PER = 3
    const ringPool  = Array.from({ length: COUNT * RINGS_PER }, () => {
      const mat  = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false })
      const line = new THREE.Line(circGeo, mat)
      line.visible = false
      scene.add(line)
      return { line, mat, active: false, t: 0, delay: 0 }
    })
    const spawnRings = (bi) => {
      const col = new THREE.Color(logos[bi].color)
      let n = 0
      for (const r of ringPool) {
        if (!r.active && n < RINGS_PER) {
          r.active = true; r.t = 0; r.delay = n * 0.08
          r.mat.color.copy(col)
          r.line.position.set(phys[bi].x, phys[bi].y, 0.02)
          r.line.scale.setScalar(1)
          r.line.visible = true; r.mat.opacity = 0
          n++
        }
      }
    }

    /* ── Physics state ──────────────────────────────────── */
    const phys = Array.from({ length: COUNT }, (_, i) => ({
      x: initX(i), y: 5.5 + i * 0.10,
      ix: initX(i), iy: 0,
      vx: 0, vy: -0.8 - i * 0.08,
    }))

    /* ── Pointer tracking ───────────────────────────────── */
    const raycaster = new THREE.Raycaster()
    const mouseNDC  = new THREE.Vector2(99, 99)
    let   hoveredIdx = -1
    const mouse = { wx: 1e6, wy: 1e6 }

    const updatePointer = (cx, cy) => {
      const rect = renderer.domElement.getBoundingClientRect()
      if (!rect.width) return
      const ndcX =  ((cx - rect.left) / rect.width)  * 2 - 1
      const ndcY = -((cy - rect.top)  / rect.height) * 2 + 1
      mouseNDC.set(ndcX, ndcY)
      const v = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera)
      const d = v.sub(camera.position).normalize()
      const t = -camera.position.z / d.z
      mouse.wx = camera.position.x + d.x * t
      mouse.wy = camera.position.y + d.y * t
    }
    const onMouseMove = (e) => { warmUpAudio(); updatePointer(e.clientX, e.clientY) }
    window.addEventListener("mousemove", onMouseMove, { passive: true })

    const clearPointer = () => {
      mouse.wx = 1e6; mouse.wy = 1e6; mouseNDC.set(99, 99)
      if (hoveredIdx >= 0) emTargets[hoveredIdx] = 0.14
      hoveredIdx = -1
    }
    renderer.domElement.addEventListener("mouseleave", clearPointer)
    const onTouch = (e) => { warmUpAudio(); const t = e.touches[0]; updatePointer(t.clientX, t.clientY) }
    renderer.domElement.addEventListener("touchmove", onTouch, { passive: true })
    renderer.domElement.addEventListener("touchend",  clearPointer, { passive: true })

    /* ── Temporary vector for projection ───────────────── */
    const projPos = new THREE.Vector3()

    /* ── Animation loop ─────────────────────────────────── */
    const RING_DUR = 0.80
    let animId, elapsed = 0, last = 0

    const tick = (now) => {
      animId = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      elapsed += dt; last = now
      if (dt <= 0) return

      const { wx, wy } = mouse
      const vdecay = Math.exp(-DECAY * dt)

      /* Hover detection */
      raycaster.setFromCamera(mouseNDC, camera)
      const hits     = raycaster.intersectObjects(meshes)
      const newHover = hits.length > 0 ? meshes.indexOf(hits[0].object) : -1
      if (newHover !== hoveredIdx) {
        if (hoveredIdx >= 0) emTargets[hoveredIdx] = 0.14
        hoveredIdx = newHover
        if (newHover >= 0) {
          emTargets[newHover] = 1.6
          spawnRings(newHover)
          playMarimbaNote(newHover)
        }
      }

      /* Per-ball physics */
      for (let i = 0; i < COUNT; i++) {
        const p  = phys[i]
        p.vx    += (p.ix - p.x) * SPRING * dt
        p.vy    += (p.iy - p.y) * SPRING * dt
        const dx = p.x - wx, dy = p.y - wy, d = Math.hypot(dx, dy)
        if (d < REPEL_R && d > 0.001) {
          const t2 = 1 - d / REPEL_R
          p.vx += (dx / d) * t2 * t2 * REPEL_F * dt
          p.vy += (dy / d) * t2 * t2 * REPEL_F * dt
        }
        const spd = Math.hypot(p.vx, p.vy)
        if (spd > 20) { p.vx = p.vx / spd * 20; p.vy = p.vy / spd * 20 }
        p.vx *= vdecay; p.vy *= vdecay
        p.x  += p.vx * dt; p.y += p.vy * dt
      }

      /* Ball-ball collisions */
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const a = phys[i], b = phys[j]
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy)
          if (d < MIN_DIST && d > 0.001) {
            const ol = (MIN_DIST - d) * 0.5, nx = dx / d, ny = dy / d
            a.x += nx * ol; a.y += ny * ol; b.x -= nx * ol; b.y -= ny * ol
            const dot = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny
            if (dot < 0) {
              const imp = (1 + RESTITUTION) * dot * 0.5
              a.vx -= imp * nx; a.vy -= imp * ny
              b.vx += imp * nx; b.vy += imp * ny
            }
          }
        }
      }

      /* Mesh + chip update */
      for (let i = 0; i < COUNT; i++) {
        const bob  = Math.sin(elapsed * BOB_SPEED + phases[i]) * BOB_AMP
        const posY = phys[i].y + bob
        meshes[i].position.set(phys[i].x, posY, 0)

        /* Scale lerp (hover grow) */
        const tgtS  = hoveredIdx === i ? 1.14 : 1.0
        scales[i]  += (tgtS - scales[i]) * Math.min(dt * 12, 1)
        meshes[i].scale.setScalar(scales[i])

        /* Emissive lerp */
        const mat = meshes[i].material
        mat.emissiveIntensity += (emTargets[i] - mat.emissiveIntensity) * Math.min(dt * 10, 1)

        /* Floor glow */
        floorGlows[i].position.x    = phys[i].x
        floorGlows[i].material.opacity = 0.08 + mat.emissiveIntensity * 0.055

        /* ── Project ball center → screen pixel, offset chip BELOW ball ── */
        projPos.set(phys[i].x, posY, 0)
        const sc = project3D(projPos, camera, CW, CANVAS_H)

        /* Also project a point RADIUS below to find pixel offset */
        projPos.set(phys[i].x, posY - RADIUS * scales[i], 0)
        const scBot = project3D(projPos, camera, CW, CANVAS_H)
        const pxBelow = scBot.y - sc.y   /* pixels from center to bottom edge */

        const chip = chips[i]
        chip.wrap.style.left = sc.x + "px"
        chip.wrap.style.top  = (sc.y + pxBelow + 5) + "px"

        /* Hover: enlarge logo + brighten name */
        const isHov = hoveredIdx === i
        chip.img.style.transform = isHov ? "scale(1.25)" : "scale(1.0)"
        chip.img.style.filter    = isHov
          ? `drop-shadow(0 0 10px ${logos[i].color}) drop-shadow(0 1px 3px rgba(0,0,0,0.8))`
          : `drop-shadow(0 0 5px ${logos[i].color}cc) drop-shadow(0 1px 3px rgba(0,0,0,0.8))`
      }

      /* Ring animation */
      for (const r of ringPool) {
        if (!r.active) continue
        r.t += dt
        const e2 = r.t - r.delay
        if (e2 <= 0) continue
        const prog = e2 / RING_DUR
        if (prog >= 1) { r.active = false; r.line.visible = false; continue }
        r.line.scale.setScalar(1 + (1 - Math.pow(1 - prog, 2)) * 4.8)
        r.mat.opacity = 0.72 * Math.pow(1 - prog, 1.4)
      }

      renderer.render(scene, camera)
    }

    requestAnimationFrame((t) => { last = t; tick(t) })

    /* ── Resize ─────────────────────────────────────────── */
    const onResize = () => {
      const W2 = container.clientWidth
      camera.fov    = buildFOV(W2)
      camera.aspect = W2 / CANVAS_H
      camera.updateProjectionMatrix()
      renderer.setSize(W2, CANVAS_H)
    }
    window.addEventListener("resize", onResize, { passive: true })

    /* ── Cleanup ─────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize",    onResize)
      renderer.domElement.removeEventListener("mouseleave", clearPointer)
      renderer.domElement.removeEventListener("touchmove",  onTouch)
      renderer.domElement.removeEventListener("touchend",   clearPointer)
      ballGeo.dispose(); circGeo.dispose(); glowGeo.dispose()
      meshes.forEach((m)     => { m.material.map?.dispose(); m.material.dispose() })
      floorGlows.forEach((g) => g.material.dispose())
      ringPool.forEach((r)   => r.mat.dispose())
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      chips.forEach(({ wrap }) => { if (container.contains(wrap)) container.removeChild(wrap) })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: CANVAS_H, cursor: "crosshair" }}
    />
  )
}

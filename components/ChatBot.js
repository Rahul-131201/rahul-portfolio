"use client"

import { useState, useRef, useEffect } from "react"

const SUGGESTED = [
  "What are Rahul's skills?",
  "Tell me about his experience",
  "What projects has he built?",
  "How to contact Rahul?",
]

/* ── 3-D Robot mascot (SVG + CSS, no external assets) ── */
function RobotMascot({ size = 56, animate = false }) {
  const id = "rb"
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={animate ? { filter: "drop-shadow(0 0 12px rgba(99,179,237,0.7))" } : {}}
    >
      <defs>
        {/* ── ambient radial glow ── */}
        <radialGradient id={`${id}-glow`} cx="50%" cy="55%" r="48%">
          <stop offset="0%"  stopColor="#60a5fa" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
        </radialGradient>

        {/* ── head face plate ── */}
        <linearGradient id={`${id}-head`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1e293b"/>
          <stop offset="40%"  stopColor="#0f172a"/>
          <stop offset="100%" stopColor="#020617"/>
        </linearGradient>

        {/* ── top-left highlight (specular) ── */}
        <radialGradient id={`${id}-spec`} cx="30%" cy="25%" r="40%">
          <stop offset="0%"   stopColor="#94a3b8" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0"/>
        </radialGradient>

        {/* ── visor screen ── */}
        <linearGradient id={`${id}-visor`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#38bdf8"/>
          <stop offset="50%"  stopColor="#818cf8"/>
          <stop offset="100%" stopColor="#c084fc"/>
        </linearGradient>

        {/* ── visor glass glint ── */}
        <linearGradient id={`${id}-glint`} x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>

        {/* ── ear/neck chrome ── */}
        <linearGradient id={`${id}-chrome`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#475569"/>
          <stop offset="50%"  stopColor="#1e293b"/>
          <stop offset="100%" stopColor="#0f172a"/>
        </linearGradient>

        {/* ── hand chrome ── */}
        <linearGradient id={`${id}-hand`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#64748b"/>
          <stop offset="100%" stopColor="#1e293b"/>
        </linearGradient>

        {/* ── antenna glow ── */}
        <radialGradient id={`${id}-antglow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7dd3fc" stopOpacity="1"/>
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0"/>
        </radialGradient>

        {/* ── mouth scanline ── */}
        <linearGradient id={`${id}-mouth`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#38bdf8" stopOpacity="0"/>
          <stop offset="30%"  stopColor="#38bdf8" stopOpacity="1"/>
          <stop offset="70%"  stopColor="#a78bfa" stopOpacity="1"/>
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
        </linearGradient>

        {/* ── filters ── */}
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>
        <filter id={`${id}-softblur`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2"/>
        </filter>
        <filter id={`${id}-glow-filter`}>
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── ambient halo ── */}
      <ellipse cx="60" cy="112" rx="34" ry="6" fill="url(#rb-glow)" filter={`url(#${id}-blur)`}/>

      {/* ══ NECK ══ */}
      <rect x="50" y="86" width="20" height="10" rx="3" fill="url(#rb-chrome)"/>
      <rect x="53" y="87" width="14" height="2" rx="1" fill="#475569" opacity="0.7"/>
      {/* neck vent lines */}
      {[89,91,93].map(y => (
        <line key={y} x1="51" y1={y} x2="69" y2={y} stroke="#38bdf8" strokeWidth="0.5" opacity="0.4"/>
      ))}

      {/* ══ EAR PLATES ══ */}
      {/* left ear */}
      <rect x="18" y="42" width="10" height="28" rx="4" fill="url(#rb-chrome)"/>
      <rect x="20" y="46" width="6" height="4" rx="1.5" fill="#38bdf8" opacity="0.6"/>
      <rect x="20" y="52" width="6" height="2" rx="1"   fill="#a78bfa" opacity="0.5"/>
      <rect x="20" y="56" width="6" height="2" rx="1"   fill="#38bdf8" opacity="0.4"/>
      {/* right ear */}
      <rect x="92" y="42" width="10" height="28" rx="4" fill="url(#rb-chrome)"/>
      <rect x="94" y="46" width="6" height="4" rx="1.5" fill="#38bdf8" opacity="0.6"/>
      <rect x="94" y="52" width="6" height="2" rx="1"   fill="#a78bfa" opacity="0.5"/>
      <rect x="94" y="56" width="6" height="2" rx="1"   fill="#38bdf8" opacity="0.4"/>

      {/* ══ HEAD SHELL ══ */}
      <rect x="26" y="28" width="68" height="60" rx="14" fill="url(#rb-head)"/>
      {/* specular highlight */}
      <rect x="26" y="28" width="68" height="60" rx="14" fill={`url(#${id}-spec)`}/>
      {/* edge rim */}
      <rect x="26" y="28" width="68" height="60" rx="14" fill="none"
            stroke="rgba(148,163,184,0.18)" strokeWidth="1.2"/>

      {/* ── top bevel rim ── */}
      <path d="M36 30 Q60 24 84 30" stroke="rgba(148,163,184,0.35)" strokeWidth="1.5" strokeLinecap="round"/>

      {/* ══ ANTENNA ══ */}
      <line x1="60" y1="28" x2="60" y2="16" stroke="#334155" strokeWidth="2.5" strokeLinecap="round"/>
      {/* glow halo behind orb */}
      <circle cx="60" cy="13" r="7" fill="#38bdf8" opacity="0.18" filter={`url(#${id}-blur)`}/>
      {/* orb */}
      <circle cx="60" cy="13" r="4.5" fill={`url(#${id}-antglow)`}/>
      <circle cx="60" cy="13" r="4.5" fill="none" stroke="#7dd3fc" strokeWidth="0.8" opacity="0.8"/>
      {/* orb shine */}
      <circle cx="58.5" cy="11.5" r="1.5" fill="white" opacity="0.7"/>
      {/* pulse ring — animated */}
      <circle cx="60" cy="13" r="7" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5">
        {animate && <animate attributeName="r" values="5;9;5" dur="2s" repeatCount="indefinite"/>}
        {animate && <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>}
      </circle>

      {/* ══ VISOR (face screen) ══ */}
      <rect x="36" y="40" width="48" height="26" rx="7" fill={`url(#${id}-visor)`} opacity="0.88"/>
      {/* inner depth / tint */}
      <rect x="37" y="41" width="46" height="24" rx="6" fill="#060d1a" opacity="0.55"/>
      {/* glass glint */}
      <rect x="37" y="41" width="22" height="11" rx="5" fill={`url(#${id}-glint)`} opacity="0.9"/>
      {/* visor scanlines */}
      {[45,49,53,61].map(y => (
        <line key={y} x1="38" y1={y} x2="83" y2={y} stroke="rgba(56,189,248,0.12)" strokeWidth="0.7"/>
      ))}
      {/* visor rim */}
      <rect x="36" y="40" width="48" height="26" rx="7" fill="none"
            stroke="rgba(99,179,237,0.55)" strokeWidth="1.2"/>

      {/* ── EYES inside visor ── */}
      {/* left eye glow halo */}
      <ellipse cx="49" cy="53" rx="7" ry="5" fill="#38bdf8" opacity="0.22" filter={`url(#${id}-softblur)`}/>
      {/* left eye */}
      <ellipse cx="49" cy="53" rx="5" ry="4" fill="#0f172a"/>
      <ellipse cx="49" cy="53" rx="4" ry="3.2" fill="#38bdf8" opacity="0.9"/>
      <ellipse cx="49" cy="53" rx="2.5" ry="2" fill="white" opacity="0.95"/>
      <ellipse cx="49" cy="53" rx="1.2" ry="1" fill="#0ea5e9"/>
      <circle  cx="48" cy="52.2" r="0.6" fill="white" opacity="0.9"/>
      {/* right eye glow halo */}
      <ellipse cx="71" cy="53" rx="7" ry="5" fill="#818cf8" opacity="0.22" filter={`url(#${id}-softblur)`}/>
      {/* right eye */}
      <ellipse cx="71" cy="53" rx="5" ry="4" fill="#0f172a"/>
      <ellipse cx="71" cy="53" rx="4" ry="3.2" fill="#818cf8" opacity="0.9"/>
      <ellipse cx="71" cy="53" rx="2.5" ry="2" fill="white" opacity="0.95"/>
      <ellipse cx="71" cy="53" rx="1.2" ry="1" fill="#7c3aed"/>
      <circle  cx="70" cy="52.2" r="0.6" fill="white" opacity="0.9"/>
      {/* eye blink — animated */}
      {animate && <>
        <ellipse cx="49" cy="53" rx="5" ry="4" fill="#0f172a" opacity="0">
          <animate attributeName="ry" values="4;0.4;4" keyTimes="0;0.5;1" dur="4s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="4s" begin="1s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="71" cy="53" rx="5" ry="4" fill="#0f172a" opacity="0">
          <animate attributeName="ry" values="4;0.4;4" keyTimes="0;0.5;1" dur="4s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="4s" begin="1s" repeatCount="indefinite"/>
        </ellipse>
      </>}

      {/* ══ LOWER FACE (below visor) ══ */}
      {/* cheek indicators */}
      <ellipse cx="35" cy="74" rx="5" ry="3.5" fill="#f472b6" opacity="0.25" filter={`url(#${id}-softblur)`}/>
      <ellipse cx="85" cy="74" rx="5" ry="3.5" fill="#f472b6" opacity="0.25" filter={`url(#${id}-softblur)`}/>

      {/* mouth bar (smile scanline) */}
      <rect x="44" y="73" width="32" height="4" rx="2" fill="#0f172a" opacity="0.8"/>
      <rect x="44" y="73" width="32" height="4" rx="2" fill={`url(#${id}-mouth)`} opacity="0.9"/>
      {/* mouth inner glow */}
      <rect x="44" y="73" width="32" height="4" rx="2" fill="none"
            stroke="rgba(56,189,248,0.3)" strokeWidth="0.6"/>
      {/* smile curve (subtle) */}
      <path d="M50 74 Q60 79 70 74" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="1" strokeLinecap="round"/>

      {/* chin vent */}
      {[80,82,84].map(x => (
        <rect key={x} x={x-3} y="80" width="5" height="2" rx="1" fill="#1e293b" stroke="#334155" strokeWidth="0.4"/>
      ))}
      {[38,41,44].map(x => (
        <rect key={x} x={x-3} y="80" width="5" height="2" rx="1" fill="#1e293b" stroke="#334155" strokeWidth="0.4"/>
      ))}

      {/* ══ WAVING ARM + HAND ══ */}
      {/* upper arm */}
      <g style={animate ? { transformOrigin:"26px 90px", animation:"wave 1.8s ease-in-out infinite" } : {}}>
        {/* shoulder joint */}
        <circle cx="26" cy="90" r="5" fill="url(#rb-chrome)"/>
        <circle cx="26" cy="90" r="3" fill="#38bdf8" opacity="0.5"/>
        {/* forearm */}
        <rect x="8" y="85" width="20" height="9" rx="4" fill="url(#rb-hand)"
              style={animate ? {} : { transform:"rotate(-30deg)", transformOrigin:"26px 90px" }}/>
        {/* hand plate */}
        <rect x="4" y="83" width="12" height="11" rx="5" fill="url(#rb-chrome)"/>
        <rect x="4" y="83" width="12" height="11" rx="5" fill={`url(#${id}-spec)`}/>
        <rect x="4" y="83" width="12" height="11" rx="5" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="0.8"/>
        {/* knuckle lines */}
        {[5,8,11].map(x => (
          <line key={x} x1={x} y1="85" x2={x} y2="92" stroke="#334155" strokeWidth="0.7" strokeLinecap="round"/>
        ))}
        {/* finger tips */}
        <circle cx="5.5"  cy="83.5" r="1.5" fill="#475569"/>
        <circle cx="8"    cy="82.5" r="1.5" fill="#475569"/>
        <circle cx="10.5" cy="83"   r="1.5" fill="#475569"/>
        <circle cx="13"   cy="83.5" r="1.5" fill="#475569"/>
        {/* hand glow */}
        <ellipse cx="10" cy="89" rx="7" ry="5" fill="#38bdf8" opacity="0.12" filter={`url(#${id}-blur)`}/>
      </g>

      {/* ══ FLOATING HOLO PARTICLES ══ */}
      {animate && <>
        {/* particle 1 */}
        <circle cx="100" cy="35" r="2" fill="#38bdf8" opacity="0.7">
          <animate attributeName="cy" values="35;28;35" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite"/>
        </circle>
        {/* particle 2 */}
        <circle cx="108" cy="50" r="1.5" fill="#a78bfa" opacity="0.6">
          <animate attributeName="cy" values="50;43;50" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
        {/* particle 3 */}
        <circle cx="104" cy="65" r="1" fill="#f0abfc" opacity="0.5">
          <animate attributeName="cy" values="65;58;65" dur="3.5s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3.5s" begin="1s" repeatCount="indefinite"/>
        </circle>
        {/* diamond holo shape */}
        <path d="M105 20 L108 24 L105 28 L102 24 Z" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.15;0.5" dur="4s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="rotate" from="0 105 24" to="360 105 24" dur="8s" repeatCount="indefinite"/>
        </path>
        {/* cross / plus holo */}
        <g opacity="0.4">
          <line x1="14" y1="30" x2="14" y2="36" stroke="#818cf8" strokeWidth="0.8" strokeLinecap="round">
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.8s" begin="0.3s" repeatCount="indefinite"/>
          </line>
          <line x1="11" y1="33" x2="17" y2="33" stroke="#818cf8" strokeWidth="0.8" strokeLinecap="round">
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.8s" begin="0.3s" repeatCount="indefinite"/>
          </line>
        </g>
        {/* orbit ring */}
        <ellipse cx="60" cy="13" rx="12" ry="4" fill="none" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.35">
          <animateTransform attributeName="transform" type="rotate" from="0 60 13" to="360 60 13" dur="6s" repeatCount="indefinite"/>
        </ellipse>
      </>}

      {/* ══ KEYFRAMES (injected via style tag below) ══ */}
    </svg>
  )
}

/* wave-arm keyframe needs to live in the DOM */
const ROBOT_KEYFRAMES = `
@keyframes wave {
  0%   { transform: rotate(-20deg); }
  25%  { transform: rotate(20deg);  }
  50%  { transform: rotate(-10deg); }
  75%  { transform: rotate(15deg);  }
  100% { transform: rotate(-20deg); }
}
`

function BotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <path d="M8 15h.01M12 15h.01M16 15h.01" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-blue-400"
          style={{
            animation: "chatbot-bounce 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function ChatBot() {
  const [open, setOpen]         = useState(false)
  const [input, setInput]       = useState("")
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Rahul's AI assistant. Ask me anything about his skills, experience, or projects. 👋" },
  ])
  const [loading, setLoading]   = useState(false)
  const bottomRef               = useRef(null)
  const inputRef                = useRef(null)

  // Auto-scroll on new messages
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading, open])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120)
  }, [open])

  const send = async (text) => {
    const trimmed = (text ?? input).trim()
    if (!trimmed || loading) return

    const userMsg = { role: "user", content: trimmed }
    const next    = [...messages, userMsg]
    setMessages(next)
    setInput("")
    setLoading(true)

    try {
      const res  = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? data.error ?? "Sorry, something went wrong." },
      ])
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error — please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* ── Keyframes injected once ─────────────────────── */}
      <style>{`
        @keyframes chatbot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes chatbot-slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .chatbot-window { animation: chatbot-slide-up 0.25s cubic-bezier(0.16,1,0.3,1) forwards; }
        ${ROBOT_KEYFRAMES}
        @keyframes fab-label-float {
          0%, 100% { transform: translateY(0);    opacity: 1;    }
          50%       { transform: translateY(-4px); opacity: 0.85; }
        }
        @keyframes fab-dot-pulse {
          0%, 100% { transform: scale(1);   opacity: 1;   }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }
      `}</style>

      {/* ── FAB toggle button + label ───────────────────── */}
      <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-center gap-2">

        {/* floating label pill — hide when chat is open */}
        {!open && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white whitespace-nowrap select-none"
            style={{
              background:    "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,27,75,0.92) 100%)",
              border:        "1px solid rgba(99,179,237,0.35)",
              backdropFilter:"blur(12px)",
              boxShadow:     "0 4px 20px rgba(59,130,246,0.25)",
              animation:     "fab-label-float 3s ease-in-out infinite",
            }}
          >
            {/* pulsing dot */}
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"
              style={{ boxShadow: "0 0 6px #38bdf8", animation: "fab-dot-pulse 1.5s ease-in-out infinite" }}
            />
            <span style={{ background: "linear-gradient(90deg, #93c5fd, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Ask about me ✦
            </span>
          </div>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat" : "Open AI chat"}
          className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110"
          style={{
            background:  "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
            boxShadow:   "0 0 28px rgba(59,130,246,0.55), 0 0 60px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
            border:      "1px solid rgba(99,179,237,0.3)",
          }}
        >
          {open
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            : <RobotMascot size={52} animate={true} />
          }
        </button>
      </div>

      {/* ── Chat window ─────────────────────────────────── */}
      {open && (
        <div
          className="chatbot-window fixed bottom-24 right-6 z-9998 flex flex-col rounded-2xl"
          style={{
            width:          "min(420px, calc(100vw - 2rem))",
            height:         "min(580px, calc(100vh - 10rem))",
            background:     "rgba(10, 14, 26, 0.97)",
            border:         "1px solid rgba(59,130,246,0.25)",
            backdropFilter: "blur(20px)",
            boxShadow:      "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
            overflow:       "hidden",
            minHeight:      0,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 shrink-0"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.1) 100%)", borderBottom: "1px solid rgba(59,130,246,0.15)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)" }}>
              <RobotMascot size={36} animate={true} />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">Rahul's AI Assistant</p>
              <p className="text-green-400 text-xs mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" style={{ boxShadow: "0 0 6px #4ade80" }} />
                Online · Powered by Groq
              </p>
            </div>
            <button
              onClick={() => setMessages([{ role: "assistant", content: "Hi! I'm Rahul's AI assistant. Ask me anything about his skills, experience, or projects. 👋" }])}
              className="ml-auto text-gray-500 hover:text-gray-300 text-xs transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
              title="Clear chat"
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(59,130,246,0.3) transparent", minHeight: 0 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs mt-0.5"
                  style={{
                    background: m.role === "user" ? "rgba(139,92,246,0.2)" : "rgba(59,130,246,0.08)",
                    border:     m.role === "user" ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(59,130,246,0.2)",
                  }}
                >
                  {m.role === "user" ? <UserIcon /> : <RobotMascot size={24} animate={false} />}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "rounded-tr-sm text-white"
                      : "rounded-tl-sm text-gray-200"
                  }`}
                  style={
                    m.role === "user"
                      ? { background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))", border: "1px solid rgba(139,92,246,0.2)" }
                      : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
                  <RobotMascot size={24} animate={false} />
                </div>
                <div className="rounded-2xl rounded-tl-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested prompts — show only when just the welcome message exists */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-blue-500/25 text-blue-300 hover:bg-blue-500/15 hover:border-blue-400/40 transition-all duration-200"
                  style={{ background: "rgba(59,130,246,0.07)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  // Auto-grow up to 3 rows
                  e.target.style.height = "auto"
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`
                }}
                onKeyDown={onKey}
                placeholder="Ask about skills, projects, experience…"
                disabled={loading}
                className="flex-1 resize-none bg-transparent text-sm text-white placeholder-gray-600 outline-none leading-relaxed py-2 px-3 rounded-xl transition-colors"
                style={{
                  background:   "rgba(255,255,255,0.05)",
                  border:       "1px solid rgba(255,255,255,0.1)",
                  minHeight:    "40px",
                  maxHeight:    "80px",
                }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  boxShadow:  input.trim() ? "0 0 16px rgba(59,130,246,0.4)" : "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
            <p className="text-gray-700 text-[10px] text-center mt-2">Press Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

/* ── Simple-Icons CDN helper (for per-skill logo fallbacks) ── */
const DV = (name, file) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${file}.svg`
const SI = (slug, hex) =>
  `https://cdn.simpleicons.org/${slug}/${hex}`

/* ── 3D ball scene — loaded client-only to avoid SSR errors ── */
const SkillBalls3D = dynamic(() => import("./SkillBalls3D"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: 240 }}
      className="flex items-center justify-center"
    >
      <span className="text-gray-600 text-sm animate-pulse tracking-widest">
        loading 3d scene...
      </span>
    </div>
  ),
})

/* ── Logo map for per-skill icons inside category cards ───── */
const LOGO = {
  Python:                     DV("python",     "python-original"),
  Java:                       DV("java",       "java-original"),
  JavaScript:                 DV("javascript", "javascript-original"),
  Django:                     DV("django",     "django-plain-wordmark"),
  "REST APIs":                SI("swagger",    "85ea2d"),
  Selenium:                   DV("selenium",   "selenium-original"),
  "API Testing":              DV("postman",    "postman-original"),
  Cucumber:                   DV("cucumber",   "cucumber-plain"),
  "GitHub Copilot":           DV("github",     "github-original"),
  "GitLab Duo":               DV("gitlab",     "gitlab-original"),
  /* ── AI / GenAI skills — distinct icons per skill ─────── */
  "Generative AI Systems":    SI("googlegemini", "8E75B2"),  // Google Gemini — flagship GenAI platform
  "LLM Prompt Engineering":   SI("huggingface",  "FF9D00"),  // HuggingFace — prompt spaces & model hub
  "LLM APIs":                 SI("anthropic",   "CC785C"),   // Anthropic — Claude / API design
  "AI Automation Frameworks": SI("langchain",   "22d3ee"),   // LangChain — orchestration framework
}

const SKILL_CATEGORIES = [
  {
    icon: "🧠",
    label: "Core Expertise",
    color: "#60a5fa",
    items: [
      { name: "Generative AI Systems",    level: 92 },
      { name: "LLM Prompt Engineering",   level: 90 },
      { name: "AI Automation Frameworks", level: 86 },
    ],
  },
  {
    icon: "⚙️",
    label: "Engineering",
    color: "#a78bfa",
    items: [
      { name: "Python",     level: 88 },
      { name: "Java",       level: 80 },
      { name: "JavaScript", level: 72 },
      { name: "Django",     level: 78 },
      { name: "REST APIs",  level: 85 },
    ],
  },
  {
    icon: "🧪",
    label: "Testing & Automation",
    color: "#22d3ee",
    items: [
      { name: "Selenium",    level: 88 },
      { name: "API Testing", level: 85 },
      { name: "Cucumber",    level: 78 },
      { name: "TestNG",      level: 75 },
    ],
  },
  {
    icon: "🛠️",
    label: "AI Tooling",
    color: "#34d399",
    items: [
      { name: "GitHub Copilot", level: 90 },
      { name: "GitLab Duo",     level: 85 },
      { name: "LLM APIs",       level: 88 },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="relative max-w-6xl mx-auto px-6 py-28 overflow-hidden">

      {/* Orb */}
      <div className="gradient-glow w-[400px] h-[400px] top-0 left-[-100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.1), transparent 65%)" }} />

      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl">💡</span>
        <h2 className="section-heading">Skills</h2>
      </div>
      <p className="text-gray-500 text-sm mt-6 max-w-lg">
        Full-stack AI engineering from model integration to production automation.
        <span className="ml-2 text-gray-600">Move cursor to interact →</span>
      </p>

      {/* ── 3D physics logo balls ─────────────────────────── */}
      <div className="mt-6 mb-14 rounded-2xl overflow-hidden"
        style={{
          border:     "1px solid rgba(96,165,250,0.14)",
          background: "linear-gradient(180deg, rgba(8,12,28,0.70) 0%, rgba(4,7,18,0.85) 100%)",
          boxShadow:  "0 0 80px rgba(96,165,250,0.06) inset, 0 2px 40px rgba(0,0,0,0.5)",
        }}>
        <SkillBalls3D />
      </div>

      {/* ── Category cards with skill-level bars ──────────── */}
      <div className="grid md:grid-cols-4 gap-6">
        {SKILL_CATEGORIES.map((cat, ci) => (
          <div
            key={cat.label}
            className="card-3d glow-border p-6 flex flex-col gap-4 reveal"
            style={{ animationDelay: `${ci * 0.1}s` }}
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg animate-float"
                style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
              >
                {cat.icon}
              </span>
              <h3 className="text-white font-semibold text-sm">{cat.label}</h3>
            </div>

            {/* Divider */}
            <div className="h-px rounded-full"
              style={{ background: `linear-gradient(90deg, ${cat.color}60, transparent)` }} />

            {/* Skills */}
            <ul className="flex flex-col gap-3.5">
              {cat.items.map((skill, si) => (
                <li key={skill.name} className="flex flex-col gap-1.5 cursor-default">
                  <div className="flex items-center gap-2">
                    {LOGO[skill.name] ? (
                      <img
                        src={LOGO[skill.name]}
                        alt={skill.name}
                        width={20}
                        height={20}
                        className="skill-logo"
                      />
                    ) : (
                      <span
                        className="text-[9px] font-black px-1 rounded leading-none shrink-0"
                        style={{ background: `${cat.color}20`, color: cat.color, border: `1px solid ${cat.color}30` }}
                      >
                        {skill.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <span className="text-sm text-gray-300 flex-1 leading-tight">{skill.name}</span>
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{
                        color: cat.color,
                        transition: `opacity 0.4s ease ${(ci * 5 + si) * 80 + 600}ms`,
                        opacity: inView ? 1 : 0,
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: inView ? `${skill.level}%` : "0%",
                        background: `linear-gradient(90deg, ${cat.color}, ${cat.color}90)`,
                        boxShadow: inView ? `0 0 8px ${cat.color}50` : "none",
                        transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${(ci * 5 + si) * 80}ms, box-shadow 0.4s ease ${(ci * 5 + si) * 80 + 900}ms`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

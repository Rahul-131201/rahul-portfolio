"use client"

import { useState, useEffect, useRef } from "react"
import { useReveal } from "../hooks/useReveal"

function MetricCount({ value, suffix, inView }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(null)
  useEffect(() => {
    if (!inView || isNaN(value)) return
    const start = performance.now()
    const duration = 1400
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(value * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, value])
  return <>{display}{suffix}</>
}

const PROJECTS = [
  {
    id: "jmeter",
    title: "AI-Powered JMeter Script Generation",
    company: "Capgemini",
    year: "2024",
    icon: "⚡",
    color: "#60a5fa",
    tagline: "LLM-driven performance test automation at scale",
    tech: ["Prompt Engineering", "JMeter", "Django", "Streamlit", "GitHub Copilot"],
    chapters: [
      {
        num: "01",
        label: "Context",
        icon: "🏛️",
        content: "At Capgemini, the QA team was spending 3–5 days per project manually authoring JMeter performance test scripts. The process was repetitive, expertise-dependent, and produced inconsistent results across engineers.",
      },
      {
        num: "02",
        label: "Problem",
        icon: "⚠️",
        content: "Scripts were inconsistent across engineers, complex web apps had hidden endpoints that manual inspection routinely missed, and there was no reusable framework — every project started from scratch.",
      },
      {
        num: "03",
        label: "Solution",
        icon: "🔧",
        content: "Built an AI-assisted platform: prompt-engineered LLM generates JMeter XML from structured user input. A Django backend handles script processing and validation. A Streamlit UI provides execution and review. A custom URL-extractor utility crawls complex web apps to surface hidden endpoints missed by manual review.",
      },
      {
        num: "04",
        label: "Impact",
        icon: "📈",
        content: "Reduced JMeter script generation from days to minutes. Hidden URL extractor improved test coverage significantly. Platform was adopted by the broader QA team for all performance testing work.",
        metrics: [
          { label: "Scripting Time Reduced", value: 80, suffix: "%" },
          { label: "Scripts Automated", value: 100, suffix: "+" },
        ],
      },
    ],
  },
  {
    id: "tosca",
    title: "Tosca → Manual Test Case Migration Agent",
    company: "Capgemini",
    year: "2024",
    icon: "🤖",
    color: "#a78bfa",
    tagline: "97–100% accuracy AI migration pipeline",
    tech: ["Django", "LLM APIs", "REST APIs", "Streamlit", "Batch Processing"],
    chapters: [
      {
        num: "01",
        label: "Context",
        icon: "🏛️",
        content: "The team managed thousands of Tosca automation scripts. When projects migrated away from Tosca, manual documentation became necessary — a process taking weeks per project, with no consistency guarantee.",
      },
      {
        num: "02",
        label: "Problem",
        icon: "⚠️",
        content: "Converting Tosca XML scripts to manual test case format required engineers to read, interpret, and rewrite each step. High volume (hundreds of scripts per sprint), inconsistent output quality, and no audit trail of what had been migrated.",
      },
      {
        num: "03",
        label: "Solution",
        icon: "🔧",
        content: "Built a full-stack Django agent: Tosca XML is parsed to extract commands and metadata, a structured prompt builder constructs LLM context, and the model generates complete test cases — title, preconditions, numbered steps, expected results. Batch REST APIs made it production-scalable with a Streamlit UI for self-service use.",
      },
      {
        num: "04",
        label: "Impact",
        icon: "📈",
        content: "Replaced weeks of manual migration work with a pipeline that processes scripts in minutes. Output consistently passed QA review on first submission, eliminating re-work cycles.",
        metrics: [
          { label: "Conversion Accuracy", value: 97, suffix: "–100%" },
          { label: "Manual Effort Saved", value: 80, suffix: "%" },
        ],
      },
    ],
  },
  {
    id: "uipath",
    title: "UiPath Script Review Automation",
    company: "NatWest Wealth Client",
    year: "2025",
    icon: "🛡️",
    color: "#22d3ee",
    tagline: "AI validation engine for RPA quality assurance",
    tech: ["Python", "Prompt Engineering", "GitLab Duo", "Rule-Based Analysis"],
    chapters: [
      {
        num: "01",
        label: "Context",
        icon: "🏛️",
        content: "NatWest's RPA team delivered UiPath automation scripts for critical banking workflows. Quality review was entirely manual, slow, and dependent on senior engineers' memory of informal best practices.",
      },
      {
        num: "02",
        label: "Problem",
        icon: "⚠️",
        content: "Without a standardized checklist, review outcomes varied by reviewer. Scripts with critical issues sometimes passed. Senior engineers spent up to 2 days per script on review cycles, creating a bottleneck that slowed RPA delivery.",
      },
      {
        num: "03",
        label: "Solution",
        icon: "🔧",
        content: "Built a two-layer validation engine: a rule-based checklist engine flags structural issues (naming, error handling, selector quality), while a GenAI layer (GitLab Duo) evaluates logic, readability, and best practices. Output is a detailed pass/fail report with specific, actionable remediation steps per finding.",
      },
      {
        num: "04",
        label: "Impact",
        icon: "📈",
        content: "Standardized quality review across the entire RPA team. Any team member could now run a review — not just senior engineers. Consistent, high-accuracy reports included actionable fix guidance.",
        metrics: [
          { label: "Report Accuracy", value: 85, suffix: "%" },
          { label: "Review Time Cut", value: 50, suffix: "%" },
        ],
      },
    ],
  },
]

export default function CaseStudies() {
  const sectionRef   = useReveal()
  const [active, setActive]         = useState(null)
  const [chapter, setChapter]       = useState(0)
  const [visible, setVisible]       = useState(true)
  const [metricsInView, setMetrics] = useState(false)

  const open = (project) => {
    setActive(project)
    setChapter(0)
    setVisible(true)
    setMetrics(false)
    document.body.style.overflow = "hidden"
  }
  const close = () => {
    setActive(null)
    document.body.style.overflow = ""
  }
  const goTo = (idx) => {
    setVisible(false)
    setMetrics(false)
    setTimeout(() => {
      setChapter(idx)
      setVisible(true)
      if (active?.chapters[idx]?.metrics) setTimeout(() => setMetrics(true), 120)
    }, 180)
  }

  // Escape key close
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", onKey)
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
  }, [])

  const ROTATIONS = [6, 0, -6]

  return (
    <section ref={sectionRef} id="case-studies" className="relative max-w-7xl mx-auto px-6 py-28 overflow-hidden">

      <div className="gradient-glow w-[600px] h-[600px] top-0 left-[-150px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.07), transparent 65%)" }} />
      <div className="gradient-glow w-[500px] h-[500px] bottom-0 right-[-100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.07), transparent 65%)" }} />

      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl">🎬</span>
        <h2 className="section-heading">Featured Case Studies</h2>
      </div>
      <p className="text-gray-500 text-sm mt-6 mb-16 max-w-xl">
        Production AI systems I designed and shipped at Capgemini.{" "}
        <span className="text-gray-400">Click any card to read the full story.</span>
      </p>

      {/* ─── 3D PERSPECTIVE CARD GRID ─── */}
      <div className="grid lg:grid-cols-3 gap-7" style={{ perspective: "1400px", perspectiveOrigin: "50% 40%" }}>
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="group cursor-pointer reveal-scale"
            style={{
              animationDelay: `${i * 0.12}s`,
              transform: `rotateY(${ROTATIONS[i]}deg) translateZ(${i === 1 ? "20px" : "0px"})`,
              transformStyle: "preserve-3d",
              transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "rotateY(0deg) translateZ(30px) translateY(-10px)" }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = `rotateY(${ROTATIONS[i]}deg) translateZ(${i === 1 ? "20px" : "0px"})` }}
            onClick={() => open(project)}
          >
            <div className="card-3d glow-border h-full flex flex-col overflow-hidden">
              {/* Coloured top bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }} />

              <div className="p-7 flex flex-col h-full">
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}>
                    {project.icon}
                  </span>
                  <span className="text-xs font-bold tracking-widest text-right leading-tight" style={{ color: project.color }}>
                    {project.company}<br />{project.year}
                  </span>
                </div>

                <h3 className="text-white font-bold text-base leading-snug mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{project.tagline}</p>

                {/* Chapter preview dots */}
                <div className="flex items-center gap-1.5 mb-5">
                  {project.chapters.map((ch, ci) => (
                    <span key={ci} className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${project.color}12`, border: `1px solid ${project.color}25`, color: `${project.color}cc` }}>
                      {ch.label}
                    </span>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                  style={{ color: project.color }}>
                  Read Case Study
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── STORYTELLING MODAL ─── */}
      {active && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(2,6,23,0.93)", backdropFilter: "blur(22px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl overflow-hidden animate-scale-in"
            style={{ background: "rgba(255,255,255,0.035)", border: `1px solid ${active.color}30`, boxShadow: `0 0 60px ${active.color}18, 0 30px 80px rgba(0,0,0,0.6)`, maxHeight: "88vh", overflowY: "auto" }}
          >
            {/* Inner glow top accent */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${active.color}80, transparent)` }} />

            {/* ── MODAL HEADER ── */}
            <div className="p-6 pb-0">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${active.color}18`, border: `1px solid ${active.color}30` }}>
                    {active.icon}
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-widest mb-0.5" style={{ color: active.color }}>
                      {active.company} · {active.year}
                    </p>
                    <h2 className="text-white font-bold text-sm leading-tight">{active.title}</h2>
                  </div>
                </div>
                <button onClick={close} aria-label="Close case study"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-all shrink-0 ml-3 text-sm">
                  ✕
                </button>
              </div>

              {/* ── CHAPTER TABS ── */}
              <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {active.chapters.map((ch, i) => (
                  <button
                    key={ch.label}
                    onClick={() => goTo(i)}
                    className="flex-1 py-3 text-center transition-all duration-200 relative"
                    style={{ color: chapter === i ? active.color : "rgba(156,163,175,0.5)" }}
                  >
                    <span className="block text-[9px] font-black tracking-widest opacity-60 mb-0.5">{ch.num}</span>
                    <span className="text-xs font-bold">{ch.label}</span>
                    {chapter === i && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full" style={{ background: active.color }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ── CHAPTER CONTENT ── */}
            <div className="p-6"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.22s ease, transform 0.22s ease" }}>

              {/* Chapter icon + label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{active.chapters[chapter].icon}</span>
                <span className="text-xs font-black tracking-widest" style={{ color: active.color }}>
                  {active.chapters[chapter].num} — {active.chapters[chapter].label.toUpperCase()}
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">{active.chapters[chapter].content}</p>

              {/* Impact metrics */}
              {active.chapters[chapter].metrics && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {active.chapters[chapter].metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-xl text-center"
                      style={{ background: `${active.color}08`, border: `1px solid ${active.color}25` }}>
                      <div className="text-3xl font-black shimmer-text mb-1">
                        <MetricCount value={m.value} suffix={m.suffix} inView={metricsInView} />
                      </div>
                      <div className="text-gray-400 text-xs leading-snug">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Progress bar */}
              <div className="flex gap-1 mt-7">
                {active.chapters.map((_, i) => (
                  <div key={i} className="h-1 flex-1 rounded-full transition-all duration-400"
                    style={{ background: i <= chapter ? active.color : "rgba(255,255,255,0.08)" }} />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-5">
                {chapter > 0 ? (
                  <button onClick={() => goTo(chapter - 1)} className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1">
                    ← {active.chapters[chapter - 1].label}
                  </button>
                ) : <span />}

                {chapter < active.chapters.length - 1 ? (
                  <button onClick={() => goTo(chapter + 1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${active.color}70, ${active.color}30)`, boxShadow: `0 0 24px ${active.color}25` }}>
                    {active.chapters[chapter + 1].label} →
                  </button>
                ) : (
                  <button onClick={close}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.35), rgba(167,139,250,0.35))" }}>
                    ✓ Finish Story
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

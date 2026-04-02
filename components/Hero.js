"use client"

import { useEffect, useRef, useState } from "react"
import { useReveal } from "../hooks/useReveal"

const IMPACT = [
  { icon: "🎯", label: "Test Case Generation Accuracy",       to: 90,   suffix: "-100%" },
  { icon: "⚡", label: "Reduction in QA Documentation Effort", to: 25,   suffix: "-50%"  },
  { icon: "🚀", label: "AI Automation Solutions Delivered",    to: 5,    suffix: "+"     },
  { icon: "🤖", label: "Powered QA & Automation Systems",     to: null, fixed: "LLM"   },
]

const PHRASES = [
  "Building LLM-Powered Systems",
  "Automating QA Workflows",
  "Engineering Agentic AI",
  "Scaling AI Testing Platforms",
]

function CountUp({ to, suffix, fixed, inView }) {
  const [val, setVal] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!inView || to === null) return
    const start = performance.now()
    const duration = 1600
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(to * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, to])

  if (to === null) return <>{fixed}</>
  return <>{val}{suffix}</>
}

export default function Hero() {
  const sectionRef  = useReveal()
  const metricsRef  = useRef(null)
  const [metricsInView, setMetricsInView] = useState(false)
  const [phraseIdx, setPhraseIdx]         = useState(0)
  const [displayed, setDisplayed]         = useState("")
  const [typing, setTyping]               = useState(true)

  useEffect(() => {
    if (!metricsRef.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setMetricsInView(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(metricsRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    let timer
    if (typing) {
      if (displayed.length < phrase.length) {
        timer = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 65)
      } else {
        timer = setTimeout(() => setTyping(false), 2200)
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38)
      } else {
        setPhraseIdx((i) => (i + 1) % PHRASES.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timer)
  }, [displayed, typing, phraseIdx])

  return (
    <section ref={sectionRef} className="relative max-w-6xl mx-auto px-6 py-36 overflow-hidden">

      <div className="gradient-glow w-[700px] h-[700px] top-[-200px] left-[-150px]" style={{ background: "radial-gradient(circle, rgba(96,165,250,0.18), transparent 65%)" }} />
      <div className="gradient-glow w-[500px] h-[500px] top-[100px] right-[-100px]" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.15), transparent 65%)" }} />

      <div className="reveal flex items-center gap-2 mb-6" style={{ animationDelay: "0.1s" }}>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-green-400/30 bg-green-400/10 text-green-400 animate-neon-flicker">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
          ◈ Available for AI Engineering Roles
        </span>
      </div>

      <h1 className="reveal text-6xl md:text-7xl font-black leading-[1.05] tracking-tight" style={{ animationDelay: "0.2s" }}>
        <span className="text-white">Gen AI Engineer</span>
        <span className="text-gray-500 font-light text-5xl"> (QA)</span>
        <br />
        <span className="shimmer-text" style={{ display: "inline-block", minHeight: "1.15em" }}>
          {displayed}
          <span className="inline-block w-[3px] h-[0.8em] ml-[2px] bg-blue-400 align-middle" style={{ animation: "blink 1s steps(1,end) infinite" }} />
        </span>
      </h1>

      <p className="reveal mt-7 text-gray-400 max-w-2xl text-lg leading-relaxed" style={{ animationDelay: "0.35s" }}>
        I design and build production-grade Generative AI systems that automate
        software testing, accelerate QA workflows, and enhance developer productivity.
        <br />
        Specialized in{" "}
        <span className="text-blue-400 font-medium">LLM pipelines</span>,{" "}
        <span className="text-purple-400 font-medium">agentic workflows</span>, and{" "}
        <span className="text-cyan-400 font-medium">AI-powered automation platforms</span>.
      </p>

      <div ref={metricsRef} className="reveal mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" style={{ animationDelay: "0.5s" }}>
        {IMPACT.map((item, i) => (
          <div key={i} className="card-3d glow-border p-5 text-center cursor-default" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
            <div className="text-3xl mb-2 animate-float" style={{ animationDelay: `${i * 1.2}s` }}>
              {item.icon}
            </div>
            <div className="text-2xl font-black shimmer-text">
              <CountUp to={item.to} suffix={item.suffix} fixed={item.fixed} inView={metricsInView} />
            </div>
            <div className="text-xs text-gray-400 mt-1 leading-snug">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="reveal mt-12 flex flex-wrap gap-4 items-center" style={{ animationDelay: "0.7s" }}>
        <a href="#projects" className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-white text-black overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.4)] hover:scale-105">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <span>⚙ Explore AI Systems</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
        <a href="/Rahul_Ramane_Resume.pdf" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-blue-500/50 bg-blue-600/15 text-blue-300 transition-all duration-300 hover:bg-blue-600/30 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] hover:scale-105">
          <span>↓</span>
          <span>Download Resume</span>
        </a>
      </div>

      <div className="reveal mt-14 flex flex-wrap gap-2" style={{ animationDelay: "0.85s" }}>
        {["Python","LLM APIs","Django","Streamlit","Prompt Engineering","GitHub Copilot","Selenium","REST APIs"].map((t) => (
          <span key={t} className="tech-badge">◆ {t}</span>
        ))}
      </div>

    </section>
  )
}
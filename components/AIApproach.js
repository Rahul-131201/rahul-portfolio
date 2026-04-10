"use client"

import { useState } from "react"
import { useReveal } from "../hooks/useReveal"

const STEPS = [
  {
    num: "01",
    icon: "🧩",
    title: "Problem Structuring",
    desc: "Break problems into deterministic logic + LLM-driven components.",
    detail: "Begin with stakeholder interviews and system boundary mapping. I identify which parts should be rule-based (deterministic) vs which require LLM reasoning — separating concerns from the start to prevent prompt over-engineering later.",
    tags: ["System Design", "Architecture", "Decomposition"],
    color: "#60a5fa",
  },
  {
    num: "02",
    icon: "🔬",
    title: "Context Engineering",
    desc: "Extract structured data (AST, metadata, JSON inputs).",
    detail: "Prepare and structure the input context the LLM will receive. This includes parsing source files, extracting relevant metadata, normalizing formats, and constructing information-dense context windows that minimize hallucination risk.",
    tags: ["AST Parsing", "Data Extraction", "Context Windows"],
    color: "#a78bfa",
  },
  {
    num: "03",
    icon: "✏️",
    title: "Prompt Design",
    desc: "Role-based prompts + schema enforcement.",
    detail: "Craft role-specific system prompts with strict output schema definitions (JSON Schema, XML). Use chain-of-thought formatting for multi-step reasoning tasks. Test against edge cases before pipeline integration.",
    tags: ["Prompt Templates", "Schema Enforcement", "Chain-of-Thought"],
    color: "#22d3ee",
  },
  {
    num: "04",
    icon: "🛡️",
    title: "Validation Layer",
    desc: "Retry loops + rule-based output validation.",
    detail: "Every LLM output passes through a multi-tier gate: schema validation, business rule checks, and semantic quality scoring. Failed outputs trigger structured retry with corrective context injection — no silent failures.",
    tags: ["Schema Validation", "Retry Logic", "Quality Gates"],
    color: "#34d399",
  },
  {
    num: "05",
    icon: "📦",
    title: "Output Structuring",
    desc: "Convert LLM output into usable JSON/XML/UI.",
    detail: "Transform raw LLM responses into downstream-ready formats. Build parser utilities that handle partial or malformed outputs gracefully. Pipe clean results into REST APIs, file exports, or frontend UI components.",
    tags: ["JSON/XML Parsing", "Downstream Integration", "API Contracts"],
    color: "#fb923c",
  },
  {
    num: "06",
    icon: "📈",
    title: "Optimization",
    desc: "Continuous prompt tuning + error logging.",
    detail: "Track accuracy, latency, and token cost per production run. Use structured error logs to identify failure patterns. Iterate on prompt design, context size, and model selection using real data — not assumptions.",
    tags: ["Monitoring", "Prompt Tuning", "Cost Optimization"],
    color: "#f472b6",
  },
]

export default function AIApproach() {
  const sectionRef = useReveal()
  const [activeStep, setActiveStep] = useState(null)
  const toggle = (num) => setActiveStep((prev) => (prev === num ? null : num))

  return (
    <section ref={sectionRef} id="ai-approach" className="relative max-w-6xl mx-auto px-6 py-28 overflow-hidden">

      {/* Background orb */}
      <div className="gradient-glow w-[500px] h-[500px] bottom-0 right-0 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.1), transparent 65%)" }} />

      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl">⚙️</span>
        <h2 className="section-heading">How I Build AI Systems</h2>
      </div>
      <p className="text-gray-500 text-sm mt-6 mb-12 max-w-xl">
        A repeatable 6-step engineering process for production-grade LLM systems.{" "}
        <span className="text-gray-400">Click any step to explore.</span>
      </p>

      {/* Active step indicator */}
      {activeStep && (
        <div className="mb-8 flex items-center gap-3 animate-fade-up">
          <span className="text-xs font-black tracking-widest text-gray-500">EXPLORING</span>
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.3)", color: "#60a5fa" }}>
            STEP {activeStep}
          </span>
          <button onClick={() => setActiveStep(null)} className="ml-auto text-xs text-gray-600 hover:text-gray-400 transition-colors">✕ collapse</button>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {STEPS.map((step, i) => {
          const isActive = activeStep === step.num
          return (
            <div
              key={step.num}
              onClick={() => toggle(step.num)}
              className="card-3d glow-border p-6 group cursor-pointer reveal select-none"
              style={{ animationDelay: `${i * 0.08}s`, borderColor: isActive ? `${step.color}50` : undefined, boxShadow: isActive ? `0 0 30px ${step.color}18, 0 8px 30px rgba(0,0,0,0.3)` : undefined }}
            >
              {/* Step number */}
              <div className="text-xs font-black tracking-widest mb-3 flex items-center justify-between" style={{ color: step.color, opacity: isActive ? 1 : 0.6 }}>
                <span>◈ STEP {step.num}</span>
                <span className="transition-transform duration-300" style={{ transform: isActive ? "rotate(45deg)" : "rotate(0deg)", opacity: 0.5 }}>+</span>
              </div>

              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-all duration-300"
                  style={{ background: isActive ? `${step.color}28` : `${step.color}18`, border: `1px solid ${isActive ? step.color + "60" : step.color + "30"}`, boxShadow: isActive ? `0 0 16px ${step.color}30` : "none" }}>
                  {step.icon}
                </span>
                <h3 className="text-white font-semibold text-sm leading-tight" style={{ textShadow: isActive ? `0 0 20px ${step.color}60` : `0 0 20px ${step.color}40` }}>
                  {step.title}
                </h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>

              {/* Expanded detail */}
              <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ maxHeight: isActive ? "260px" : "0px", opacity: isActive ? 1 : 0 }}>
                <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${step.color}20` }}>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.detail}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {step.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accent line */}
              <div className="mt-4 h-px rounded-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${step.color}, transparent)`, opacity: isActive ? 1 : 0 }} />
            </div>
          )
        })}
      </div>

      {/* Pipeline connector visual */}
      <div className="hidden md:flex items-center justify-center mt-10">
        {STEPS.map((step, i) => (
          <div key={step.num} className="flex items-center">
            <button onClick={() => toggle(step.num)} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 cursor-pointer"
              style={{ background: activeStep === step.num ? step.color : `${step.color}20`, border: `1px solid ${step.color}50`, color: activeStep === step.num ? "#020617" : step.color, boxShadow: activeStep === step.num ? `0 0 18px ${step.color}60` : "none" }}>
              {step.num}
            </button>
            {i < STEPS.length - 1 && (
              <div className="w-10 h-px" style={{ background: `linear-gradient(90deg, ${step.color}60, ${STEPS[i + 1].color}60)` }} />
            )}
          </div>
        ))}
      </div>

    </section>
  )
}
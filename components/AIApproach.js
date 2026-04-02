const STEPS = [
  {
    num: "01",
    icon: "🧩",
    title: "Problem Structuring",
    desc: "Break problems into deterministic logic + LLM-driven components.",
    color: "#60a5fa",
  },
  {
    num: "02",
    icon: "🔬",
    title: "Context Engineering",
    desc: "Extract structured data (AST, metadata, JSON inputs).",
    color: "#a78bfa",
  },
  {
    num: "03",
    icon: "✏️",
    title: "Prompt Design",
    desc: "Role-based prompts + schema enforcement.",
    color: "#22d3ee",
  },
  {
    num: "04",
    icon: "🛡️",
    title: "Validation Layer",
    desc: "Retry loops + rule-based output validation.",
    color: "#34d399",
  },
  {
    num: "05",
    icon: "📦",
    title: "Output Structuring",
    desc: "Convert LLM output into usable JSON/XML/UI.",
    color: "#fb923c",
  },
  {
    num: "06",
    icon: "📈",
    title: "Optimization",
    desc: "Continuous prompt tuning + error logging.",
    color: "#f472b6",
  },
]

export default function AIApproach() {
  return (
    <section className="relative max-w-6xl mx-auto px-6 py-28 overflow-hidden">

      {/* background orb */}
      <div className="gradient-glow w-[500px] h-[500px] bottom-0 right-0 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.1), transparent 65%)" }} />

      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl">⚙️</span>
        <h2 className="section-heading">How I Build AI Systems</h2>
      </div>
      <p className="text-gray-500 text-sm mt-6 mb-10 max-w-xl">
        A repeatable 6-step engineering process for production-grade LLM systems.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className="card-3d glow-border p-6 group cursor-default"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* step number */}
            <div
              className="text-xs font-black tracking-widest mb-3"
              style={{ color: step.color, opacity: 0.6 }}
            >
              ◈ STEP {step.num}
            </div>

            {/* icon + title row */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 animate-float"
                style={{
                  background: `${step.color}18`,
                  border: `1px solid ${step.color}30`,
                  animationDelay: `${i * 0.8}s`,
                }}
              >
                {step.icon}
              </span>
              <h3
                className="text-white font-semibold text-sm leading-tight"
                style={{ textShadow: `0 0 20px ${step.color}40` }}
              >
                {step.title}
              </h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>

            {/* animated accent line */}
            <div
              className="mt-4 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
            />
          </div>
        ))}
      </div>

    </section>
  )
}
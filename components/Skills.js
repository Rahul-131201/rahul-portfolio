const SKILL_CATEGORIES = [
  {
    icon: "🧠",
    label: "Core Expertise",
    color: "#60a5fa",
    items: [
      "Generative AI Systems",
      "LLM Prompt Engineering",
      "AI Automation Frameworks",
    ],
  },
  {
    icon: "⚙️",
    label: "Engineering",
    color: "#a78bfa",
    items: ["Python", "Java", "JavaScript", "Django", "REST APIs"],
  },
  {
    icon: "🧪",
    label: "Testing & Automation",
    color: "#22d3ee",
    items: ["Selenium", "API Testing", "Cucumber", "TestNG"],
  },
  {
    icon: "🛠️",
    label: "AI Tooling",
    color: "#34d399",
    items: ["GitHub Copilot", "GitLab Duo", "LLM APIs"],
  },
]

const SKILL_ICONS = {
  "Generative AI Systems": "✦",
  "LLM Prompt Engineering": "✦",
  "AI Automation Frameworks": "✦",
  Python: "🐍",
  Java: "☕",
  JavaScript: "⚡",
  Django: "🟢",
  "REST APIs": "🔗",
  Selenium: "🕷️",
  "API Testing": "🔬",
  Cucumber: "🥒",
  TestNG: "✅",
  "GitHub Copilot": "🤖",
  "GitLab Duo": "🦊",
  "LLM APIs": "🌐",
}

export default function Skills() {
  return (
    <section id="skills" className="relative max-w-6xl mx-auto px-6 py-28 overflow-hidden">

      {/* Orb */}
      <div className="gradient-glow w-[400px] h-[400px] top-0 left-[-100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.1), transparent 65%)" }} />

      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl">💡</span>
        <h2 className="section-heading">Skills</h2>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mt-10">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.label} className="card-3d glow-border p-6 flex flex-col gap-4">

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
            <div
              className="h-px rounded-full"
              style={{ background: `linear-gradient(90deg, ${cat.color}60, transparent)` }}
            />

            {/* Skills */}
            <ul className="flex flex-col gap-2">
              {cat.items.map((skill) => (
                <li key={skill} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 cursor-default">
                  <span
                    className="text-xs transition-transform duration-200 group-hover:scale-125"
                    style={{ color: cat.color }}
                  >
                    {SKILL_ICONS[skill] ?? "◆"}
                  </span>
                  {skill}
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

    </section>
  )
}
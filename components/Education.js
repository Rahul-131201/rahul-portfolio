const EDUCATION = [
  {
    icon: "🎓",
    degree: "Bachelor of Technology – Electronics & Telecommunications Engineering",
    school: "Pimpri Chinchwad College of Engineering, Pune",
    detail: "CGPA: 8.2",
    color: "#60a5fa",
  },
  {
    icon: "📚",
    degree: "Higher Secondary Certificate (HSC)",
    school: "Shraddha College of Science, Ichalkaranji, Maharashtra",
    detail: "Score: 80.15% | 2020",
    color: "#a78bfa",
  },
  {
    icon: "🏫",
    degree: "Secondary School Certificate (SSC)",
    school: "Saraswati Vidyamandir, Pachal, Maharashtra",
    detail: "Score: 97.20% | 2018",
    color: "#22d3ee",
  },
]

const TRAINING = [
  {
    icon: "🧠",
    institute: "SevenMentor Training Pvt Ltd",
    program: "Data Science",
    color: "#f59e0b",
    modules: ["Python", "SQL", "Probability & Statistics", "Data Science & Machine Learning", "Artificial Intelligence"],
  },
]

export default function Education() {
  return (
    <section id="education" className="relative max-w-6xl mx-auto px-6 py-28 overflow-hidden">

      {/* Orb */}
      <div className="gradient-glow w-[400px] h-[400px] bottom-0 left-[-100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.08), transparent 65%)" }} />

      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl">🎓</span>
        <h2 className="section-heading">Education</h2>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {EDUCATION.map((edu, i) => (
          <div
            key={edu.degree}
            className="card-3d glow-border p-6 flex flex-col gap-4"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <span
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl animate-float"
              style={{
                background: `${edu.color}18`,
                border: `1px solid ${edu.color}30`,
                animationDelay: `${i * 1.5}s`,
              }}
            >
              {edu.icon}
            </span>

            <div>
              <h3 className="text-white font-semibold text-sm leading-snug">{edu.degree}</h3>
              <p className="text-gray-500 text-xs mt-1.5">{edu.school}</p>
            </div>

            <div
              className="mt-auto px-3 py-1.5 rounded-lg text-xs font-semibold w-fit"
              style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
            >
              ◈ {edu.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Training subsection */}
      <div className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl">📋</span>
          <h3 className="text-lg font-bold text-white tracking-wide">Professional Training</h3>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.3), transparent)" }} />
        </div>

        {TRAINING.map((t, i) => (
          <div key={i} className="card-3d glow-border p-6 flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <span className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl animate-float" style={{ background: `${t.color}18`, border: `1px solid ${t.color}30` }}>
                {t.icon}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide" style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}>
                Training
              </span>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-base">{t.institute}</h4>
              <p className="text-sm mt-0.5" style={{ color: t.color }}>◈ {t.program} Program</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.modules.map((mod) => (
                  <span key={mod} className="px-3 py-1 rounded-lg text-xs font-medium" style={{ background: `${t.color}12`, color: t.color, border: `1px solid ${t.color}25` }}>
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
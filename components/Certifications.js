"use client"

import { useReveal } from "../hooks/useReveal"

const CERTS = [
  {
    icon: "📊",
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google · Coursera",
    tag: "Google Certified",
    color: "#34d399",
    period: "Jun 2023 – Dec 2023",
    href: "https://www.coursera.org/professional-certificates/google-data-analytics",
    description: "Processed, prepared, and analyzed data; solved data-based problems; created data visualizations; worked with various data types and structures; and provided data-driven recommendations.",
    skills: ["Data Analysis", "Data Visualization", "Data Ethics", "Tableau", "SQL", "R Programming"],
  },
  {
    icon: "🐍",
    title: "Python for Data Science, AI and Development",
    issuer: "IBM",
    tag: "IBM Certified",
    color: "#60a5fa",
  },
  {
    icon: "🤖",
    title: "Generative AI for Beginners",
    issuer: "Online Certification",
    tag: "Generative AI",
    color: "#a78bfa",
  },
  {
    icon: "💬",
    title: "Understanding Prompt Engineering",
    issuer: "Online Certification",
    tag: "Prompt Engineering",
    color: "#22d3ee",
  },
]

export default function Certifications() {
  const sectionRef = useReveal()

  return (
    <section id="certifications" ref={sectionRef} className="relative max-w-6xl mx-auto px-6 py-28 overflow-hidden">

      <div className="gradient-glow w-[400px] h-[400px] top-[-50px] right-[-100px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(96,165,250,0.1), transparent 65%)" }} />

      <div className="reveal flex items-center gap-4 mb-3">
        <span className="text-2xl">🏆</span>
        <h2 className="section-heading">Certifications</h2>
      </div>
      <p className="reveal text-gray-400 mt-7 max-w-xl leading-relaxed" style={{ animationDelay: "0.1s" }}>
        Validated expertise in <span className="text-blue-400 font-medium">AI, machine learning</span>, <span className="text-green-400 font-medium">data analytics</span>, and <span className="text-purple-400 font-medium">prompt engineering</span> through industry-recognized programs.
      </p>

      <div className="reveal mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ animationDelay: "0.2s" }}>
        {CERTS.map((cert, i) => (
          <div key={i} className="card-3d glow-border p-6 flex flex-col gap-4" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 animate-float" style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}30`, animationDelay: `${i * 1.1}s` }}>
                {cert.icon}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide" style={{ background: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}30` }}>
                {cert.tag}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold leading-snug text-sm">{cert.title}</p>
              <p className="text-gray-500 text-xs mt-1 font-medium tracking-wide">◈ {cert.issuer}</p>
              {cert.period && (
                <p className="text-gray-600 text-xs mt-1">🗓 {cert.period}</p>
              )}
              {cert.description && (
                <p className="text-gray-400 text-xs mt-3 leading-relaxed">{cert.description}</p>
              )}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cert.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-xs font-medium" style={{ background: `${cert.color}12`, color: cert.color, border: `1px solid ${cert.color}25` }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="pt-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: cert.color }} />
                <span className="text-xs text-gray-500">Certified</span>
              </div>
              {cert.href && (
                <a href={cert.href} target="_blank" rel="noopener noreferrer" className="text-xs font-medium transition-colors hover:opacity-100 opacity-60" style={{ color: cert.color }}>
                  View →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

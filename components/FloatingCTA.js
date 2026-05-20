"use client"

export default function FloatingCTA() {
  return (
    <div className="fixed top-4 right-6 z-9997">
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(96,165,250,0.18)", animationDuration: "1.8s" }} />
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(167,139,250,0.1)", animationDuration: "1.8s", animationDelay: "0.6s" }} />
      <a
        href="#contact"
        className="relative flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(96,165,250,0.5)]"
        style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", boxShadow: "0 0 20px rgba(96,165,250,0.35)" }}
      >
        <span>✉</span>
        <span>Hire Me</span>
      </a>
    </div>
  )
}


"use client"

import { useState } from "react"

const LINKS = [
  {
    icon: "✉️",
    label: "Email",
    value: "rahulramane1312@email.com",
    href: "mailto:rahulramane1312@email.com",
    color: "#60a5fa",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "rahul-ramane-427a43217",
    href: "https://www.linkedin.com/in/rahul-ramane-427a43217/",
    color: "#0ea5e9",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "Rahul-131201",
    href: "https://github.com/Rahul-131201",
    color: "#a78bfa",
  },
]

const FORM_ENDPOINT = "https://formspree.io/f/xwvwnkwn"

export default function Contact() {
  const [fields, setFields]   = useState({ name: "", email: "", message: "" })
  const [status, setStatus]   = useState("idle")

  const handleChange = (e) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        setStatus("success")
        setFields({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="relative max-w-6xl mx-auto px-6 py-28 overflow-hidden">

      <div className="gradient-glow w-[500px] h-[500px] bottom-[-100px] right-[-100px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(96,165,250,0.1), transparent 65%)" }} />

      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl">📡</span>
        <h2 className="section-heading">Contact</h2>
      </div>

      <p className="text-gray-400 mt-7 max-w-xl leading-relaxed">
        Open to opportunities in{" "}
        <span className="text-blue-400 font-medium">Generative AI Engineering</span>,{" "}
        <span className="text-purple-400 font-medium">AI automation platforms</span>{" "}and{" "}
        <span className="text-cyan-400 font-medium">developer productivity tools</span>.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        {LINKS.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Contact via ${link.label}: ${link.value}`} className="card-3d glow-border flex items-center gap-4 px-5 py-4 flex-1 group">
            <span className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 animate-float" style={{ background: `${link.color}18`, border: `1px solid ${link.color}30` }}>
              {link.icon}
            </span>
            <div className="overflow-hidden">
              <p className="text-xs font-bold tracking-widest" style={{ color: link.color }}>◈ {link.label.toUpperCase()}</p>
              <p className="text-gray-300 group-hover:text-white transition-colors text-sm mt-0.5 truncate">{link.value}</p>
            </div>
            <span className="ml-auto text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 text-lg">→</span>
          </a>
        ))}
      </div>

      {/* Contact form */}
      <div className="mt-14 card-3d glow-border p-8">
        <h3 className="text-white font-bold text-lg mb-1">Send a Message</h3>
        <p className="text-gray-500 text-sm mb-7">
          {"Prefer a direct ping? Drop a message and I'll get back to you."}
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="text-4xl animate-float">✅</span>
            <p className="text-green-400 font-semibold">Message sent successfully!</p>
            <p className="text-gray-500 text-sm">{"I'll be in touch soon."}</p>
            <button onClick={() => setStatus("idle")} className="mt-4 px-5 py-2 text-xs rounded-xl border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-colors">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-xs font-semibold text-gray-400 tracking-wider">NAME</label>
                <input id="contact-name" name="name" type="text" required value={fields.name} onChange={handleChange} placeholder="Your name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-xs font-semibold text-gray-400 tracking-wider">EMAIL</label>
                <input id="contact-email" name="email" type="email" required value={fields.email} onChange={handleChange} placeholder="your@email.com" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-xs font-semibold text-gray-400 tracking-wider">MESSAGE</label>
              <textarea id="contact-message" name="message" required rows={5} value={fields.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all resize-none" />
            </div>
            {status === "error" && (
              <p className="text-red-400 text-sm">Something went wrong. Please try emailing directly.</p>
            )}
            <div className="flex items-center gap-4">
              <button type="submit" disabled={status === "loading"} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all hover:shadow-[0_0_25px_rgba(96,165,250,0.4)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {status === "loading" ? "Sending..." : "Send Message →"}
              </button>
              <p className="text-gray-600 text-xs">Powered by Formspree</p>
            </div>
          </form>
        )}
      </div>

      <div className="mt-20 pt-6 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="text-gray-600 text-xs">◈ Rahul Ramane · Gen AI Engineer</span>
        <span className="text-gray-700 text-xs">Built with Next.js + Three.js + Tailwind CSS</span>
      </div>

    </section>
  )
}

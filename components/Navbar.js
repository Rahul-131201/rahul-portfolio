"use client"

import { useEffect, useState } from "react"

const NAV_LINKS = [
  { href: "#summary",        label: "Summary"    },
  { href: "#skills",         label: "Skills"     },
  { href: "#experience",     label: "Experience" },
  { href: "#projects",       label: "Projects"   },
  { href: "#education",      label: "Education"  },
  { href: "#certifications", label: "Certs"      },
  { href: "#contact",        label: "Contact"    },
]

export default function Navbar() {
  const [active, setActive]   = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ids = NAV_LINKS.map(({ href }) => href.slice(1))
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id)
        })
      },
      { rootMargin: "-38% 0px -58% 0px", threshold: 0 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // Close drawer on route-hash change (link click)
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        background: "rgba(2,6,23,0.85)",
        borderBottom: "1px solid rgba(96,165,250,0.12)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(96,165,250,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Brand */}
        <a href="#" className="group flex items-center gap-2" onClick={handleLinkClick}>
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
            RR
          </span>
          <span className="font-bold text-lg tracking-wide" style={{ background: "linear-gradient(90deg, #f1f5f9, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Rahul Ramane
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = active === href
            return (
              <a key={href} href={href} className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 group ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}>
                {label}
                <span className={`absolute bottom-1 left-4 right-4 h-px rounded-full transition-all duration-250 ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}`} style={{ background: "linear-gradient(90deg, #60a5fa, #a78bfa)", transformOrigin: "left" }} />
              </a>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-[2px] bg-gray-300 rounded-full transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-[2px] bg-gray-300 rounded-full transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[2px] bg-gray-300 rounded-full transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>

      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"}`}
        style={{ borderTop: menuOpen ? "1px solid rgba(96,165,250,0.1)" : "none" }}
      >
        <div className="flex flex-col px-6 pt-3 gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = active === href
            return (
              <a
                key={href}
                href={href}
                onClick={handleLinkClick}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isActive ? "text-white bg-white/8" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                style={isActive ? { background: "rgba(96,165,250,0.08)", borderLeft: "2px solid #60a5fa" } : {}}
              >
                {label}
              </a>
            )
          })}
        </div>
      </div>

    </nav>
  )
}

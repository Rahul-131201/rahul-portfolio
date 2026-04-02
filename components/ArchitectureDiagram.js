"use client"

import { useEffect, useRef } from "react"

export default function ArchitectureDiagram({ nodes = [] }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const arrows = containerRef.current?.querySelectorAll(".flow-arrow")
    arrows?.forEach((arrow, index) => {
      arrow.style.animationDelay = `${index * 0.3}s`
    })
  }, [])

  if (!nodes || nodes.length === 0) return null

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-3 text-sm">
      {nodes.map((node, i) => (
        <div key={i} className="flex flex-col items-center w-full">

          {/* Node */}
          <div
            className="w-full max-w-xs px-5 py-3 rounded-xl text-center text-white text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(96,165,250,0.25)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 20px rgba(96,165,250,0.08)",
            }}
          >
            <span className="text-blue-400/60 mr-2 text-xs">{String(i + 1).padStart(2, "0")}</span>
            {node}
          </div>

          {/* Connector */}
          {i < nodes.length - 1 && (
            <div className="flex flex-col items-center my-1">
              <div
                className="w-[2px] h-8 relative overflow-hidden"
                style={{ background: "linear-gradient(180deg, rgba(96,165,250,0) 0%, #60a5fa 50%, rgba(96,165,250,0) 100%)" }}
              >
                <div className="flow-arrow absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full" />
              </div>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="mt-[-2px]">
                <path d="M6 8 L0 0 L12 0 Z" fill="#60a5fa" opacity="0.8" />
              </svg>
            </div>
          )}

        </div>
      ))}

      <style jsx>{`
        @keyframes flow {
          0%   { transform: translate(-50%, 0px); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(-50%, 32px); opacity: 0; }
        }
        .flow-arrow {
          animation: flow 1.4s linear infinite;
        }
      `}</style>
    </div>
  )
}
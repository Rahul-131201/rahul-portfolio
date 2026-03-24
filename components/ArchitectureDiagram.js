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

<div ref={containerRef} className="flex flex-col items-center gap-6 text-sm">

{nodes.map((node, i) => (

<div key={i} className="flex flex-col items-center">

{/* Node Box */}
<div className="border border-gray-700 bg-black/60 rounded-lg px-5 py-3 text-center w-64 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition">
{node}
</div>

{/* Animated Arrow */}
{i < nodes.length - 1 && (
<div className="relative flex flex-col items-center mt-2">

{/* glowing vertical line */}
<div className="w-[2px] h-10 bg-gradient-to-b from-blue-500/0 via-blue-500 to-blue-500/0 relative overflow-hidden">

{/* flowing particle */}
<div className="flow-arrow absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full blur-[1px] animate-flow" />

</div>

{/* arrow head */}
<div className="text-blue-400 text-lg mt-1">↓</div>

</div>
)}

</div>

))}

{/* Animation styles */}
<style jsx>{`
@keyframes flow {
  0% {
    transform: translate(-50%, 0px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 40px);
    opacity: 0;
  }
}

.animate-flow {
  animation: flow 1.5s linear infinite;
}
`}</style>

</div>

)

}
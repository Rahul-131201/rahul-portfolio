export default function Summary() {
  return (
    <section id="summary" className="relative max-w-6xl mx-auto px-6 py-28 overflow-hidden">

      {/* Orb */}
      <div className="gradient-glow w-[400px] h-[400px] top-0 right-0 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.08), transparent 65%)" }} />

      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl">👤</span>
        <h2 className="section-heading">Professional Summary</h2>
      </div>

      <div
        className="mt-10 card-3d p-8 max-w-3xl relative overflow-hidden"
      >
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, rgba(96,165,250,0.12), transparent 70%)" }} />

        <span className="text-4xl text-blue-400/20 font-black absolute top-4 left-6 select-none">&ldquo;</span>

        <p className="text-gray-400 leading-relaxed relative z-10 pl-6">
          Software Engineer at{" "}
          <span className="text-white font-semibold">Capgemini</span>{" "}
          specializing in{" "}
          <span className="text-blue-400 font-medium">Generative AI</span>,
          intelligent automation and AI-driven testing systems.
          <br /><br />
          Experienced in designing{" "}
          <span className="text-purple-400 font-medium">LLM-powered developer tools</span>,
          automation frameworks and AI agents that improve
          software testing efficiency and reduce manual engineering effort.
          <br /><br />
          Strong background in{" "}
          <span className="text-cyan-400 font-medium">Python, Java, Selenium</span>{" "}
          and API automation
          with experience building AI-assisted systems using Django,
          Streamlit and prompt engineering techniques.
          <br /><br />
          Focused on transforming traditional QA workflows using
          <span className="text-green-400 font-medium"> agentic AI solutions</span>,
          automation frameworks and LLM integrations.
        </p>

        <span className="text-4xl text-blue-400/20 font-black absolute bottom-4 right-6 select-none rotate-180">&rdquo;</span>
      </div>

    </section>
  )
}
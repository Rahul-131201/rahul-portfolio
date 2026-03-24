export default function Hero(){
  return(
    <section className="max-w-6xl mx-auto px-6 py-32">

      <h1 className="text-5xl font-bold leading-tight">
        Gen AI Engineer (QA)
        <br/>
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Building LLM-Powered Systems
        </span>
      </h1>

      <p className="mt-6 text-gray-400 max-w-2xl">
        I design and build production-grade Generative AI systems that automate
        software testing, accelerate QA workflows, and enhance developer productivity.

        Specialized in LLM pipelines, agentic workflows, and AI-powered automation platforms.
      </p>

      {/* Impact Section */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
        <div className="bg-white/5 p-4 rounded-xl">90–100% Test Case Generation Accuracy</div>
        <div className="bg-white/5 p-4 rounded-xl">25%-50% Reduction in QA Documentation Effort</div>
        <div className="bg-white/5 p-4 rounded-xl">5+ AI Automation Solutions Delivered</div>
        <div className="bg-white/5 p-4 rounded-xl">LLM-Powered QA & Automation Systems</div>
      </div>

      <div className="mt-10 flex gap-4">
        <a href="#projects" className="bg-white text-black px-6 py-3 rounded-xl">
          Explore AI Systems →
        </a>

        <a 
          href="/Rahul_Ramane_Resume.pdf" 
          target="_blank"
          className="px-6 py-2 bg-blue-600 rounded-lg"
        >
          Download Resume
        </a>
      </div>

    </section>
  )
}
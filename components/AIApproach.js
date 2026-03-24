export default function AIApproach(){
  return(
    <section className="max-w-6xl mx-auto px-6 py-24">

      <h2 className="text-3xl font-semibold">How I Build AI Systems</h2>

      <div className="mt-10 grid md:grid-cols-3 gap-6 text-sm text-gray-400">

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-white font-semibold">1. Problem Structuring</h3>
          <p className="mt-3">Break problems into deterministic logic + LLM-driven components.</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-white font-semibold">2. Context Engineering</h3>
          <p className="mt-3">Extract structured data (AST, metadata, JSON inputs).</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-white font-semibold">3. Prompt Design</h3>
          <p className="mt-3">Role-based prompts + schema enforcement.</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-white font-semibold">4. Validation Layer</h3>
          <p className="mt-3">Retry loops + rule-based output validation.</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-white font-semibold">5. Output Structuring</h3>
          <p className="mt-3">Convert LLM output into usable JSON/XML/UI.</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-white font-semibold">6. Optimization</h3>
          <p className="mt-3">Continuous prompt tuning + error logging.</p>
        </div>

      </div>

    </section>
  )
}
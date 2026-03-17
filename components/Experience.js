export default function Experience(){

return(

<section id="experience" className="max-w-6xl mx-auto px-6 py-24">

<h2 className="text-3xl font-semibold">Professional Experience</h2>

<div className="mt-10 space-y-10">

{/* Capgemini */}

<div className="bg-white/5 border border-gray-800 p-8 rounded-xl">

<h3 className="text-xl font-semibold">Capgemini India</h3>
<p className="text-sm text-gray-400">Software Engineer | Sep 2024 – Present</p>
<p className="mt-4 text-gray-400 text-sm">
Working on enterprise Generative AI solutions focused on
software testing automation, developer productivity tools
and AI‑driven QA engineering systems.
</p>

</div>

{/* JMeter AI System */}

<div className="bg-white/5 border border-gray-800 p-8 rounded-xl">

<h3 className="font-semibold">AI‑Driven JMeter Script Generation Platform</h3>

<ul className="text-gray-400 text-sm mt-4 space-y-2">

<li>Collaborated with SMEs to analyze performance testing requirements and document end‑to‑end use cases.</li>

<li>Designed an AI‑assisted system to generate JMeter performance scripts using GitHub Copilot and prompt engineering.</li>

<li>Built a Django backend automation framework with a Streamlit frontend for execution and validation.</li>

<li>Performed API validation using Postman and automated script verification using JMeter.</li>

<li>Developed utilities to detect and extract hidden URLs within complex web applications.</li>
</ul>

</div>

{/* Tosca Migration Agent */}

<div className="bg-white/5 border border-gray-800 p-8 rounded-xl">

<h3 className="font-semibold">Tosca Script to Manual Test Case Migration Agent</h3>

<ul className="text-gray-400 text-sm mt-4 space-y-2">

<li>Designed an AI‑powered Django agent converting Tosca automation scripts into detailed manual test cases.</li>

<li>Leveraged prompt engineering to generate metadata, titles and structured test steps.</li>

<li>Developed REST APIs for upload, processing and batch conversion workflows.</li>

<li>Integrated a Streamlit UI for interaction, execution and validation.</li>

<li>Built parsing utilities for Tosca scripts and automated validation pipelines.</li>

</ul>

</div>

{/* NatWest Engagement */}

<div className="bg-white/5 border border-gray-800 p-8 rounded-xl">

<h3 className="font-semibold">NatWest Wealth – GenAI Automation Use Cases</h3>

<ul className="text-gray-400 text-sm mt-4 space-y-2">

<li>Built an IDE‑integrated GenAI solution converting Tosca scripts into structured manual test cases with 90‑100% accuracy.</li>

<li>Reduced manual documentation effort by 25% through automated generation workflows.</li>

<li>Developed a UiPath script review automation engine validating scripts against standardized quality checklists.</li>

<li>Generated automated pass/fail analysis reports with remediation recommendations.</li>

<li>Designed an AI agent generating UiPath XML automation scripts from Tosca scripts.</li>

<li>Established reusable templates and best practices for RPA script generation.</li>

</ul>

</div>
</div>

</section>

)

}

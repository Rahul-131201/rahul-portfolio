
"use client"

import { useState } from "react"
import ArchitectureDiagram from "./ArchitectureDiagram"

export default function Experience(){

const [selectedArch, setSelectedArch] = useState(null)

return(
<section id="experience" className="max-w-6xl mx-auto px-6 py-24">

<h2 className="text-3xl font-semibold">Professional Experience</h2>

<div className="mt-12 space-y-16 text-gray-400">

{/* ---- TRAINING ---- */}
<div className="bg-white/5 border border-gray-800 p-6 rounded-xl">

<h4 className="text-white font-semibold">
Java + Selenium Automation Training & Project
</h4>

<p className="text-xs text-blue-400 mt-1">
Java • Selenium • Test Automation • Agile (Sprint-based)
</p>

<p className="mt-4 text-sm">
<b>Context:</b> Completed 3-month structured training program at Capgemini focused on automation testing fundamentals.
</p>

<ul className="mt-4 list-disc list-inside text-sm space-y-2">
<li>Worked on real-world website automation project (Ixigo)</li>
<li>Developed Selenium-based test scripts using Java</li>
<li>Executed test scenarios within Agile sprint cycles</li>
<li>Participated in test case design, execution, and validation</li>
<li>Gained hands-on experience with automation frameworks</li>
</ul>

<p className="mt-4 text-green-400 text-xs">
Impact: Built strong foundation in automation testing and Agile workflows
</p>

</div>

{/* ================= CAPGEMINI ================= */}

<div>

<h3 className="text-white text-xl font-semibold">Capgemini India</h3>
<p className="text-sm mt-1">Software Engineer | Sept 2024 – Present</p>

<div className="mt-8 space-y-10">

{/* ---- JMeter ---- */}
<div className="bg-white/5 border border-gray-800 p-6 rounded-xl">

<h4 className="text-white font-semibold">
AI-Powered JMeter Script Generation Platform
</h4>

<p className="text-xs text-blue-400 mt-1">
Prompt Engineering • JMeter • Django • Streamlit • API Automation
</p>

<p className="mt-4 text-sm">
<b>Problem:</b> Performance test scripting required heavy manual effort and lacked consistency.
</p>

<p className="mt-2 text-sm">
<b>Solution:</b> Built an AI-assisted system to generate JMeter scripts using prompt engineering and backend automation.
</p>

<ul className="mt-4 list-disc list-inside text-sm space-y-2">
<li>Collaborated with SMEs to define performance testing use cases</li>
<li>Automated JMeter script generation using GitHub Copilot</li>
<li>Built Django-based backend for script processing</li>
<li>Developed Streamlit UI for execution and validation</li>
<li>Performed API validation using Postman</li>
<li>Automated script verification using JMeter</li>
<li>Built utility to extract hidden URLs from complex web apps</li>
</ul>

<button
onClick={()=>setSelectedArch({
title:"JMeter AI Platform Architecture",
nodes:[
"User Input",
"Streamlit UI",
"Django API Layer",
"Prompt Engineering",
"LLM Processing",
"JMeter Script Output",
"Validation Layer"
]
})}
className="mt-4 text-blue-400 text-sm hover:underline"
>
View Architecture →
</button>

<p className="mt-4 text-green-400 text-xs">
Impact: Reduced manual scripting effort and improved consistency
</p>

</div>

{/* ---- TOSCA AGENT ---- */}
<div className="bg-white/5 border border-gray-800 p-6 rounded-xl">

<h4 className="text-white font-semibold">
Tosca → Manual Test Case Migration Agent
</h4>

<p className="text-xs text-blue-400 mt-1">
Prompt Engineering • Django • API Development • Test Automation
</p>

<p className="mt-4 text-sm">
<b>Problem:</b> Manual test case creation from Tosca scripts was time-consuming and inconsistent.
</p>

<p className="mt-2 text-sm">
<b>Solution:</b> Developed an AI-powered Django agent to convert Tosca scripts into structured test cases.
</p>

<ul className="mt-4 list-disc list-inside text-sm space-y-2">
<li>Built LLM-based pipeline for metadata and step generation</li>
<li>Developed REST APIs for upload, conversion, and download workflows</li>
<li>Integrated Streamlit frontend for user interaction</li>
<li>Generated structured titles, steps, and descriptions using AI</li>
<li>Built parsing utilities and batch processing workflows</li>
<li>Implemented validation mechanisms for output quality</li>
</ul>

<button
onClick={()=>setSelectedArch({
title:"Tosca Migration Agent Architecture",
nodes:[
"Upload Tosca Script",
"Parser Engine",
"Prompt Builder",
"LLM Processing",
"Test Case Generator",
"Download Output"
]
})}
className="mt-4 text-blue-400 text-sm hover:underline"
>
View Architecture →
</button>

<p className="mt-4 text-green-400 text-xs">
Impact: Achieved 97–100% automated conversion accuracy, reducing manual effort by 80%.
</p>

</div>

</div>
</div>

{/* ================= NATWEST ================= */}

<div>

<h3 className="text-white text-xl font-semibold">NATWEST (Wealth Client)</h3>
<p className="text-sm mt-1">July 2025 – Dec 2025</p>

<div className="mt-8 space-y-10">

{/* ---- USE CASE 1 ---- */}
<div className="bg-white/5 border border-gray-800 p-6 rounded-xl">

<h4 className="text-white font-semibold">
Tosca → Manual Test Case Migration (IDE Integrated)
</h4>

<p className="text-xs text-blue-400 mt-1">
Prompt Engineering • Python • GitLab Duo
</p>

<p className="mt-4 text-sm">
<b>Problem:</b> Manual documentation of test cases from automation scripts was inefficient.
</p>

<p className="mt-2 text-sm">
<b>Solution:</b> Developed IDE-integrated GenAI solution using GitLab Duo to generate structured test cases.
</p>

<ul className="mt-4 list-disc list-inside text-sm space-y-2">
<li>Transformed Tosca scripts into structured functional test cases</li>
<li>Used standardized templates for consistency</li>
<li>Generated detailed step-wise outputs</li>
<li>Built strong understanding of Tosca command structures</li>
</ul>

<button
onClick={()=>setSelectedArch({
title:"IDE GenAI Migration Architecture",
nodes:[
"Tosca Script Input",
"IDE Integration",
"Prompt Templates",
"LLM (GitLab Duo)",
"Test Case Output"
]
})}
className="mt-4 text-blue-400 text-sm hover:underline"
>
View Architecture →
</button>

<p className="mt-4 text-green-400 text-xs">
Impact: 90–100% conversion accuracy and 25% reduction in manual effort
</p>

</div>

{/* ---- USE CASE 2 ---- */}
<div className="bg-white/5 border border-gray-800 p-6 rounded-xl">

<h4 className="text-white font-semibold">
UiPath Script Review Automation
</h4>

<p className="text-xs text-blue-400 mt-1">
Python • Prompt Engineering • GitLab Duo
</p>

<p className="mt-4 text-sm">
<b>Problem:</b> Manual validation of UiPath scripts lacked consistency and standardization.
</p>

<p className="mt-2 text-sm">
<b>Solution:</b> Built AI-powered validation engine using rule-based + prompt-based analysis.
</p>

<ul className="mt-4 list-disc list-inside text-sm space-y-2">
<li>Developed standardized QA checklist for UiPath scripts</li>
<li>Automated validation using GenAI prompts</li>
<li>Generated pass/fail reports with recommendations</li>
<li>Provided remediation insights for improvements</li>
</ul>

<button
onClick={()=>setSelectedArch({
title:"UiPath Review Engine Architecture",
nodes:[
"Upload UiPath Script",
"Checklist Engine",
"Prompt Validator",
"LLM Analysis",
"Report Generator"
]
})}
className="mt-4 text-blue-400 text-sm hover:underline"
>
View Architecture →
</button>

<p className="mt-4 text-green-400 text-xs">
Impact: Generated reports with 80–90% accuracy, cutting manual effort by 50–52%.
</p>

</div>

{/* ---- USE CASE 3 ---- */}
<div className="bg-white/5 border border-gray-800 p-6 rounded-xl">

<h4 className="text-white font-semibold">
UiPath Script Generation using GenAI
</h4>

<p className="text-xs text-blue-400 mt-1">
GenAI • XML Processing • Prompt Engineering
</p>

<p className="mt-4 text-sm">
<b>Problem:</b> Manual creation of UiPath scripts was time-intensive and repetitive.
</p>

<p className="mt-2 text-sm">
<b>Solution:</b> Built GenAI solution to generate UiPath XML scripts directly from Tosca scripts.
</p>

<ul className="mt-4 list-disc list-inside text-sm space-y-2">
<li>Generated UiPath-compatible XML scripts</li>
<li>Captured test data and comments effectively</li>
<li>Worked without selectors using structured prompts</li>
<li>Created reusable templates for script generation</li>
</ul>

<button
onClick={()=>setSelectedArch({
title:"UiPath Generator Architecture",
nodes:[
"Tosca Script Input",
"Transformation Logic",
"Prompt Engine",
"LLM",
"XML Script Output"
]
})}
className="mt-4 text-blue-400 text-sm hover:underline"
>
View Architecture →
</button>

<p className="mt-4 text-green-400 text-xs">
Impact: Accelerated RPA development and improved consistency
</p>

</div>

</div>
</div>

</div>

{/* ===== MODAL ===== */}
{selectedArch && (
<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

<div className="bg-black border border-gray-700 rounded-xl p-8 max-w-lg w-full relative">

<button
onClick={()=>setSelectedArch(null)}
className="absolute top-3 right-4 text-gray-400 hover:text-white"
>
✕
</button>

<h3 className="text-lg font-semibold mb-6">
{selectedArch.title}
</h3>

<ArchitectureDiagram nodes={selectedArch.nodes} />

</div>

</div>
)}

</section>
)
}
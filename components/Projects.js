"use client"

import { useState } from "react"
import ArchitectureDiagram from "./ArchitectureDiagram"

export default function Projects(){

const [selectedProject, setSelectedProject] = useState(null)

const projects=[

{
 title:"Tosca Script → Manual Test Case Migration Agent",
 impact:"90–100% automated conversion accuracy with 25% time savings",
 description:"AI agent converting Tosca automation scripts into structured functional test cases using LLM prompt engineering and Django APIs.",
 architecture:[
  "Input Tosca Script",
  "Parser",
  "Prompt Builder",
  "LLM Processing",
  "Test Case Generator",
  "Output UI"
 ]
},

{
 title:"UiPath Script Review Automation",
 impact:"80-90% automated conversion accuracy with 52% time savings",
 description:"AI validation engine reviewing UiPath automation scripts against standardized compliance and quality checklists.",
 architecture:[
  "Upload Script",
  "Checklist Engine",
  "LLM Validator",
  "Report Generator"
 ]
},

{
 title:"UiPath Script Generation Agent",
 impact:"Automated RPA script creation",
 description:"GenAI system generating UiPath XML automation scripts directly from Tosca scripts using prompt engineered templates.",
 architecture:[
  "Input Tosca Script",
  "Transformation Logic",
  "Prompt Engine",
  "LLM",
  "XML Generator"
 ]
},

{
 title:"AI JMeter Script Generation Platform",
 impact:"Reduced manual scripting effort",
 description:"AI-assisted performance testing platform generating JMeter scripts integrated with Django backend automation and Streamlit UI.",
 architecture:[
  "User Input",
  "API Layer",
  "Prompt Engine",
  "LLM",
  "JMeter Script Output"
 ]
}

]

return(

<section id="projects" className="max-w-6xl mx-auto px-6 py-24">

<h2 className="text-3xl font-semibold">AI Engineering Projects</h2>

<div className="grid md:grid-cols-2 gap-8 mt-10">

{projects.map(project=>(

<div key={project.title} className="bg-white/5 backdrop-blur-lg border border-gray-800 p-8 rounded-xl hover:scale-105 transition">

<h3 className="text-lg font-semibold">
{project.title}
</h3>

<p className="text-gray-400 mt-3 text-sm">
{project.description}
</p>

<p className="text-green-400 mt-4 text-xs">
Impact: {project.impact}
</p>

<button
onClick={()=>setSelectedProject(project)}
className="mt-4 text-blue-400 text-sm hover:underline"
>
View Architecture →
</button>

</div>

))}

</div>

{/* Modal */}
{selectedProject && (

<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

<div className="bg-black border border-gray-700 rounded-xl p-8 max-w-lg w-full relative">

<button
onClick={()=>setSelectedProject(null)}
className="absolute top-3 right-4 text-gray-400 hover:text-white"
>
✕
</button>

<h3 className="text-lg font-semibold mb-6">
{selectedProject.title} Architecture
</h3>

<ArchitectureDiagram nodes={selectedProject.architecture} />

</div>

</div>

)}

</section>

)

}
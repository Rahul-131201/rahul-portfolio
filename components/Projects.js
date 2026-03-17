
// =====================================================
// components/Projects.js
// =====================================================

import ArchitectureDiagram from "./ArchitectureDiagram"

export default function Projects(){

const projects=[

{
 title:"Tosca Script → Manual Test Case Migration Agent",
 impact:"90–100% automated conversion accuracy",
 description:"AI agent converting Tosca automation scripts into structured functional test cases using LLM prompt engineering and Django APIs.",
 architecture:["Tosca Script Upload","Parser","Prompt Engine","LLM Processing","Test Case Generator","Download API"]
},

{
 title:"UiPath Script Review Automation",
 impact:"Automated QA validation and reporting",
 description:"AI validation engine reviewing UiPath automation scripts against standardized compliance and quality checklists.",
 architecture:["UiPath XML","Rule Engine","Prompt Analysis","Validation Logic","Report Generator","QA Dashboard"]
},

{
 title:"UiPath Script Generation Agent",
 impact:"Automated RPA script creation",
 description:"GenAI system generating UiPath XML automation scripts directly from Tosca scripts using prompt engineered templates.",
 architecture:["Tosca Input","Metadata Extractor","Prompt Template","LLM Generator","XML Builder","UiPath Output"]
},

{
 title:"AI JMeter Script Generation Platform",
 impact:"Reduced manual scripting effort",
 description:"AI-assisted performance testing platform generating JMeter scripts integrated with Django backend automation and Streamlit UI.",
 architecture:["Performance Requirements","Prompt Builder","Copilot / LLM","JMeter Script","Validation","Execution"]
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

<ArchitectureDiagram nodes={project.architecture}/>

</div>

))}

</div>

</section>

)

}

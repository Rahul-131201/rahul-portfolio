"use client"

import { useState } from "react"
import ArchitectureDiagram from "./ArchitectureDiagram"

export default function OtherProjects(){

const [selectedProject, setSelectedProject] = useState(null)

const projects=[
{

 title:"English to Hinglish Machine Translation using Deep Learning",

 description:"Developed a deep learning based machine translation system that converts English text into Hinglish while preserving semantic meaning and grammatical correctness.",

 tech:"AI/ML, Python, Keras, TensorFlow",

 architecture:["English Input","Tokenizer","Embedding Layer","Seq2Seq Model","Decoder","Hinglish Output"]

},
{

 title:"Diabetic Macular Edema Grading using Deep Learning",

 description:"Built a deep learning system to classify diabetic macular edema severity using retinal images achieving high accuracy, sensitivity and specificity in detecting vision threatening conditions.",

 tech:"Deep Learning, CNN, VGG19, IDRID Dataset",

 architecture:["Retinal Image","Preprocessing","CNN/VGG19","Feature Extraction","Classifier","Severity Grade"]

}

]

return(

<section id="other-projects" className="max-w-6xl mx-auto px-6 py-24">

<h2 className="text-3xl font-semibold">Other AI & Deep Learning Projects</h2>

<div className="grid md:grid-cols-2 gap-8 mt-10">

{projects.map(project=>(

<div key={project.title} className="bg-white/5 border border-gray-800 p-8 rounded-xl hover:scale-105 transition">

<h3 className="text-lg font-semibold">{project.title}</h3>

<p className="text-gray-400 mt-4 text-sm leading-relaxed">
{project.description}
</p>

<p className="text-blue-400 mt-4 text-xs">
Technologies: {project.tech}
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

{/* ===== MODAL ===== */}
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
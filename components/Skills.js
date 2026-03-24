export default function Skills(){

const skills = {
"Core Expertise":[
"Generative AI Systems",
"LLM Prompt Engineering",
"AI Automation Frameworks"
],
"Engineering":[
"Python","Java","JavaScript","Django","REST APIs"
],
"Testing & Automation":[
"Selenium","API Testing","Cucumber","TestNG"
],
"AI Tooling":[
"GitHub Copilot","GitLab Duo","LLM APIs"
]
}

return(
<section id="skills" className="max-w-6xl mx-auto px-6 py-24">

<h2 className="text-3xl font-semibold">Skills</h2>

<div className="grid md:grid-cols-4 gap-6 mt-10">

{Object.entries(skills).map(([k,v])=>(
<div key={k} className="bg-white/5 p-6 rounded-xl">
<h3 className="text-white">{k}</h3>
<ul className="mt-4 text-sm text-gray-400">
{v.map(i=>(<li key={i}>{i}</li>))}
</ul>
</div>
))}

</div>

</section>
)
}
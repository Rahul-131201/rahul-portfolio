export default function Skills(){

const skills={

"Programming Languages":["Python","JavaScript","Java"],

"Frameworks & Libraries":["Django","Streamlit"],

"Generative & Agentic AI":["LLMs","Prompt Engineering","Agentic AI Systems","GitHub Copilot","GitLab Duo"],

"Automation & Testing":["Selenium","Cucumber BDD","TestNG","API Automation"],

"Performance Testing":["JMeter"],

"DevOps & Version Control":["Git","GitHub","GitLab"],

"Databases":["PostgreSQL"],

"Enterprise Tools":["Jira","Tosca Commander","UiPath Studio","Postman"]

}

return(

<section id="skills" className="max-w-6xl mx-auto px-6 py-24">

<h2 className="text-3xl font-semibold">Skills Profile</h2>

<div className="grid md:grid-cols-3 gap-8 mt-10">

{Object.entries(skills).map(([category,items])=>(

<div key={category} className="bg-white/5 backdrop-blur-lg border border-gray-800 p-6 rounded-xl">

<h3 className="font-semibold text-lg">{category}</h3>

<ul className="mt-4 space-y-2 text-gray-400 text-sm">

{items.map(skill=>(
<li key={skill}>{skill}</li>
))}

</ul>

</div>

))}

</div>

</section>

)
}
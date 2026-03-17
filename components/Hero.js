
// =====================================================
// components/Hero.js
// =====================================================

export default function Hero(){

return(

<section className="max-w-6xl mx-auto px-6 py-32">

<h1 className="text-5xl font-bold leading-tight">
Software Engineer
<br/>
<span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
Generative AI & Automation Engineering
</span>
</h1>

<p className="mt-6 text-gray-400 max-w-2xl">
Software Engineer at Capgemini specializing in Generative AI,
AI-driven automation and intelligent testing platforms.

Experienced in building LLM-powered developer tools,
automation frameworks and AI agents that transform
traditional QA workflows and significantly reduce
manual engineering effort.
</p>

<div className="mt-8 flex gap-4">

<a href="#projects" className="bg-white text-black px-6 py-3 rounded-xl">
View Projects
</a>

<a href="/resume.pdf" className="border border-gray-600 px-6 py-3 rounded-xl">
Download Resume
</a>

</div>

</section>

)

}

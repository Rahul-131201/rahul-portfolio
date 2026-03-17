
// =====================================================
// components/Navbar.js
// =====================================================

export default function Navbar(){

return(

<nav className="sticky top-0 backdrop-blur-lg bg-black/40 border-b border-gray-800 z-50">

<div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

<h1 className="font-bold text-lg tracking-wide">
Rahul Ramane
</h1>

<div className="space-x-8 text-sm text-gray-300">

<a href="#summary" className="hover:text-white">Summary</a>
<a href="#skills" className="hover:text-white">Skills</a>
<a href="#experience" className="hover:text-white">Experience</a>
<a href="#projects" className="hover:text-white">Projects</a>
<a href="#education" className="hover:text-white">Education</a>
<a href="#contact" className="hover:text-white">Contact</a>

</div>

</div>

</nav>

)

}

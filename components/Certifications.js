export default function Certifications(){

const certs=[

"Python for Data Science AI and Development – IBM",
"Generative AI for Beginners",
"Understanding Prompt Engineering"

]

return(

<section className="max-w-6xl mx-auto px-6 py-24">

<h2 className="text-3xl font-semibold">Certifications</h2>

<ul className="mt-6 space-y-3 text-gray-400">

{certs.map(cert=>(
<li key={cert}>{cert}</li>
))}

</ul>

</section>

)
}
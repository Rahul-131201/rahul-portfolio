export default function ArchitectureDiagram({ nodes = [] }){

if(!nodes || nodes.length === 0){
  return null
}

return(

<div className="mt-6 flex flex-wrap items-center gap-2 text-xs">

{nodes.map((node,i)=>(

<div key={i} className="flex items-center">

<div
className="border border-gray-700 bg-black/40 rounded-lg px-3 py-2 text-center hover:border-blue-400 hover:scale-105 transition relative"
>
{node}
</div>

{i < nodes.length-1 && (

<div className="mx-2 flex items-center">

<div className="w-10 h-px bg-gradient-to-r from-blue-500 to-purple-500 relative overflow-hidden">


<div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />

</div>

</div>

)}

</div>

))}

</div>

)

}
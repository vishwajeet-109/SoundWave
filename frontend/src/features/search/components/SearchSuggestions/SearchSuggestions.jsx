import { Search } from "lucide-react";

export default function SearchSuggestions({

  suggestions=[],

  onSelect,

}){

if(!suggestions.length)return null;

return(

<div
className="
mt-4
overflow-hidden
rounded-2xl
border
border-zinc-800
bg-zinc-900
shadow-2xl
"
>

{suggestions.map(item=>(

<button

key={item._id}

onClick={()=>onSelect(item)}

className="
flex
w-full
items-center
gap-3
border-b
border-zinc-800
px-5
py-4
transition
hover:bg-zinc-800
last:border-none
"

>

<Search
size={18}
className="text-zinc-500"
/>

<span className="text-white">

{item.title}

</span>

</button>

))}

</div>

)

}
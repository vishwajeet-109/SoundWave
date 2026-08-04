import { Clock3 } from "lucide-react";

export default function RecentSearches({

items=[],

onSelect,

}){

if(!items.length)return null;

return(

<section>

<h2 className="mb-6 text-2xl font-bold text-white">

Recent Searches

</h2>

<div className="grid gap-3">

{

items.map(item=>(

<button

key={item}

onClick={()=>onSelect(item)}

className="
flex
items-center
gap-3
rounded-xl
bg-zinc-900
px-5
py-4
transition
hover:bg-zinc-800
"

>

<Clock3
size={18}
className="text-zinc-500"
/>

<span className="text-white">

{item}

</span>

</button>

))

}

</div>

</section>

)

}
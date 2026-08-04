export default function TrendingSearches({

items=[],

}){

if(!items.length)return null;

return(

<section>

<h2 className="mb-6 text-2xl font-bold text-white">

Trending

</h2>

<div className="flex flex-wrap gap-3">

{

items.map(item=>(

<button

key={item}

className="
rounded-full
border
border-zinc-800
bg-zinc-900
px-5
py-3
transition
hover:border-primary
hover:bg-zinc-800
"

>

{item}

</button>

))

}

</div>

</section>

)

}
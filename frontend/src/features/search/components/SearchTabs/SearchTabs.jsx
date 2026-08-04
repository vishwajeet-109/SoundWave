const tabs=[
"All",
"Songs",
"Albums",
"Artists",
"Playlists",
];

export default function SearchTabs({

active,

onChange,

}){

return(

<div className="flex gap-3 overflow-x-auto pb-2">

{tabs.map(tab=>(

<button

key={tab}

onClick={()=>onChange(tab)}

className={`
shrink-0
rounded-full
px-5
py-2
text-sm
font-medium
transition-all
duration-300

${
active===tab

?

"bg-primary text-black shadow-lg"

:

"bg-zinc-900 text-zinc-300 hover:bg-zinc-800"

}

`}

>

{tab}

</button>

))}

</div>

)

}
import SidebarItem from "./SidebarItem";

export default function SidebarSection({

  title,

  items,

}) {

  return (

    <div className="mb-8">

      <h3 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">

        {title}

      </h3>

      <div className="space-y-2">

        {items.map((item) => (

          <SidebarItem

            key={item.to}

            {...item}

          />

        ))}

      </div>

    </div>

  );

}
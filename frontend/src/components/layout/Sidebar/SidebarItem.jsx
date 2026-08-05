import { NavLink } from "react-router-dom";

export default function SidebarItem({

  icon: Icon,

  label,

  to,

}) {

  return (

    <NavLink

      to={to}

      className={({ isActive }) => `

        flex

        items-center

        gap-3

        rounded-xl

        px-4

        py-3

        transition-all

        duration-200

        ${

          isActive

            ? "bg-green-500 text-black font-semibold"

            : "text-zinc-400 hover:bg-zinc-900 hover:text-white"

        }

      `}

    >

      <Icon size={20} />

      <span>{label}</span>

    </NavLink>

  );

}
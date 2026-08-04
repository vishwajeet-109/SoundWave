import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn";

export default function SidebarItem({
  icon: Icon,
  label,
  href,
}) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
          isActive
            ? "bg-primary text-black"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
        )
      }
    >
      <Icon size={20} />

      <span>{label}</span>
    </NavLink>
  );
}
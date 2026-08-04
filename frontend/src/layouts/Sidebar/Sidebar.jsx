import { Home, Search, Library, Heart, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";

const menu = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Search,
    label: "Search",
    href: "/search",
  },
  {
    icon: Library,
    label: "Your Library",
    href: "/library",
  },
];

const playlists = [
  "Liked Songs",
  "My Playlist",
  "Discover Weekly",
  "Daily Mix",
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="flex h-full w-[280px] flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Logo */}

      <div className="flex h-20 items-center px-6">
        <h1 className="text-2xl font-bold tracking-wide text-primary">
          SoundWave
        </h1>
      </div>

      {/* Menu */}

      <nav className="space-y-1 px-3">
        {menu.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </nav>

      {/* Playlist Header */}

      <div className="mt-8 flex items-center justify-between px-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Playlists
        </h2>

        <button
          className="rounded-lg p-2 transition hover:bg-zinc-800 hover:text-white"
          onClick={() => navigate("/playlists/placeholder")}
          type="button"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Playlist List */}

      <div className="mt-3 flex-1 overflow-y-auto px-3">
        {playlists.map((playlist) => (
          <button
            key={playlist}
            className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
            onClick={() => navigate("/playlists/placeholder")}
            type="button"
          >
            <Heart
              size={16}
              className="mr-3"
            />

            {playlist}
          </button>
        ))}
      </div>

      {/* Footer */}

      <div className="border-t border-zinc-800 p-5 text-xs text-zinc-500">
        SoundWave v1.0
      </div>
    </aside>
  );
}
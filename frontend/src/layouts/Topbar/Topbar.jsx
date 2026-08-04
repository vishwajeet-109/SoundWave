import {
  Bell,
  Crown,
  Menu,
  Settings,
} from "lucide-react";

import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 h-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-8">

        {/* Left */}

        <div className="flex items-center gap-5">

          <button className="rounded-xl p-2 transition hover:bg-zinc-800 lg:hidden">
            <Menu size={22} />
          </button>

          <SearchInput />

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button className="hidden items-center gap-2 rounded-xl bg-primary px-5 py-2 font-semibold text-black transition hover:scale-105 xl:flex">
            <Crown size={18} />

            Upgrade
          </button>

          <button className="rounded-xl p-3 transition hover:bg-zinc-800">
            <Bell size={20} />
          </button>

          <button className="rounded-xl p-3 transition hover:bg-zinc-800">
            <Settings size={20} />
          </button>

          <UserMenu />

        </div>

      </div>
    </header>
  );
}
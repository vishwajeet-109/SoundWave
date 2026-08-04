import { ChevronDown } from "lucide-react";

import { Avatar } from "@/shared/ui";

export default function UserMenu() {
  return (
    <button className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 transition hover:border-primary">

      <Avatar
        size="sm"
      />

      <div className="hidden text-left lg:block">
        <p className="text-sm font-semibold">
          Vishwajeet
        </p>

        <p className="text-xs text-zinc-400">
          Premium
        </p>
      </div>

      <ChevronDown
        size={18}
      />

    </button>
  );
}
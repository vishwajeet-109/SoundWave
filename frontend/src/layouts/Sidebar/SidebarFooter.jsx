import {
  Download,
  Globe,
  Settings,
} from "lucide-react";

export default function SidebarFooter() {
  return (
    <footer className="border-t border-zinc-800 p-5">
      <div className="space-y-2">

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
          <Download size={18} />
          Install App
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
          <Globe size={18} />
          English
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
          <Settings size={18} />
          Settings
        </button>

      </div>

      <div className="mt-6 border-t border-zinc-800 pt-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} SoundWave
      </div>
    </footer>
  );
}
import { Music2 } from "lucide-react";

export default function SidebarLogo() {

  return (

    <div className="mb-10 flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-blue-500">

        <Music2 className="text-white" />

      </div>

      <div>

        <h1 className="text-xl font-bold">

          SoundWave

        </h1>

        <p className="text-xs text-zinc-500">

          Music Platform

        </p>

      </div>

    </div>

  );

}
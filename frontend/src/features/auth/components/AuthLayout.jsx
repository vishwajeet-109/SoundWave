import { Music2 } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 items-center justify-center border-r border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="max-w-md">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-blue-500">
            <Music2 size={42} />
          </div>

          <h1 className="mb-4 text-5xl font-bold">
            SoundWave
          </h1>

          <p className="text-lg text-zinc-400">
            Premium Music Streaming Platform
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-10">
        {children}
      </div>
    </div>
  );
}
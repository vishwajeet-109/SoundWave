import { Music2 } from "lucide-react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Left Side */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-zinc-950">
        <div className="max-w-md text-center">
          <Music2 className="mx-auto mb-6 h-16 w-16 text-green-500" />

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
        <Outlet />
      </div>

    </div>
  );
}

export default AuthLayout;
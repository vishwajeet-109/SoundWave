import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}

        <div className="relative hidden overflow-hidden border-r border-zinc-800 bg-[#0B0B0B] lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10" />

          <div className="relative z-10 flex h-full flex-col justify-center px-20">
            <span className="mb-6 w-fit rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
              Welcome to SoundWave
            </span>

            <h1 className="text-6xl font-black leading-tight">
              Feel Every
              <br />
              Beat.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
              Stream millions of songs, discover artists,
              create playlists and experience premium music
              with a modern interface inspired by Spotify,
              Apple Music and TIDAL.
            </p>

            <div className="mt-12 flex gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-5">
                <p className="text-3xl font-bold text-green-500">
                  50M+
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  Songs
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-5">
                <p className="text-3xl font-bold text-blue-500">
                  180+
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  Countries
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-5">
                <p className="text-3xl font-bold text-white">
                  HD
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  Audio
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-4xl font-bold">
                Create Account
              </h2>

              <p className="mt-3 text-zinc-400">
                Join SoundWave and start listening.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8 shadow-2xl backdrop-blur-xl">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
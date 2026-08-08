import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden border-r border-zinc-800 bg-[#0B0B0B] lg:flex">
          <img
            src="/images/auth-hero.svg"
            alt="SoundWave background"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

          <div className="relative z-10 flex h-full flex-col justify-end px-10 py-12 xl:px-20">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 shadow-xl">
              <span className="text-2xl">♪</span>
            </div>

            <h1 className="mb-4 text-5xl font-black tracking-tight xl:text-6xl">
              SoundWave
            </h1>

            <p className="max-w-md text-lg text-zinc-300">
              Premium music streaming platform. Discover tracks, follow artists, and build your perfect listening experience.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <h2 className="mb-2 text-3xl font-bold text-white">
              Welcome Back
            </h2>

            <p className="mb-8 text-zinc-400">
              Login to continue listening.
            </p>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
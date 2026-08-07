import { Music2 } from "lucide-react";
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      
      {/* LEFT SIDE - IMAGE WAPAS AA GAYI! */}
      <div className="hidden lg:block lg:w-1/2 relative border-r border-zinc-800">
        {/* Awesome Music Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1614680376593-902f74a9cb0d?q=80&w=1974&auto=format&fit=crop" 
          alt="SoundWave Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent flex flex-col justify-end p-12">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 shadow-xl">
            <Music2 size={32} className="text-white" />
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            SoundWave
          </h1>
          <p className="text-lg text-zinc-300 max-w-md">
            Premium Music Streaming Platform. Discover, stream, and share your favorite tracks.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12 relative z-10">
        {/* Yahan par Login form automatically aayega router se */}
        <Outlet />
      </div>
      
    </div>
  );
}
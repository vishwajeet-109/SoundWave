import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header";
import RightSidebar from "@/components/layout/RightSidebar";
import MusicPlayer from "@/components/player/MusicPlayer";

import useAuth from "@/hooks/useAuth";

export default function AppShell() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-zinc-950 text-white">

      <Sidebar role={user?.role} />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Header />

        <main className="flex-1 overflow-y-auto bg-zinc-950 px-6 py-5">
          <Outlet />
        </main>

        <MusicPlayer />

      </div>

      <div className="hidden 2xl:block">
        <RightSidebar />
      </div>

    </div>
  );
}
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import  RightSidebar from '@/components/layout/RightSidebar';
import Header from "@/components/layout/Header";
import  MusicPlayer from '@/components/player/MusicPlayer';

const AppShell = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#080808] text-[#FAFAFA] flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#111111]">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>

        {/* Right Contextual Sidebar */}
        <RightSidebar />
      </div>

      {/* Persistent Music Player */}
      <MusicPlayer />
    </div>
  );
};

export default AppShell;
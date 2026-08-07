import React from 'react';
import { ArtistSidebar } from './ArtistSidebar';
import { ArtistHeader } from './ArtistHeader';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#080808] text-[#FAFAFA]">
      <ArtistSidebar />
      <div className="md:ml-64 flex flex-col min-h-screen">
        <ArtistHeader />
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#080808] text-[#FAFAFA]">
      <AdminSidebar />
      <div className="md:ml-64 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
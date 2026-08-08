import React from 'react';
import { Outlet } from 'react-router-dom';

import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
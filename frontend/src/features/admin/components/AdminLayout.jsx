import React from 'react';
import { Outlet } from 'react-router-dom';

// THE FIX: Wrapped in curly braces to match your named exports
import { AdminSidebar } from './AdminSidebar'; 
import { AdminHeader } from './AdminHeader';   

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {/* The Outlet is where the child routes (like AdminDashboard) will render */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Keep this as a default export so AppRouter.jsx can import it easily!
export default AdminLayout;
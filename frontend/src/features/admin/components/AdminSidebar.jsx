import React from 'react';
import SidebarItem from '@/components/layout/Sidebar/SidebarItem';
import SidebarLogo from '@/components/layout/Sidebar/SidebarLogo';
import { LayoutDashboard, ShieldAlert, Folder, Tags, Flag, BarChart3, UserPlus } from 'lucide-react';
import { ROUTES } from '@/constants/routes'; // ROUTES USE KAR RAHE HAIN AB

export const AdminSidebar = () => {
  // Ab yeh kabhi 404 nahi dega kyunki exact constants use ho rahe hain
  const adminLinks = [
    { title: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
    { title: 'Song Approval', path: ROUTES.ADMIN_APPROVALS, icon: ShieldAlert },
    { title: 'Create Artist', path: ROUTES.ADMIN_CREATE_ARTIST, icon: UserPlus }, 
    { title: 'Categories', path: '/admin/categories', icon: Folder },
    { title: 'Genres', path: '/admin/genres', icon: Tags },
    { title: 'Reports', path: ROUTES.ADMIN_REPORTS || '/admin/reports', icon: Flag },
    { title: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col bg-zinc-950 border-r border-zinc-800 shrink-0">
      <SidebarLogo />
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        <div className="px-3 mb-4 mt-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Administration
        </div>
        {adminLinks.map((item) => (
          <SidebarItem key={item.title} title={item.title} path={item.path} icon={item.icon} />
        ))}
      </nav>
    </aside>
  );
};
import React from 'react';
import SidebarItem from '@/components/layout/Sidebar/SidebarItem';
import SidebarLogo from '@/components/layout/Sidebar/SidebarLogo';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Folder, 
  Tags, 
  Flag, 
  BarChart3,
  UserPlus 
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export const AdminSidebar = () => {
  // Exact Admin Links as per your screenshot + Create Artist
  const adminLinks = [
    { title: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { title: 'Song Approval', path: '/admin/approval', icon: ShieldAlert },
    { title: 'Create Artist', path: '/admin/create-artist', icon: UserPlus }, // Tujhe yeh chahiye tha!
    { title: 'Categories', path: '/admin/categories', icon: Folder },
    { title: 'Genres', path: '/admin/genres', icon: Tags },
    { title: 'Reports', path: '/admin/reports', icon: Flag },
    { title: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col bg-zinc-950 border-r border-zinc-800 shrink-0">
      <SidebarLogo />
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        
        {/* ADMINISTRATION Section Header (From your screenshot) */}
        <div className="px-3 mb-4 mt-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Administration
        </div>
        
        {/* Rendering all the Admin links */}
        {adminLinks.map((item) => (
          <SidebarItem 
            key={item.title} 
            title={item.title} 
            path={item.path} 
            icon={item.icon} 
          />
        ))}
      </nav>
    </aside>
  );
};
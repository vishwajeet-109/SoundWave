import React from 'react';
import { sidebarConfig } from './sidebar.config';
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import useAuth from '@/hooks/useAuth'; // Using your custom hook

const Sidebar = () => {
  const { user } = useAuth();
  
  // Identify the role. Fallback to 'user' if not logged in or role is missing
  const userRole = user?.role === 'super_admin' || user?.role === 'moderator' 
    ? 'admin' 
    : (user?.role || 'user'); 
  
  // Dynamically select the correct array from the config
  const navItems = sidebarConfig[userRole] || sidebarConfig.user;

  return (
    <aside className="w-64 h-screen flex flex-col bg-zinc-950 border-r border-zinc-800 shrink-0">
      <SidebarLogo />
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => (
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

export default Sidebar;
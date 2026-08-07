import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { USER_NAV, ARTIST_NAV, ADMIN_NAV } from './sidebar.config';
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";

export const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role || 'user';

  const getNavItems = () => {
    if (role === 'admin' || role === 'super_admin') return ADMIN_NAV;
    if (role === 'artist') return ARTIST_NAV;
    return USER_NAV;
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-[#080808] border-r border-[#2A2A2A] flex flex-col h-full select-none">
      <SidebarLogo />
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}
      </nav>
    </aside>
  );
};

  export default Sidebar;
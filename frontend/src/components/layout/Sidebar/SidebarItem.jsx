import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/shared/utils/cn'; 
import * as Icons from 'lucide-react'; 

const SidebarItem = ({ title, path, icon }) => {
  if (!path) return null; 

  // YAHAN FIX HAI: Yeh check karega ki icon string hai (User sidebar) ya Component (Admin Sidebar)
  const IconComponent = typeof icon === 'string' ? Icons[icon] : icon;

  // Agar icon invalid hai toh default Circle dikhayega, app crash nahi hogi
  const RenderIcon = IconComponent || Icons.Circle;

  return (
    <NavLink
      to={path}
      end={path === '/'} 
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group",
          isActive 
            ? "bg-green-500/10 text-green-500" 
            : "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50"
        )
      }
    >
      <RenderIcon className="w-5 h-5 transition-transform group-hover:scale-105" />
      <span className="truncate">{title}</span>
    </NavLink>
  );
};

export default SidebarItem;
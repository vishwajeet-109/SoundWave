import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Music, DiscAlbum, BarChart3, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/constants/routes';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.ARTIST_DASHBOARD },
  { label: 'My Songs', icon: Music, href: '/artist/songs' },
  { label: 'My Albums', icon: DiscAlbum, href: '/artist/albums' },
  { label: 'Analytics', icon: BarChart3, href: '/artist/analytics' },
  { label: 'Notifications', icon: Bell, href: '/artist/notifications' },
  { label: 'Settings', icon: Settings, href: '/artist/settings' },
];

export const ArtistSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-[#111111] border-r border-[#2A2A2A] hidden md:flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">Sound<span className="text-[#22C55E]">Wave</span></h1>
        <p className="text-xs text-[#A1A1AA] uppercase tracking-wider mt-1 font-semibold">Artist Portal</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-[#22C55E]/10 text-[#22C55E]" 
                  : "text-[#A1A1AA] hover:bg-[#171717] hover:text-[#FAFAFA]"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
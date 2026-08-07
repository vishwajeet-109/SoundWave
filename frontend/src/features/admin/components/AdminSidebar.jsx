import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, ListMusic, Tags, Flag, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const ADMIN_NAV = [
  { label: 'Overview', icon: LayoutDashboard, href: '/admin' },
  { label: 'Song Approvals', icon: ShieldCheck, href: '/admin/approval' },
  { label: 'Categories', icon: ListMusic, href: '/admin/categories' },
  { label: 'Genres', icon: Tags, href: '/admin/genres' },
  { label: 'Reports', icon: Flag, href: '/admin/reports' },
  { label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-[#111111] border-r border-[#2A2A2A] hidden md:flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">Sound<span className="text-[#3B82F6]">Admin</span></h1>
        <p className="text-xs text-[#A1A1AA] uppercase tracking-wider mt-1 font-semibold">Moderation Portal</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {ADMIN_NAV.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-[#3B82F6]/10 text-[#3B82F6]" 
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
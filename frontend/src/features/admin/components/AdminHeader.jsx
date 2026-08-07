import React from 'react';
import useAuth from '@/hooks/useAuth';
import Avatar from '@/shared/ui/avatar';
import { ShieldAlert } from 'lucide-react';

const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-[#080808]/80 backdrop-blur-md border-b border-[#2A2A2A] sticky top-0 z-30 flex items-center justify-between px-8">
      <div className="flex items-center gap-2 text-[#EF4444]">
        <ShieldAlert className="w-5 h-5" />
        <span className="text-sm font-bold tracking-widest uppercase">Restricted Area</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-[#FAFAFA]">{user?.name || 'Administrator'}</p>
          <p className="text-xs text-[#3B82F6] uppercase tracking-wider">{user?.role}</p>
        </div>
        <Avatar src={user?.profileImage} alt={user?.name} fallback={user?.name?.[0]} className="border border-[#3B82F6]/50" />
      </div>
    </header>
  );
};

export default AdminHeader;
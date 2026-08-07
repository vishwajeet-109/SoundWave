import React from 'react';
import useAuth from '@/hooks/useAuth';
import Avatar from "@/shared/ui/avatar";
import { Bell } from 'lucide-react';
import Button from '@/shared/ui/button';

const ArtistHeader = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-[#080808]/80 backdrop-blur-md border-b border-[#2A2A2A] sticky top-0 z-30 flex items-center justify-between px-8">
      <div>
        <h2 className="text-xl font-bold text-[#FAFAFA]">Dashboard</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="text-[#A1A1AA] hover:text-[#FAFAFA] relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </Button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-[#2A2A2A]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-[#FAFAFA]">{user?.name || 'Artist'}</p>
            <p className="text-xs text-[#22C55E]">Verified Artist</p>
          </div>
          <Avatar src={user?.profileImage} alt={user?.name} fallback={user?.name?.[0]} />
        </div>
      </div>
    </header>
  );
};

export default ArtistHeader;
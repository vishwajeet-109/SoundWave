import React from 'react';
import { UploadCloud, DiscAlbum, Edit3 } from 'lucide-react';
import { Button } from '@/shared/ui/button';

export const QuickActions = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Button className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-[#080808] font-semibold flex items-center gap-2">
        <UploadCloud className="w-4 h-4" />
        Upload Song
      </Button>
      <Button variant="outline" className="border-[#2A2A2A] text-[#FAFAFA] hover:bg-[#171717] flex items-center gap-2">
        <DiscAlbum className="w-4 h-4" />
        New Album
      </Button>
      <Button variant="ghost" className="text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#171717] flex items-center gap-2">
        <Edit3 className="w-4 h-4" />
        Edit Profile
      </Button>
    </div>
  );
};
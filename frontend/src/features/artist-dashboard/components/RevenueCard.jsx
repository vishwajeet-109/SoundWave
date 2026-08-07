import React from 'react';
import { Card } from '@/shared/ui/card';
import { DollarSign, ArrowUpRight } from 'lucide-react';

// DUMMY UI: Implemented as instructed because no /api/v1/revenue backend exists.
export const RevenueCard = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-[#171717] to-[#111111] border-[#2A2A2A] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-16 bg-[#22C55E]/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[#A1A1AA] text-sm font-medium mb-1">Estimated Revenue</h3>
          <p className="text-xs text-[#A1A1AA]">Current Billing Cycle</p>
        </div>
        <div className="p-2 bg-[#080808] rounded-full border border-[#2A2A2A]">
          <DollarSign className="w-4 h-4 text-[#22C55E]" />
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex items-end gap-3">
          <h2 className="text-4xl font-bold text-[#FAFAFA]">$1,248.50</h2>
          <div className="flex items-center text-[#22C55E] text-sm font-medium mb-1 bg-[#22C55E]/10 px-2 py-1 rounded">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            12.5%
          </div>
        </div>
        <p className="text-xs text-[#A1A1AA] mt-4">Next payout on 15th of the month.</p>
      </div>
    </Card>
  );
};
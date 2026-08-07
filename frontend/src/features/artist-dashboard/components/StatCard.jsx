import React from 'react';
import { Card } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export const StatCard = ({ title, value, icon: Icon, trend, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="p-6 bg-[#171717] border-[#2A2A2A]">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-24 bg-[#2A2A2A]" />
          <Skeleton className="h-8 w-8 rounded-full bg-[#2A2A2A]" />
        </div>
        <Skeleton className="h-8 w-32 bg-[#2A2A2A]" />
      </Card>
    );
  }

  const isPositive = trend && trend > 0;

  return (
    <Card className="p-6 bg-[#171717] border-[#2A2A2A] hover:bg-[#171717]/80 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-[#A1A1AA]">{title}</p>
        <div className="p-2 bg-[#22C55E]/10 text-[#22C55E] rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-[#FAFAFA]">{value}</h3>
        {trend && (
          <span className={`text-xs font-medium mb-1 ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
            {isPositive ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </Card>
  );
};
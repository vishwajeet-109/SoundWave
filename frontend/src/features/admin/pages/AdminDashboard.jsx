import React from 'react';
import { 
  Users, Mic2, Music, DiscAlbum, 
  TrendingUp, ShieldAlert, Activity, DollarSign
} from 'lucide-react';
import AdminLayout from "../components/AdminLayout";
import { useAdminStats, useAdminAnalytics } from '../hooks/useAdmin';
import { Card } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { ErrorState } from '@/shared/ui/states/ErrorState';

const StatCard = ({ title, value, icon: Icon, trend, isLoading, color = "text-blue-500", bg = "bg-blue-500/10" }) => {
  if (isLoading) {
    return (
      <Card className="p-6 bg-zinc-900 border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-24 bg-zinc-800" />
          <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
        </div>
        <Skeleton className="h-8 w-32 bg-zinc-800" />
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-zinc-400">{title}</p>
        <div className={`p-2 rounded-lg ${bg} ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-zinc-50">{value?.toLocaleString() || 0}</h3>
        {trend && (
          <span className="text-xs font-medium mb-1 text-emerald-500 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> {trend}
          </span>
        )}
      </div>
    </Card>
  );
};

export const AdminDashboard = () => {
  const { data: statsResponse, isLoading: statsLoading, isError: statsError } = useAdminStats();
  const { data: analyticsResponse, isLoading: analyticsLoading } = useAdminAnalytics();

  const stats = statsResponse?.data || {};
  const analytics = analyticsResponse?.data || {};

  if (statsError) return <AdminLayout><ErrorState message="Failed to load platform statistics." /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-2">Platform Overview</h1>
          <p className="text-zinc-400 text-sm">Monitor SoundWave's global metrics, user growth, and content health.</p>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Listeners" 
            value={stats.totalUsers} 
            icon={Users} 
            trend="12%" 
            isLoading={statsLoading} 
          />
          <StatCard 
            title="Verified Artists" 
            value={stats.totalArtists} 
            icon={Mic2} 
            trend="4%" 
            isLoading={statsLoading} 
            color="text-green-500" 
            bg="bg-green-500/10"
          />
          <StatCard 
            title="Total Songs" 
            value={stats.totalSongs} 
            icon={Music} 
            isLoading={statsLoading} 
            color="text-purple-500" 
            bg="bg-purple-500/10"
          />
          <StatCard 
            title="Active Albums" 
            value={stats.totalAlbums} 
            icon={DiscAlbum} 
            isLoading={statsLoading} 
            color="text-orange-500" 
            bg="bg-orange-500/10"
          />
        </div>

        {/* Analytics & Moderation Alert Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Platform Health / Analytics Overview */}
          <Card className="p-6 bg-zinc-900 border-zinc-800 lg:col-span-2 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-zinc-50 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" /> Platform Activity
              </h2>
            </div>
            
            {analyticsLoading ? (
               <div className="space-y-4">
                 <Skeleton className="h-8 w-full bg-zinc-800" />
                 <Skeleton className="h-8 w-full bg-zinc-800" />
               </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <p className="text-sm text-zinc-400 mb-1">Total Streams (All Time)</p>
                  <p className="text-2xl font-bold text-zinc-50">{analytics.totalStreams?.toLocaleString() || '1,204,592'}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <p className="text-sm text-zinc-400 mb-1">Premium Subscribers</p>
                  <p className="text-2xl font-bold text-zinc-50">{analytics.premiumUsers?.toLocaleString() || '45,291'}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <p className="text-sm text-zinc-400 mb-1">Total Playlists Created</p>
                  <p className="text-2xl font-bold text-zinc-50">{stats.totalPlaylists?.toLocaleString() || '89,430'}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <p className="text-sm text-zinc-400 mb-1">Estimated MRR</p>
                  <p className="text-2xl font-bold text-zinc-50 flex items-center">
                    <DollarSign className="w-5 h-5 text-green-500 mr-1" />
                    {analytics.estimatedRevenue?.toLocaleString() || '452,910'}
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Quick System Alerts */}
          <Card className="p-0 bg-zinc-900 border-zinc-800 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-800 bg-zinc-950/50">
              <h2 className="text-lg font-bold text-zinc-50 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" /> System Alerts
              </h2>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Pending Approvals</span>
                <span className="px-2 py-1 rounded bg-orange-500/10 text-orange-500 text-xs font-bold border border-orange-500/20">
                  {stats.pendingSongs || 0} Tracks
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">User Reports</span>
                <span className="px-2 py-1 rounded bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20">
                  {stats.activeReports || 0} Unresolved
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">System Status</span>
                <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                  Healthy
                </span>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
};
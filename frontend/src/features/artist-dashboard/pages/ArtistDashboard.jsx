import React from 'react';
import { Headphones, DiscAlbum, Users, PlayCircle, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import QuickActions from '../components/QuickActions';
import RevenueCard from '../components/RevenueCard';
import artistDashboardHooks from '../hooks/useArtistDashboard';
import Card from '@/shared/ui/card';
import Badge from '@/shared/ui/badge';
import Skeleton from '@/shared/ui/skeleton';
import EmptyState from "@/shared/ui/states/EmptyState";
import ErrorState from '@/shared/ui/states/ErrorState';

const ArtistDashboard = () => {
  const { useArtistStats, useArtistRecentUploads, useArtistNotifications } = artistDashboardHooks;
  const { data: statsResponse, isLoading: statsLoading, isError: statsError } = useArtistStats();
  const { data: uploadsResponse, isLoading: uploadsLoading } = useArtistRecentUploads();
  const { data: notifsResponse, isLoading: notifsLoading } = useArtistNotifications();

  const stats = statsResponse?.data || { totalSongs: 0, totalAlbums: 0, totalStreams: 0, followers: 0 };
  const recentUploads = uploadsResponse?.data?.data || [];
  const notifications = notifsResponse?.data?.data || [];

  if (statsError) return <ErrorState message="Failed to load dashboard statistics." />;

  return (
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        
        {/* Header & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-2">Artist Overview</h1>
            <p className="text-[#A1A1AA] text-sm">Monitor your music, track analytics, and manage your profile.</p>
          </div>
        </div>

        <QuickActions />

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Streams" value={stats.totalStreams?.toLocaleString()} icon={Headphones} trend={8.4} isLoading={statsLoading} />
          <StatCard title="Total Listeners" value={stats.followers?.toLocaleString()} icon={Users} trend={12.1} isLoading={statsLoading} />
          <StatCard title="Total Songs" value={stats.totalSongs} icon={PlayCircle} isLoading={statsLoading} />
          <StatCard title="Total Albums" value={stats.totalAlbums} icon={DiscAlbum} isLoading={statsLoading} />
        </div>

        {/* Content & Revenue Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-4">
          
          {/* Recent Uploads Section */}
          <div className="xl:col-span-2 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#FAFAFA]">Recent Uploads</h2>
            <Card className="bg-[#171717] border-[#2A2A2A] overflow-hidden">
              {uploadsLoading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full bg-[#2A2A2A]" />)}
                </div>
              ) : recentUploads.length === 0 ? (
                <EmptyState title="No songs found" description="You haven't uploaded any songs yet." />
              ) : (
                <div className="divide-y divide-[#2A2A2A]">
                  {recentUploads.map((song) => (
                    <div key={song._id} className="flex items-center justify-between p-4 hover:bg-[#2A2A2A]/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-[#080808] overflow-hidden flex-shrink-0">
                          <img src={song.coverImage || '/api/placeholder/48/48'} alt={song.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[#FAFAFA] font-medium text-sm">{song.title}</p>
                          <p className="text-[#A1A1AA] text-xs mt-1">{new Date(song.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-[#FAFAFA] font-medium text-sm">{song.playCount?.toLocaleString() || 0}</p>
                          <p className="text-[#A1A1AA] text-xs mt-1">Streams</p>
                        </div>
                        <Badge variant="outline" className={song.status === 'approved' ? 'text-[#22C55E] border-[#22C55E]/30' : 'text-[#F59E0B] border-[#F59E0B]/30'}>
                          {song.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Revenue & Notifications Section */}
          <div className="flex flex-col gap-6">
            <RevenueCard />
            
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="text-xl font-bold text-[#FAFAFA]">Recent Activity</h2>
              <Card className="bg-[#171717] border-[#2A2A2A] flex-1 p-0 overflow-hidden">
                {notifsLoading ? (
                   <div className="p-6 space-y-4"><Skeleton className="h-10 w-full bg-[#2A2A2A]" /><Skeleton className="h-10 w-full bg-[#2A2A2A]" /></div>
                ) : notifications.length === 0 ? (
                  <div className="p-6 text-center text-[#A1A1AA] text-sm">No new notifications.</div>
                ) : (
                  <div className="divide-y divide-[#2A2A2A]">
                    {notifications.slice(0,4).map((notif) => (
                      <div key={notif._id} className="p-4 flex gap-3 hover:bg-[#2A2A2A]/30">
                        <Clock className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-[#FAFAFA] leading-snug">{notif.message}</p>
                          <span className="text-xs text-[#A1A1AA] mt-1 block">
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>

        </div>
      </div>
  );
};

export default ArtistDashboard;
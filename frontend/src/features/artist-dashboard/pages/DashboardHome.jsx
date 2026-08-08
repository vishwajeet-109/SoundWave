import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users, Music, DollarSign, UploadCloud, ArrowUpRight, Bell, Clock } from 'lucide-react';
import {
  useArtistStats,
  useArtistRecentUploads,
  useArtistNotifications,
} from '../hooks/useArtistDashboard';

const DashboardHome = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useArtistStats();
  const { data: recentUploads = [], isLoading: uploadsLoading } = useArtistRecentUploads();
  const { data: notifications = [] } = useArtistNotifications();

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl z-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-500">
            Artist Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            Welcome back to SoundWave
          </h1>
          <p className="text-zinc-400 text-sm">
            Your music is performing great this week. Check your stream counts and recent uploads below.
          </p>
        </div>

        <button
          onClick={() => navigate('/artist/upload')}
          className="z-10 bg-green-500 hover:bg-green-400 text-black px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-green-500/10 flex-shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          Upload New Track
        </button>

        {/* Ambient Glow Background Effect */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-green-500/10 blur-3xl rounded-full pointer-events-none" />
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Streams</span>
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
              <Play className="w-4 h-4 fill-green-500" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-zinc-50">
              {statsLoading ? '...' : (stats?.totalStreams || 0).toLocaleString()}
            </h2>
            <span className="text-xs font-medium text-green-500 flex items-center">
              +12.4% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Monthly Listeners</span>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-zinc-50">
              {statsLoading ? '...' : (stats?.monthlyListeners || 0).toLocaleString()}
            </h2>
            <span className="text-xs font-medium text-green-500 flex items-center">
              +5.2% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Songs</span>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <Music className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-zinc-50">
              {statsLoading ? '...' : stats?.totalSongs || recentUploads.length || 0}
            </h2>
            <span className="text-xs font-medium text-zinc-500">Released</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Estimated Revenue</span>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-zinc-50">
              ${statsLoading ? '...' : (stats?.revenue || 0).toFixed(2)}
            </h2>
            <span className="text-xs font-medium text-green-500 flex items-center">
              +15.8% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Recent Uploads & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Uploads (2 Cols) */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-50">Recent Uploads</h3>
              <p className="text-xs text-zinc-400">Your latest tracks added to SoundWave</p>
            </div>
            <button
              onClick={() => navigate('/artist/my-songs')}
              className="text-xs font-medium text-green-500 hover:underline"
            >
              View All
            </button>
          </div>

          {uploadsLoading ? (
            <div className="py-8 text-center text-zinc-500 text-sm">Loading uploads...</div>
          ) : recentUploads.length === 0 ? (
            <div className="py-12 text-center space-y-3 border border-dashed border-zinc-800 rounded-lg">
              <Music className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-zinc-400 text-sm">No recent uploads found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentUploads.slice(0, 4).map((song) => (
                <div
                  key={song._id}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-zinc-800 overflow-hidden flex-shrink-0">
                      {song.coverUrl || song.coverImage ? (
                        <img src={song.coverUrl || song.coverImage} alt={song.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-500">
                          <Music className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-50 truncate max-w-[180px] sm:max-w-xs">
                        {song.title}
                      </p>
                      <p className="text-xs text-zinc-500">{song.genre || 'Single'}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-zinc-200 font-mono">
                      {(song.plays || song.streams || 0).toLocaleString()}
                    </p>
                    <p className="text-[11px] text-zinc-500">plays</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications & Activity Feed (1 Col) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-green-500" />
              <h3 className="text-lg font-bold text-zinc-50">Activity Feed</h3>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-lg space-y-1">
                <p className="text-xs font-medium text-zinc-200">Track Released</p>
                <p className="text-xs text-zinc-500">Your track was published to all major feeds.</p>
                <span className="text-[10px] text-zinc-600 flex items-center gap-1 pt-1">
                  <Clock className="w-3 h-3" /> 2 hours ago
                </span>
              </div>
              <div className="p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-lg space-y-1">
                <p className="text-xs font-medium text-zinc-200">1,000 Streams Milestone</p>
                <p className="text-xs text-zinc-500">Congratulations! You reached 1K total streams.</p>
                <span className="text-[10px] text-zinc-600 flex items-center gap-1 pt-1">
                  <Clock className="w-3 h-3" /> 1 day ago
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif, index) => (
                <div key={index} className="p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-lg space-y-1">
                  <p className="text-xs font-medium text-zinc-200">{notif.title || 'Notification'}</p>
                  <p className="text-xs text-zinc-500">{notif.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
import React, { useState } from 'react';
import { TrendingUp, Users, Music, DollarSign, Calendar, ArrowUpRight, Play } from 'lucide-react';
import { useArtistStats, useArtistRecentUploads } from '../hooks/useArtistDashboard';

const Analytics = () => {
  const { data: stats } = useArtistStats();
  const { data: songs = [] } = useArtistRecentUploads();
  const [timeRange, setTimeRange] = useState('7d');

  // Stream data points for SVG Area Chart
  const chartData = [
    { label: 'Mon', streams: 1200 },
    { label: 'Tue', streams: 2100 },
    { label: 'Wed', streams: 1800 },
    { label: 'Thu', streams: 3400 },
    { label: 'Fri', streams: 2900 },
    { label: 'Sat', streams: 4800 },
    { label: 'Sun', streams: 5200 },
  ];

  const maxStreams = Math.max(...chartData.map((d) => d.streams));

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-1">Analytics Overview</h1>
          <p className="text-zinc-400 text-sm">Track your music performance, audience engagement, and stream metrics.</p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl w-fit">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                timeRange === range
                  ? 'bg-zinc-800 text-green-500'
                  : 'text-zinc-400 hover:text-zinc-50'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
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
              {(stats?.totalStreams || 28450).toLocaleString()}
            </h2>
            <span className="text-xs font-medium text-green-500 flex items-center">
              +14.2% <ArrowUpRight className="w-3 h-3 ml-0.5" />
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
              {(stats?.monthlyListeners || 4120).toLocaleString()}
            </h2>
            <span className="text-xs font-medium text-green-500 flex items-center">
              +8.7% <ArrowUpRight className="w-3 h-3 ml-0.5" />
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
            <h2 className="text-2xl font-bold text-zinc-50">{songs.length || stats?.totalSongs || 0}</h2>
            <span className="text-xs font-medium text-zinc-500">Published</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Est. Revenue</span>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-zinc-50">
              ${(stats?.revenue || 142.50).toFixed(2)}
            </h2>
            <span className="text-xs font-medium text-green-500 flex items-center">
              +18.3% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Visual Stream Chart Section */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-50">Streams Activity</h3>
            <p className="text-xs text-zinc-400">Daily play count overview</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
            Streams
          </div>
        </div>

        {/* Custom Responsive SVG Area/Bar Graph */}
        <div className="h-64 w-full flex items-end gap-3 pt-8 pb-2 border-b border-zinc-800">
          {chartData.map((item, idx) => {
            const heightPercent = Math.round((item.streams / maxStreams) * 100);
            return (
              <div key={idx} className="flex-1 h-full flex flex-col justify-end items-center gap-2 group">
                <div className="text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  {item.streams}
                </div>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full bg-zinc-800 group-hover:bg-green-500 transition-all duration-300 rounded-t-md relative"
                />
                <span className="text-xs text-zinc-500 font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Performing Songs Section */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-bold text-zinc-50">Top Performing Songs</h3>
        {songs.length === 0 ? (
          <p className="text-sm text-zinc-500">No stream analytics available yet.</p>
        ) : (
          <div className="space-y-3">
            {songs.slice(0, 5).map((song, index) => (
              <div
                key={song._id || index}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-zinc-500 w-4">{index + 1}</span>
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
                    <p className="text-sm font-medium text-zinc-50">{song.title}</p>
                    <p className="text-xs text-zinc-500">{song.genre || 'Single'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-zinc-200 font-mono">
                    {(song.plays || song.streams || 0).toLocaleString()}
                  </p>
                  <p className="text-[11px] text-zinc-500">plays</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
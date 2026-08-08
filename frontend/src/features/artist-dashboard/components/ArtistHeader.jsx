import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

const ArtistHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#080808]/80 backdrop-blur-md border-b border-zinc-800/80 px-6 flex items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative max-w-md w-full hidden sm:block">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search tracks, analytics, or stats..."
          className="w-full bg-zinc-900/90 border border-zinc-800/80 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
        />
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notification Bell */}
        <button
          onClick={() => navigate('/artist/notifications')}
          className="relative p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-500" />
        </button>

        {/* Profile Badge */}
        <div
          onClick={() => navigate('/artist/profile')}
          className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center text-zinc-400">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4" />
            )}
          </div>
          <span className="text-xs font-semibold text-zinc-200 truncate max-w-[100px]">
            {user?.name || 'Artist Profile'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default ArtistHeader;
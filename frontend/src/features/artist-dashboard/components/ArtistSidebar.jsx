import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  FolderPlus,
  Music2,
  Disc,
  BarChart3,
  Users,
  DollarSign,
  Bell,
  LogOut,
} from 'lucide-react';
import useAuthStore from '@/store/authStore';

const navItems = [
  { name: 'Dashboard', path: '/artist', icon: LayoutDashboard, end: true },
  { name: 'Upload Album', path: '/artist/upload-album', icon: FolderPlus },
  { name: 'My Songs', path: '/artist/songs', icon: Music2 },
  { name: 'My Albums', path: '/artist/albums', icon: Disc },
  { name: 'Analytics', path: '/artist/analytics', icon: BarChart3 },
  { name: 'Followers', path: '/artist/followers', icon: Users },
  { name: 'Revenue', path: '/artist/revenue', icon: DollarSign },
  { name: 'Notifications', path: '/artist/notifications', icon: Bell },
];

const ArtistSidebar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0D0D0D] border-r border-zinc-800/80 flex flex-col justify-between hidden md:flex z-40">
      {/* Brand Header */}
      <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center font-black text-black text-lg">
            S
          </div>
          <div>
            <h2 className="font-bold text-zinc-50 text-base leading-none">SoundWave</h2>
            <span className="text-[10px] text-green-500 font-semibold tracking-wider uppercase">
              Artist Studio
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-green-500 text-black shadow-md shadow-green-500/10'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-zinc-800/80 bg-[#0D0D0D]">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Studio</span>
        </button>
      </div>
    </aside>
  );
  
};

export default ArtistSidebar;
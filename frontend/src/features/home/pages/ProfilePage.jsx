import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLibrary } from "@/features/library/hooks/useLibrary";
import Avatar from "@/shared/ui/avatar/Avatar";
import Button from "@/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useAuth();
  const { data: libraryData } = useLibrary();
  const navigate = useNavigate();

  const likedCount = libraryData?.likedSongs?.length || libraryData?.likes?.length || 0;
  const playlistCount = libraryData?.playlists?.length || 0;

  return (
    <div className="p-8 text-zinc-100 max-w-5xl mx-auto space-y-10 pb-32">
      {/* Profile Header Banner */}
      <div className="relative bg-gradient-to-r from-green-900/40 via-zinc-900 to-zinc-900 p-8 rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <Avatar 
            src={user?.avatar} 
            name={user?.name || "User"} 
            className="w-28 h-28 text-3xl border-4 border-zinc-800 shadow-xl" 
          />
          <span className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-zinc-900" title="Active"></span>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{user?.name || "Music Lover"}</h1>
            <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold rounded-full uppercase tracking-wider w-fit mx-auto md:mx-0">
              {user?.role || "USER"}
            </span>
          </div>
          <p className="text-zinc-400 text-sm">{user?.email}</p>
          <p className="text-xs text-zinc-500 pt-1">Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
        </div>

        <div>
          <Button onClick={() => navigate("/settings")} variant="secondary">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-2 text-center">
          <p className="text-zinc-400 text-sm font-medium">Liked Songs</p>
          <p className="text-3xl font-bold text-green-400">{likedCount}</p>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-2 text-center">
          <p className="text-zinc-400 text-sm font-medium">Playlists Created</p>
          <p className="text-3xl font-bold text-green-400">{playlistCount}</p>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-2 text-center">
          <p className="text-zinc-400 text-sm font-medium">Account Status</p>
          <p className="text-3xl font-bold text-emerald-400 uppercase text-lg pt-1">{user?.status || "Active"}</p>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => navigate("/library")} variant="secondary">
            View My Library
          </Button>
          <Button onClick={() => navigate("/history")} variant="secondary">
            Listening History
          </Button>
        </div>
      </div>
    </div>
  );
}
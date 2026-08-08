import React, { useState } from "react";
import {
  Headphones,
  DiscAlbum,
  Users,
  PlayCircle,
  Clock,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";

import StatCard from "../components/StatCard";
import QuickActions from "../components/QuickActions";
import RevenueCard from "../components/RevenueCard";

import artistDashboardHooks from "../hooks/useArtistDashboard";

import Card from "@/shared/ui/card";
import Badge from "@/shared/ui/badge";
import Skeleton from "@/shared/ui/skeleton";
import EmptyState from "@/shared/ui/states/EmptyState";
import ErrorState from "@/shared/ui/states/ErrorState";

const ArtistDashboard = () => {
  const {
    useArtistStats,
    useArtistRecentUploads,
    useArtistNotifications,
    useUpdateArtistSong,
    useDeleteArtistSong,
  } = artistDashboardHooks;

  // ---------------------------------------------------------------------------
  // Queries
  // ---------------------------------------------------------------------------

  const {
    data: statsResponse,
    isLoading: statsLoading,
    isError: statsError,
  } = useArtistStats();

  const {
    data: uploadsResponse,
    isLoading: uploadsLoading,
    isError: uploadsError,
    refetch: refetchUploads,
    isFetching: uploadsFetching,
  } = useArtistRecentUploads();

  const {
    data: notifsResponse,
    isLoading: notifsLoading,
  } = useArtistNotifications();

  // ---------------------------------------------------------------------------
  // Mutations
  // ---------------------------------------------------------------------------

  const updateSongMutation = useUpdateArtistSong();
  const deleteSongMutation = useDeleteArtistSong();

  // ---------------------------------------------------------------------------
  // Dashboard Derived Data
  // ---------------------------------------------------------------------------

  const stats = statsResponse?.data || {
    totalSongs: 0,
    totalAlbums: 0,
    totalStreams: 0,
    followers: 0,
  };

  const recentUploads = uploadsResponse?.data || uploadsResponse || [];
  const notifications = notifsResponse?.data || notifsResponse || [];

  // ---------------------------------------------------------------------------
  // Modals Local State
  // ---------------------------------------------------------------------------

  const [editingSong, setEditingSong] = useState(null);
  const [deletingSong, setDeletingSong] = useState(null);

  const [editFormData, setEditFormData] = useState({
    title: "",
    genre: "",
  });

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleEditClick = (song) => {
    setEditingSong(song);
    setEditFormData({
      title: song.title || "",
      genre: song.genre || "",
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    if (!editingSong?._id) return;

    updateSongMutation.mutate(
      { songId: editingSong._id, songData: editFormData },
      {
        onSuccess: () => {
          setEditingSong(null);
        },
        onError: (error) => {
          console.error("Failed to update song:", error);
          alert(
            error.response?.data?.message || "Failed to update song."
          );
        },
      }
    );
  };

  const handleDeleteClick = (song) => {
    setDeletingSong(song);
  };

  const handleConfirmDelete = () => {
    if (!deletingSong?._id) return;

    deleteSongMutation.mutate(deletingSong._id, {
      onSuccess: () => {
        setDeletingSong(null);
      },
      onError: (error) => {
        console.error("Failed to delete song:", error);
        alert(
          error.response?.data?.message || "Failed to delete song."
        );
      },
    });
  };

  // ---------------------------------------------------------------------------
  // Error Guard
  // ---------------------------------------------------------------------------

  if (statsError) {
    return (
      <ErrorState
        title="Failed to load dashboard"
        description="Something went wrong while loading your artist dashboard."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-2">
            Artist Overview
          </h1>
          <p className="text-[#A1A1AA] text-sm">
            Monitor your music, track analytics, and manage your profile.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Streams"
          value={stats.totalStreams?.toLocaleString() || "0"}
          icon={Headphones}
          trend={8.4}
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Listeners"
          value={stats.followers?.toLocaleString() || "0"}
          icon={Users}
          trend={12.1}
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Songs"
          value={stats.totalSongs || 0}
          icon={PlayCircle}
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Albums"
          value={stats.totalAlbums || 0}
          icon={DiscAlbum}
          isLoading={statsLoading}
        />
      </div>

      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Uploads Overview */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#FAFAFA]">Recent Uploads</h2>

          <Card className="bg-[#171717] border-[#2A2A2A] overflow-hidden">
            {uploadsLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((item) => (
                  <Skeleton
                    key={item}
                    className="h-16 w-full bg-[#2A2A2A]"
                  />
                ))}
              </div>
            ) : recentUploads.length === 0 ? (
              <EmptyState
                title="No songs found"
                description="You haven't uploaded any songs yet."
              />
            ) : (
              <div className="divide-y divide-[#2A2A2A]">
                {recentUploads.slice(0, 5).map((song) => (
                  <div
                    key={song._id}
                    className="flex items-center justify-between p-4 hover:bg-[#2A2A2A]/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-[#080808] overflow-hidden flex-shrink-0">
                        <img
                          src={
                            song.coverImage || "/api/placeholder/48/48"
                          }
                          alt={song.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-[#FAFAFA] font-medium text-sm">
                          {song.title}
                        </p>
                        <p className="text-[#A1A1AA] text-xs mt-1">
                          {song.createdAt
                            ? new Date(song.createdAt).toLocaleDateString()
                            : "Unknown date"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <p className="text-[#FAFAFA] font-medium text-sm">
                          {(song.plays ?? song.playCount ?? 0).toLocaleString()}
                        </p>
                        <p className="text-[#A1A1AA] text-xs mt-1">
                          Streams
                        </p>
                      </div>

                      <Badge
                        variant="outline"
                        className={
                          song.status === "approved"
                            ? "text-[#22C55E] border-[#22C55E]/30"
                            : "text-[#F59E0B] border-[#F59E0B]/30"
                        }
                      >
                        {song.status || "pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Revenue + Notifications */}
        <div className="flex flex-col gap-6">
          <RevenueCard />

          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-xl font-bold text-[#FAFAFA]">
              Recent Activity
            </h2>

            <Card className="bg-[#171717] border-[#2A2A2A] flex-1 p-0 overflow-hidden">
              {notifsLoading ? (
                <div className="p-6 space-y-4">
                  <Skeleton className="h-10 w-full bg-[#2A2A2A]" />
                  <Skeleton className="h-10 w-full bg-[#2A2A2A]" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-6 text-center text-[#A1A1AA] text-sm">
                  No new notifications.
                </div>
              ) : (
                <div className="divide-y divide-[#2A2A2A]">
                  {notifications.slice(0, 4).map((notification) => (
                    <div
                      key={notification._id}
                      className="p-4 flex gap-3 hover:bg-[#2A2A2A]/30"
                    >
                      <Clock className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-[#FAFAFA] leading-snug">
                          {notification.message}
                        </p>
                        <span className="text-xs text-[#A1A1AA] mt-1 block">
                          {notification.createdAt
                            ? new Date(notification.createdAt).toLocaleDateString()
                            : ""}
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

      {/* Main Song Catalog Management */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#FAFAFA]">Your Catalog</h2>
            <p className="text-sm text-[#A1A1AA] mt-1">
              Manage your uploaded songs and track performance.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetchUploads()}
            disabled={uploadsFetching}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22C55E] text-black text-sm font-medium hover:bg-[#16A34A] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${uploadsFetching ? "animate-spin" : ""}`} />
            {uploadsFetching ? "Refreshing..." : "Refresh Catalog"}
          </button>
        </div>

        <Card className="bg-[#171717] border-[#2A2A2A] overflow-hidden">
          {uploadsError ? (
            <ErrorState
              title="Failed to load catalog"
              description="Could not fetch your songs list."
            />
          ) : uploadsLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton
                  key={item}
                  className="h-14 w-full bg-[#2A2A2A]"
                />
              ))}
            </div>
          ) : recentUploads.length === 0 ? (
            <EmptyState
              title="No songs found"
              description="Upload your first song to see it here."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2A2A2A]">
                    <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#A1A1AA]">
                      Title
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#A1A1AA]">
                      Genre
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#A1A1AA]">
                      Plays
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#A1A1AA]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#2A2A2A]">
                  {recentUploads.map((song) => (
                    <tr
                      key={song._id}
                      className="hover:bg-[#2A2A2A]/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {song.coverImage && (
                            <img
                              src={song.coverImage}
                              alt={song.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <span className="text-sm font-medium text-[#FAFAFA]">
                            {song.title}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#A1A1AA]">
                        {song.genre || "—"}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#FAFAFA]">
                        {(
                          song.plays ??
                          song.playCount ??
                          0
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditClick(song)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#FAFAFA] bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteClick(song)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>

      {/* Edit Modal */}
      {editingSong && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl bg-[#171717] border border-[#2A2A2A] shadow-2xl">
            <div className="p-6 border-b border-[#2A2A2A]">
              <h3 className="text-xl font-semibold text-[#FAFAFA]">
                Edit Song
              </h3>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-5">
              <div>
                <label
                  htmlFor="song-title"
                  className="block text-sm font-medium text-[#FAFAFA] mb-2"
                >
                  Title
                </label>
                <input
                  id="song-title"
                  name="title"
                  type="text"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border border-[#2A2A2A] bg-[#080808] px-4 py-3 text-sm text-[#FAFAFA] outline-none focus:border-[#22C55E]"
                />
              </div>

              <div>
                <label
                  htmlFor="song-genre"
                  className="block text-sm font-medium text-[#FAFAFA] mb-2"
                >
                  Genre
                </label>
                <input
                  id="song-genre"
                  name="genre"
                  type="text"
                  value={editFormData.genre}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border border-[#2A2A2A] bg-[#080808] px-4 py-3 text-sm text-[#FAFAFA] outline-none focus:border-[#22C55E]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingSong(null)}
                  disabled={updateSongMutation.isPending}
                  className="px-4 py-2.5 rounded-lg bg-[#2A2A2A] text-[#FAFAFA] text-sm font-medium hover:bg-[#3A3A3A] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateSongMutation.isPending}
                  className="px-4 py-2.5 rounded-lg bg-[#22C55E] text-black text-sm font-medium hover:bg-[#16A34A] transition-colors disabled:opacity-50"
                >
                  {updateSongMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingSong && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl bg-[#171717] border border-[#2A2A2A] shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-[#FAFAFA]">
                  Confirm Deletion
                </h3>
              </div>

              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="text-[#FAFAFA] font-medium">
                  "{deletingSong.title}"
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setDeletingSong(null)}
                  disabled={deleteSongMutation.isPending}
                  className="px-4 py-2.5 rounded-lg bg-[#2A2A2A] text-[#FAFAFA] text-sm font-medium hover:bg-[#3A3A3A] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deleteSongMutation.isPending}
                  className="px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {deleteSongMutation.isPending ? "Deleting..." : "Delete Song"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistDashboard;
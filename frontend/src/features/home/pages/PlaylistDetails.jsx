import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import playlistService from "@/services/playlistService";
import Loader from "@/shared/ui/loader/Loader";
import MusicCard from "../components/MusicCard/MusicCard";

export default function PlaylistDetails() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        setLoading(true);
        const res = await playlistService.getPlaylistById ? await playlistService.getPlaylistById(id) : await playlistService.getPlaylistDetails(id);
        setPlaylist(res.data || res.playlist || res);
      } catch (err) {
        setError("Failed to load playlist details.");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPlaylist();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !playlist) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-red-500">
        <p>{error || "Playlist not found."}</p>
      </div>
    );
  }

  const songs = playlist.songs || playlist.tracks || [];

  return (
    <div className="min-h-screen text-zinc-100 pb-32 space-y-8">
      {/* Playlist Header */}
      <div className="bg-zinc-900 p-8 flex items-center gap-6 border-b border-zinc-800">
        <div className="w-40 h-40 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 font-bold text-xl shadow-lg">
          {playlist.coverImage ? (
            <img src={playlist.coverImage} alt={playlist.title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            "Playlist"
          )}
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Public Playlist</span>
          <h1 className="text-4xl font-extrabold mt-1">{playlist.title || playlist.name}</h1>
          <p className="text-zinc-400 text-sm mt-2">{songs.length} songs</p>
        </div>
      </div>

      {/* Songs Grid / List */}
      <div className="px-8 space-y-4">
        <h2 className="text-2xl font-bold">Tracks</h2>
        {songs.length === 0 ? (
          <p className="text-zinc-500">This playlist is empty.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {songs.map((song) => (
              <MusicCard key={song._id || song.id} song={song} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
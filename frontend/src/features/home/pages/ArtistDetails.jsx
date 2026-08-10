import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import artistService from "@/services/artistService";
import Loader from "@/shared/ui/loader/Loader";
import MusicCard from "../components/MusicCard/MusicCard";

export default function ArtistDetails() {
  const { id } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArtist() {
      try {
        setLoading(true);
        const res = await artistService.getArtistById ? await artistService.getArtistById(id) : await artistService.getArtistDetails(id);
        setArtistData(res.data || res);
      } catch (err) {
        setError("Failed to load artist details.");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchArtist();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !artistData) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-red-500">
        <p>{error || "Artist not found."}</p>
      </div>
    );
  }

  const artist = artistData.artist || artistData;
  const songs = artistData.songs || artistData.topSongs || [];

  return (
    <div className="min-h-screen text-zinc-100 pb-32 space-y-8">
      {/* Artist Hero Banner */}
      <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-950 p-8 flex items-end gap-6 min-h-[300px]">
        <img 
          src={artist.avatar || artist.image || "/default-artist.png"} 
          alt={artist.name} 
          className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-zinc-900"
        />
        <div>
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Verified Artist</span>
          <h1 className="text-5xl font-extrabold mt-1">{artist.name}</h1>
          <p className="text-zinc-400 text-sm mt-2">{artist.followersCount || 0} Followers</p>
        </div>
      </div>

      {/* Top Songs Section */}
      <div className="px-8 space-y-4">
        <h2 className="text-2xl font-bold">Popular Songs</h2>
        {songs.length === 0 ? (
          <p className="text-zinc-500">No songs available for this artist yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {songs.map((song) => (
              <MusicCard key={song._id} song={song} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
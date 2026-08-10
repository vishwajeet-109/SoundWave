import React, { useEffect, useState } from "react";
import albumService from "@/services/albumService";
import Loader from "@/shared/ui/loader";
import EmptyState from "@/shared/ui/states/EmptyState";
import Button from "@/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function MyAlbums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyAlbums() {
      try {
        setLoading(true);
        const res = await albumService.getArtistAlbums ? await albumService.getArtistAlbums() : await albumService.getAlbums();
        const data = res?.data || res?.albums || res || [];
        setAlbums(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load artist albums:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMyAlbums();
  }, []);

  if (loading) {
    return <Loader variant="page" text="Loading your albums..." />;
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center p-8 text-center">
        <p className="text-red-500 font-medium">Failed to load albums. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-zinc-100 max-w-7xl mx-auto space-y-8 pb-32">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Albums</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage and view all your published albums</p>
        </div>
        <Button onClick={() => navigate("/artist/upload-album")}>
          + Upload New Album
        </Button>
      </div>

      {albums.length === 0 ? (
        <EmptyState
          title="No albums found"
          description="You haven't uploaded any albums yet. Create your first album now!"
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {albums.map((album) => (
            <div 
              key={album._id} 
              onClick={() => navigate(`/albums/${album._id}`)}
              className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 space-y-3 cursor-pointer group hover:border-green-500/50 transition-all"
            >
              <img 
                src={album.coverImage || album.cover || "https://placehold.co/400x400/171717/ffffff?text=Album"} 
                alt={album.title} 
                className="w-full aspect-square object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <h3 className="font-bold text-base truncate text-white">{album.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">{album.songs?.length || 0} tracks</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
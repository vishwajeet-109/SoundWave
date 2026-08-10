import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import albumService from "@/services/albumService";
import Loader from "@/shared/ui/loader/Loader";
import TrackList from "../components/TrackList/TrackList";
import AlbumHero from "../components/AlbumHero/AlbumHero";

export default function AlbumDetails() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAlbumDetails() {
      try {
        setLoading(true);
        const res = await albumService.getAlbumById ? await albumService.getAlbumById(id) : await albumService.getAlbumDetails(id);
        setAlbum(res.data || res.album || res);
      } catch (err) {
        setError("Failed to load album details.");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchAlbumDetails();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !album) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-red-500">
        <p>{error || "Album not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-zinc-100 pb-32">
      <AlbumHero album={album} />
      <div className="px-6 mt-8">
        <TrackList tracks={album.songs || album.tracks || []} />
      </div>
    </div>
  );
}
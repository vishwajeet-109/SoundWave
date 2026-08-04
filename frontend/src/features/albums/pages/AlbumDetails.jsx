import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { useAlbum } from "../hooks/useAlbum";

import AlbumHero from "../components/AlbumHero";
import AlbumActions from "../components/AlbumActions";
import TrackList from "../components/TrackList";
import AlbumSkeleton from "../components/AlbumSkeleton";

import { EmptyState, ErrorMessage } from "@/shared/ui";

export default function AlbumDetails() {
  const { id } = useParams();

  const {
    data: album,
    isLoading,
    isError,
    error,
    refetch,
  } = useAlbum(id);

  if (isLoading) {
    return <AlbumSkeleton />;
  }

  const status = error?.response?.status;
  const isNotFound = status === 404 || status === 400;

  if (isNotFound) {
    return (
      <EmptyState
        title="Album not found"
        description="This album doesn't exist or may have been removed."
      />
    );
  }

  if (isError || !album) {
    return (
      <ErrorMessage
        title="Unable to load album"
        description="Something went wrong while loading this album."
        onRetry={refetch}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="space-y-10"
    >
      <AlbumHero album={album} />

      <AlbumActions />

      <TrackList tracks={album.songs} />
    </motion.div>
  );
}

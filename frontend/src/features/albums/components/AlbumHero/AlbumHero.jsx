import { useState } from "react";
import { Music } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Badge from "@/shared/ui/badge";
import Avatar from "@/shared/ui/avatar";

import { formatAlbumDuration } from "../../utils/formatDuration";

export default function AlbumHero({ album }) {
  const navigate = useNavigate();
  const [coverFailed, setCoverFailed] = useState(false);

  const artist = album?.artist;
  const artistId = artist?._id ?? artist?.id;
  const artistName = artist?.name ?? "Artist";
  const artistAvatar = artist?.avatar;
  const trackCount = album?.totalSongs ?? album?.songs?.length ?? 0;

  const totalDurationSeconds =
    album?.totalDuration ||
    album?.songs?.reduce((sum, song) => sum + (song?.duration || 0), 0) ||
    0;

  const totalDurationLabel = formatAlbumDuration(totalDurationSeconds);

  const releaseYear = album?.releaseDate
    ? dayjs(album.releaseDate).format("YYYY")
    : null;

  const metaParts = [
    releaseYear,
    trackCount > 0 ? `${trackCount} ${trackCount === 1 ? "song" : "songs"}` : null,
    totalDurationLabel,
  ].filter(Boolean);

  const handleArtistClick = () => {
    if (artistId) {
      navigate(`/artists/${artistId}`);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl">
      {/* Ambient background glow, driven by the actual cover art */}
      {album?.coverImage && !coverFailed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-30 blur-3xl"
          style={{
            backgroundImage: `url(${album.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div className="relative flex flex-col gap-8 p-2 sm:flex-row sm:items-end sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[240px] shrink-0 sm:mx-0 sm:w-60"
        >
          <div className="absolute inset-0 -z-10 scale-95 rounded-2xl bg-primary/20 blur-2xl" />

          {album?.coverImage && !coverFailed ? (
            <img
              src={album.coverImage}
              alt={`${album?.title ?? "Album"} cover art`}
              onError={() => setCoverFailed(true)}
              className="aspect-square w-full rounded-2xl border border-border object-cover shadow-lg"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-border bg-surface shadow-lg">
              <Music
                size={48}
                className="text-text-secondary"
              />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-w-0 flex-1 flex-col gap-4 text-center sm:text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary">
            Album
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl">
            {album?.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            {artist && (
              <button
                type="button"
                onClick={handleArtistClick}
                className="flex items-center gap-2 rounded-full transition hover:opacity-80"
              >
                <Avatar
                  src={artistAvatar}
                  alt={artistName}
                  size="xs"
                />
                <span className="text-sm font-semibold text-text">
                  {artistName}
                </span>
              </button>
            )}

            {metaParts.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-text-secondary">
                {metaParts.map((part, index) => (
                  <span key={part} className="flex items-center gap-2">
                    {index > 0 && <span aria-hidden="true">•</span>}
                    <span>{part}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {(album.genre || album.category || album.language) && (
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {album?.genre && <Badge variant="info">{album.genre}</Badge>}
              {album?.category && <Badge>{album.category}</Badge>}
              {album?.language && <Badge variant="success">{album.language}</Badge>}
            </div>
          )}

          {album?.description && (
            <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
              {album.description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

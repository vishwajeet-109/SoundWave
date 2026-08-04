import { Play, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui";

export default function HeroSection({
  featured,
  onPlay,
}) {
  const navigate = useNavigate();

  const albumId = featured?.albumId ?? featured?.album?._id ?? featured?.album_id ?? featured?.album?.id;

  const handleNavigate = () => {
    if (albumId) {
      navigate(`/albums/${albumId}`);
    }
  };

  const handlePlay = (event) => {
    event.stopPropagation();
    onPlay?.(featured);
  };

  const handleSave = (event) => {
    event.stopPropagation();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleNavigate}
      className="
        relative
        cursor-pointer
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r
        from-green-700
        via-green-600
        to-emerald-500
        p-10
      "
    >
      <div className="grid gap-10 lg:grid-cols-2">

        <div className="flex flex-col justify-center">

          <p className="mb-2 text-sm font-medium uppercase tracking-[4px]">
            Featured Playlist
          </p>

          <h1 className="text-5xl font-black leading-tight">
            {featured?.title}
          </h1>

          <p className="mt-5 max-w-xl text-lg text-green-100">
            {featured?.description}
          </p>

          <div className="mt-8 flex gap-4">

            <Button
              leftIcon={<Play size={18} fill="currentColor" />}
              onClick={handlePlay}
            >
              Play Now
            </Button>

            <Button
              variant="secondary"
              leftIcon={<Heart size={18} />}
              onClick={handleSave}
            >
              Save
            </Button>

          </div>

        </div>

        <div className="flex justify-center">

          <img
            src={featured?.coverImage}
            alt={featured?.title}
            className="
              w-full
              max-w-sm
              rounded-3xl
              shadow-2xl
            "
          />

        </div>

      </div>
    </motion.section>
  );
}
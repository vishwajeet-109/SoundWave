import HeroSection from "../components/HeroSection";
import RecentlyPlayed from "../components/RecentlyPlayed";
import TrendingSongs from "../components/TrendingSongs";
import PopularArtists from "../components/PopularArtists";
import MadeForYou from "../components/MadeForYou";
import NewReleases from "../components/NewReleases";
import FeaturedPlaylists from "../components/FeaturedPlaylists";
import QuickAccess from "../components/QuickAccess";
import ContinueListening from "../components/ContinueListening";

import { useHome } from "../hooks/useHome";

import {
  Loader,
  EmptyState,
  ErrorMessage,
} from "@/shared/ui";

import { usePlayerContext } from "@/context/PlayerContext";

export default function Home() {
  const {
    songs,
    albums,
    artists,
    playlists,
    history,

    isLoading,
    isError,

    refetch,
  } = useHome();

  const { playSong } = usePlayerContext();

  if (isLoading) {
    return (
      <Loader
        variant="page"
        text="Loading SoundWave..."
      />
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to load Home"
        description="Something went wrong while loading data."
        onRetry={refetch}
      />
    );
  }

  if (
    !songs.length &&
    !albums.length &&
    !artists.length
  ) {
    return (
      <EmptyState
        title="Nothing here yet"
        description="No music available."
      />
    );
  }

  return (
    <div className="space-y-14">

      <HeroSection
        featured={songs[0]}
      />

      <QuickAccess
        songs={songs}
        onPlay={playSong}
      />

      <RecentlyPlayed
        songs={history}
        onPlay={playSong}
      />

      <TrendingSongs
        songs={songs}
        onPlay={playSong}
      />

      <PopularArtists
        artists={artists}
      />

      <NewReleases
        albums={albums}
      />

      <MadeForYou
        playlists={playlists}
      />

      <FeaturedPlaylists
        playlists={playlists}
      />

      <ContinueListening
        songs={history}
        onPlay={playSong}
      />

    </div>
  );
}
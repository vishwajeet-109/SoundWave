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

import Loader from "@/shared/ui/loader";
import EmptyState from "@/shared/ui/states/EmptyState";
import ErrorMessage from "@/shared/ui/ErrorMessage";

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
        onPlay={(song) => playSong(song, songs)}
      />

      <QuickAccess
        songs={songs}
        onPlay={(song) => playSong(song, songs)}
      />

      <RecentlyPlayed
        songs={history}
        onPlay={(song) => playSong(song, history)}
      />

      <TrendingSongs
        songs={songs}
        onPlay={(song) => playSong(song, songs)}
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
        onPlay={(song) => playSong(song, history)}
      />

    </div>
  );
}
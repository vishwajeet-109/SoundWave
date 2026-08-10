import { useMemo, useState } from "react";

import LibraryHero from "../components/LibraryHero";
import LibraryTabs from "../components/LibraryTabs";
import LibrarySkeleton from "../components/LibrarySkeleton";
import EmptyLibrary from "../components/EmptyLibrary";

import LikedSongsSection from "../components/LikedSongsSection";
import PlaylistsSection from "../components/PlaylistsSection";
import AlbumsSection from "../components/AlbumsSection";
import ArtistsSection from "../components/ArtistsSection";
import RecentlyPlayedSection from "../components/RecentlyPlayedSection";

import { useLibrary } from "../hooks/useLibrary";

export default function Library() {
  const [activeTab, setActiveTab] = useState("All");

  const {
    data,
    isLoading,
    isError,
  } = useLibrary();

  /*
  |--------------------------------------------------------------------------
  | Normalized & Future-Proofed Safe Data Mapping
  |--------------------------------------------------------------------------
  */
  const library = useMemo(() => {
    return {
      likedSongs: Array.isArray(data?.likedSongs) 
        ? data.likedSongs 
        : Array.isArray(data?.likes) 
        ? data.likes 
        : [],

      playlists: Array.isArray(data?.playlists) 
        ? data.playlists 
        : [],

      albums: Array.isArray(data?.albums) 
        ? data.albums 
        : [],

      artists: Array.isArray(data?.artists) 
        ? data.artists 
        : [],

      recentlyPlayed: Array.isArray(data?.recentlyPlayed) 
        ? data.recentlyPlayed 
        : [],
    };
  }, [data]);

  if (isLoading) {
    return <LibrarySkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-red-500 font-medium">Failed to load library data.</p>
      </div>
    );
  }

  const isEmpty =
    !library.likedSongs.length &&
    !library.playlists.length &&
    !library.albums.length &&
    !library.artists.length &&
    !library.recentlyPlayed.length;

  if (isEmpty && activeTab === "All") {
    return <EmptyLibrary />;
  }

  return (
    <main className="space-y-8 pb-32 px-6 pt-4 text-zinc-100">
      {/* Library Hero Header */}
      <LibraryHero />

      {/* Library Tabs Switcher */}
      <LibraryTabs
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* Dynamic Content Sections */}
      <div className="space-y-10">
        {(activeTab === "All" || activeTab === "Liked Songs") && (
          <LikedSongsSection songs={library.likedSongs} />
        )}

        {(activeTab === "All" || activeTab === "Playlists") && (
          <PlaylistsSection playlists={library.playlists} />
        )}

        {(activeTab === "All" || activeTab === "Albums") && (
          <AlbumsSection albums={library.albums} />
        )}

        {(activeTab === "All" || activeTab === "Artists") && (
          <ArtistsSection artists={library.artists} />
        )}

        {(activeTab === "All" || activeTab === "Recently Played") && (
          <RecentlyPlayedSection songs={library.recentlyPlayed} />
        )}
      </div>
    </main>
  );
}
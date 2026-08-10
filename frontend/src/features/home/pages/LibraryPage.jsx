export default function LibraryPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center text-white">
        <div className="mb-4 flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-primary" />
        </div>
        <h1 className="text-3xl font-semibold">Library</h1>
        <p className="mt-2 text-sm text-zinc-400">Loading your library...</p>
      </div>
    </div>
  );
}
import { useMemo, useState } from "react";

import LibraryHero from "@/features/library/components/LibraryHero";
import LibraryTabs from "@/features/library/components/LibraryTabs";
import LibrarySkeleton from "@/features/library/components/LibrarySkeleton";
import EmptyLibrary from "@/features/library/components/EmptyLibrary";

import LikedSongsSection from "@/features/library/components/LikedSongsSection";
import PlaylistsSection from "@/features/library/components/PlaylistsSection";
import AlbumsSection from "@/features/library/components/AlbumsSection";
import ArtistsSection from "@/features/library/components/ArtistsSection";
import RecentlyPlayedSection from "@/features/library/components/RecentlyPlayedSection";

import { useLibrary } from "@/features/library/hooks/useLibrary";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("All");

  const {
    data,
    isLoading,
    isError,
  } = useLibrary();

  /*
  |--------------------------------------------------------------------------
  | Safe Data Normalization
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
      {/* Library Hero Banner */}
      <LibraryHero />

      {/* Library Tabs */}
      <LibraryTabs
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* Dynamic Sections Based on Active Tab */}
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
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

  /*
  |--------------------------------------------------------------------------
  | Active Tab
  |--------------------------------------------------------------------------
  */

  const [activeTab, setActiveTab] =
    useState("All");

  /*
  |--------------------------------------------------------------------------
  | Library Data
  |--------------------------------------------------------------------------
  */

  const {
    data,
    isLoading,
    isError,
  } = useLibrary();

  /*
  |--------------------------------------------------------------------------
  | Normalized Data
  |--------------------------------------------------------------------------
  */

  const library = useMemo(() => {
    return {
      likedSongs:
        data?.likedSongs || [],

      playlists:
        data?.playlists || [],

      albums:
        data?.albums || [],

      artists:
        data?.artists || [],

      recentlyPlayed:
        data?.recentlyPlayed || [],
    };
  }, [data]);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (isLoading) {
    return <LibrarySkeleton />;
  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (isError) {
    return (
      <div
        className="
          flex
          h-[70vh]
          items-center
          justify-center
        "
      >
        <p className="text-red-500">
          Failed to load library.
        </p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Empty Library
  |--------------------------------------------------------------------------
  */

  const isEmpty =
    !library.likedSongs.length &&
    !library.playlists.length &&
    !library.albums.length &&
    !library.artists.length &&
    !library.recentlyPlayed.length;

  if (isEmpty) {
    return <EmptyLibrary />;
  }

  return (

    <main
      className="
        space-y-12
        pb-32
      "
    >

      {/* ==========================================
          Library Hero
      ========================================== */}

      <LibraryHero />

      {/* ==========================================
          Library Tabs
      ========================================== */}

      <LibraryTabs
        active={activeTab}
        onChange={setActiveTab}
      />
            {/* ==========================================
          Library Content
      ========================================== */}

      {/* ------------------------------------------
          Liked Songs
      ------------------------------------------ */}

      {(activeTab === "All" ||
        activeTab === "Liked Songs") &&
        !!library.likedSongs.length && (
          <LikedSongsSection
            songs={library.likedSongs}
          />
        )}

      {/* ------------------------------------------
          Playlists
      ------------------------------------------ */}

      {(activeTab === "All" ||
        activeTab === "Playlists") &&
        !!library.playlists.length && (
          <PlaylistsSection
            playlists={library.playlists}
          />
        )}

      {/* ------------------------------------------
          Albums
      ------------------------------------------ */}

      {(activeTab === "All" ||
        activeTab === "Albums") &&
        !!library.albums.length && (
          <AlbumsSection
            albums={library.albums}
          />
        )}

      {/* ------------------------------------------
          Artists
      ------------------------------------------ */}

      {(activeTab === "All" ||
        activeTab === "Artists") &&
        !!library.artists.length && (
          <ArtistsSection
            artists={library.artists}
          />
        )}

      {/* ------------------------------------------
          Recently Played
      ------------------------------------------ */}

      {(activeTab === "All" ||
        activeTab === "Recently Played") &&
        !!library.recentlyPlayed.length && (
          <RecentlyPlayedSection
            songs={library.recentlyPlayed}
          />
        )}
              {/* ==========================================
          FUTURE FEATURES
          ------------------------------------------
          □ Pin Playlists
          □ Sort Library
          □ Smart Collections
          □ Offline Downloads
          □ Drag & Drop
          □ Multi Select
          □ Folder Support
          □ Recently Added
          □ Shared Playlists
          □ Recommended Albums
          □ Favorite Artists
          ========================================== */}

    </main>
  );
}
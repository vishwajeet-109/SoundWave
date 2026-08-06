import { useEffect, useMemo, useState } from "react";

import SearchLayout from "../components/SearchLayout";
import SearchInput from "../components/SearchInput";
import SearchTabs from "../components/SearchTabs";
import TrendingSearches from "../components/TrendingSearches";
import RecentSearches from "../components/RecentSearches";

import SearchSection from "../components/SearchSection";
import ResultGrid from "../components/ResultGrid";
import SongResultCard from "../components/SongResultCard";
import EmptySearch from "../components/EmptySearch";
import SearchSkeleton from "../components/SearchSkeleton";
import TopResult from "../components/TopResult";

import AlbumCard from "@/features/home/components/AlbumCard";
import ArtistCard from "@/features/home/components/ArtistCard";
import PlaylistCard from "@/features/home/components/PlaylistCard";

import { useSearch } from "../hooks/useSearch";
import useDebounce from "@/shared/hooks/useDebounce";

import {
  getRecentSearches,
  saveRecentSearch,
} from "../utils/searchHistory";

export default function Search() {
  const [query, setQuery] = useState("");

  const [tab, setTab] = useState("All");

  const [recent, setRecent] = useState([]);

  const debouncedQuery = useDebounce(
    query,
    300
  );

  /*
  |--------------------------------------------------------------------------
  | Recent Searches
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setRecent(
      getRecentSearches()
    );
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return;
    }

    saveRecentSearch(
      debouncedQuery
    );

    setRecent(
      getRecentSearches()
    );
  }, [debouncedQuery]);

  /*
  |--------------------------------------------------------------------------
  | Search Query
  |--------------------------------------------------------------------------
  */

  const {
    data,
    isLoading,
    isError,
  } = useSearch({
    q: debouncedQuery,

    type:
      tab === "All"
        ? undefined
        : tab.toLowerCase(),
  });

  /*
  |--------------------------------------------------------------------------
  | Search Results
  |--------------------------------------------------------------------------
  */

  const results = useMemo(() => {
    return data?.data || {};
  }, [data]);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (isLoading) {
    return <SearchSkeleton />;
  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (isError) {
    return (
      <SearchLayout>

        <div
          className="
            flex
            h-72
            items-center
            justify-center
          "
        >
          <p className="text-red-500">
            Failed to load search results.
          </p>
        </div>

      </SearchLayout>
    );
  }

  return (
    <SearchLayout>

      {/* ======================================================
          Search Input
      ====================================================== */}

      <SearchInput
        value={query}
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
        onClear={() =>
          setQuery("")
        }
      />

      {/* ======================================================
          Search Tabs
      ====================================================== */}

      <SearchTabs
        active={tab}
        onChange={setTab}
      />
            {/* ======================================================
          Default Search Screen
      ====================================================== */}

      {!query && (
        <>
          <TrendingSearches
            items={[
              "Arijit Singh",
              "Taylor Swift",
              "Coldplay",
              "Lofi",
              "Workout",
              "Weekend",
            ]}
          />

          <RecentSearches
            items={recent}
            onSelect={setQuery}
          />
        </>
      )}

      {/* ======================================================
          Search Results
      ====================================================== */}

      {!!query && (
        <>
          {/* ==================================================
              FUTURE
              --------------------------------------------------
              □ Hero Background
              □ Verified Badge
              □ Monthly Listeners
              □ Followers
              □ Artist Genres
              ================================================== */}

          <TopResult
            results={results}
          />

          {/* ==================================================
              Empty State
              ================================================== */}

          {!results.songs?.length &&
          !results.albums?.length &&
          !results.artists?.length &&
          !results.playlists?.length ? (
            <EmptySearch />
          ) : (
            <>
              {/* ==================================================
                  Songs
                  ================================================== */}

              {!!results.songs?.length && (
                <SearchSection
                  title="Songs"
                  count={results.songs.length}
                >
                  <ResultGrid>

                    {results.songs.map((song) => (
                      <SongResultCard
                        key={song._id}
                        song={song}
                      />
                    ))}

                  </ResultGrid>
                </SearchSection>
              )}

              {/* ==================================================
                  Albums

                  FUTURE
                  -----------------------------------------------
                  □ Album Preview
                  □ Album Duration
                  □ Album Stats
                  ================================================== */}

              {!!results.albums?.length && (
                <SearchSection
                  title="Albums"
                  count={results.albums.length}
                >
                  <ResultGrid>

                    {results.albums.map((album) => (
                      <AlbumCard
                        key={album._id}
                        album={album}
                      />
                    ))}

                  </ResultGrid>
                </SearchSection>
              )}

              {/* ==================================================
                  Artists

                  FUTURE
                  -----------------------------------------------
                  □ Verified Badge
                  □ Followers
                  □ Monthly Listeners
                  □ Artist Genres
                  ================================================== */}

              {!!results.artists?.length && (
                <SearchSection
                  title="Artists"
                  count={results.artists.length}
                >
                  <ResultGrid>

                    {results.artists.map((artist) => (
                      <ArtistCard
                        key={artist._id}
                        artist={artist}
                      />
                    ))}

                  </ResultGrid>
                </SearchSection>
              )}

              {/* ==================================================
                  Playlists

                  FUTURE
                  -----------------------------------------------
                  □ Playlist Followers
                  □ Playlist Duration
                  □ Collaborative Badge
                  □ Save Playlist
                  ================================================== */}

              {!!results.playlists?.length && (
                <SearchSection
                  title="Playlists"
                  count={results.playlists.length}
                >
                  <ResultGrid>

                    {results.playlists.map((playlist) => (
                      <PlaylistCard
                        key={playlist._id}
                        playlist={playlist}
                      />
                    ))}

                  </ResultGrid>
                </SearchSection>
              )}

            </>
          )}

        </>
      )}

    </SearchLayout>
  );
}
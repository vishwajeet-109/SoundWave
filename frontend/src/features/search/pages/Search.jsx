import { useEffect, useMemo, useState } from "react";

import SearchLayout from "../components/SearchLayout";
import SearchInput from "../components/SearchInput";
import SearchTabs from "../components/SearchTabs";
import TrendingSearches from "../components/TrendingSearches";
import RecentSearches from "../components/RecentSearches";

import ResultGrid from "../components/ResultGrid";
import SongResultCard from "../components/SongResultCard";
import EmptySearch from "../components/EmptySearch";
import SearchSkeleton from "../components/SearchSkeleton";

import MusicCard from "@/features/home/components/MusicCard";
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

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setRecent(getRecentSearches());
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    saveRecentSearch(debouncedQuery);

    setRecent(getRecentSearches());
  }, [debouncedQuery]);

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

  const results = useMemo(() => {
    return data?.data || {};
  }, [data]);

  if (isLoading) {
    return (
      <SearchLayout>
        <SearchSkeleton />
      </SearchLayout>
    );
  }

  if (isError) {
    return (
      <SearchLayout>
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-8 text-red-400">
          Failed to load search results.
        </div>
      </SearchLayout>
    );
  }

  return (
    <SearchLayout>

      <SearchInput

value={query}

onChange={(e)=>setQuery(e.target.value)}

onClear={()=>setQuery("")}

/>

      <SearchTabs
        active={tab}
        onChange={setTab}
      />

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

      {!!query && (
        <>
          {!results.songs?.length &&
          !results.albums?.length &&
          !results.artists?.length &&
          !results.playlists?.length ? (
            <EmptySearch />
          ) : (
            <ResultGrid>

              {results.songs?.map((song) => (
                <SongResultCard
                  key={song._id}
                  song={song}
                />
              ))}

              {results.albums?.map((album) => (
                <MusicCard
                  key={album._id}
                  song={album}
                />
              ))}

              {results.artists?.map((artist) => (
                <ArtistCard
                  key={artist._id}
                  artist={artist}
                />
              ))}

              {results.playlists?.map((playlist) => (
                <PlaylistCard
                  key={playlist._id}
                  playlist={playlist}
                />
              ))}

            </ResultGrid>
          )}
        </>
      )}

    </SearchLayout>
  );
}
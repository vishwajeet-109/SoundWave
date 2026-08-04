// services/searchService.js
//
// Single unified search service per API-STANDARDS.md: "Never create
// separate search APIs for every entity if a unified search service
// is appropriate." One endpoint, optional `type` narrows results.

import Song from "../models/Song.js";
import Album from "../models/Album.js";
import Playlist from "../models/Playlist.js";
import User from "../models/User.js";
import { SONG_STATUS } from "../constants/songStatus.js";
import { VISIBILITY } from "../constants/visibility.js";
import { ROLES } from "../constants/roles.js";
import { getPaginationParams, buildPaginatedResult } from "../utils/pagination.js";

const searchSongs = async (q, skip, limit) => {
  const filter = {
    status: SONG_STATUS.APPROVED,
    visibility: VISIBILITY.PUBLIC,
    $text: { $search: q },
  };
  const [items, total] = await Promise.all([
    Song.find(filter, { score: { $meta: "textScore" } })
      .populate("artist", "name avatar")
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit)
      .lean(),
    Song.countDocuments(filter),
  ]);
  return { items, total };
};

const searchAlbums = async (q, skip, limit) => {
  const filter = { visibility: VISIBILITY.PUBLIC, $text: { $search: q } };
  const [items, total] = await Promise.all([
    Album.find(filter, { score: { $meta: "textScore" } })
      .populate("artist", "name avatar")
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit)
      .lean(),
    Album.countDocuments(filter),
  ]);
  return { items, total };
};

const searchPlaylists = async (q, skip, limit) => {
  const filter = { visibility: { $ne: VISIBILITY.PRIVATE }, $text: { $search: q } };
  const [items, total] = await Promise.all([
    Playlist.find(filter, { score: { $meta: "textScore" } })
      .populate("owner", "name avatar")
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit)
      .lean(),
    Playlist.countDocuments(filter),
  ]);
  return { items, total };
};

const searchArtists = async (q, skip, limit) => {
  const filter = {
    role: ROLES.ARTIST,
    status: "ACTIVE",
    name: { $regex: q, $options: "i" },
  };
  const [items, total] = await Promise.all([
    User.find(filter).select("name avatar bio").skip(skip).limit(limit).lean(),
    User.countDocuments(filter),
  ]);
  return { items, total };
};

/**
 * type="song"|"album"|"artist"|"playlist" narrows to one entity
 * (paginated normally). No type = combined results across all four,
 * each capped to `limit` so the payload stays predictable.
 */
const unifiedSearch = async ({ q, type, query }) => {
  const { page, limit, skip } = getPaginationParams(query);

  if (type === "song") {
    const result = await searchSongs(q, skip, limit);
    return { type, ...buildPaginatedResult({ ...result, page, limit }) };
  }
  if (type === "album") {
    const result = await searchAlbums(q, skip, limit);
    return { type, ...buildPaginatedResult({ ...result, page, limit }) };
  }
  if (type === "playlist") {
    const result = await searchPlaylists(q, skip, limit);
    return { type, ...buildPaginatedResult({ ...result, page, limit }) };
  }
  if (type === "artist") {
    const result = await searchArtists(q, skip, limit);
    return { type, ...buildPaginatedResult({ ...result, page, limit }) };
  }

  const [songs, albums, playlists, artists] = await Promise.all([
    searchSongs(q, 0, limit),
    searchAlbums(q, 0, limit),
    searchPlaylists(q, 0, limit),
    searchArtists(q, 0, limit),
  ]);

  return {
    query: q,
    songs: songs.items,
    albums: albums.items,
    playlists: playlists.items,
    artists: artists.items,
    totals: {
      songs: songs.total,
      albums: albums.total,
      playlists: playlists.total,
      artists: artists.total,
    },
  };
};

export default { unifiedSearch };

// services/albumService.js

import Album from "../models/Album.js";
import Song from "../models/Song.js";
import ApiError from "../utils/ApiError.js";
import generateSlug from "../utils/slugGenerator.js";
import { getPaginationParams, buildPaginatedResult } from "../utils/pagination.js";
import { ROLES } from "../constants/roles.js";

const findOwnedAlbumOrThrow = async (albumId, user) => {
  const album = await Album.findById(albumId);
  if (!album) throw new ApiError(404, "Album not found.");

  const isOwner = album.artist.toString() === user._id.toString();
  const isPrivileged = [ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(user.role);
  if (!isOwner && !isPrivileged) {
    throw new ApiError(403, "You do not have permission to modify this album.");
  }
  return album;
};



const createAlbum = async ({ artistId, body }) => {
  const slug = generateSlug(body.title);

const exists = await Album.findOne({
  slug,
});

if (exists) {
  throw new ApiError(
    409,
    "Album title already exists."
  );
}

console.log("Album Body:", {
  title: body.title,
  description: body.description,
  genre: body.genre,
  category: body.category,
  language: body.language,
});

  const album = await Album.create({

  title: body.title,

  slug,

  artist: artistId,

  description: body.description,

  genre: body.genre || null,

  category: body.category || null,

  releaseDate: body.releaseDate || null,

  visibility: body.visibility,

});
  return album;
};



const updateAlbum = async ({ albumId, user, body }) => {

  const album = await findOwnedAlbumOrThrow(albumId, user);

  const editableFields = [
    "title",
    "description",
    "genre",
    "category",
    "releaseDate",
    "visibility",
  ];

  editableFields.forEach((field) => {
    if (body[field] !== undefined) {
      album[field] = body[field];
    }
  });

  if (body.title) {

    const slug = generateSlug(body.title);

    const exists = await Album.findOne({
      slug,
      _id: { $ne: albumId },
    });

    if (exists) {
      throw new ApiError(
        409,
        "Album title already exists."
      );
    }

    album.slug = slug;
  }

  await album.save();

  return album;
};

const deleteAlbum = async ({ albumId, user }) => {

  const album = await findOwnedAlbumOrThrow(
    albumId,
    user
  );

  // Remove album reference from all songs
  await Song.updateMany(
    {
      album: album._id
    },
    {
      $set: {
        album: null
      }
    }
  );

  await album.deleteOne();

  return {
    albumId
  };

};

const getAlbumById = async (albumId) => {
  const album = await Album.findById(albumId)
    .populate("artist", "name avatar")
    .populate("songs", "title slug audioFile coverImage duration status");
  if (!album) throw new ApiError(404, "Album not found.");
  return album;
};

const listAlbums = async ({ query, artist, genre }) => {
  const { page, limit, skip } = getPaginationParams(query);

  const filter = {};
  if (artist) filter.artist = artist;
  if (genre) filter.genre = genre;

  const [items, total] = await Promise.all([
    Album.find(filter)
      .populate("artist", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Album.countDocuments(filter),
  ]);

  return buildPaginatedResult({ items, total, page, limit });
};

/**
 * Adds a song to an album. Only songs the requesting artist owns
 * (or an admin) can be attached — prevents an artist from bundling
 * someone else's track into their album.
 */
const addSongToAlbum = async ({ albumId, songId, user }) => {
  const album = await findOwnedAlbumOrThrow(albumId, user);

  const song = await Song.findById(songId);
  if (!song) throw new ApiError(404, "Song not found.");

  const isOwner = song.artist.toString() === user._id.toString();
  const isPrivileged = [ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(user.role);
  if (!isOwner && !isPrivileged) {
    throw new ApiError(403, "You can only add your own songs to this album.");
  }

  if (album.songs.some((id) => id.toString() === songId)) {
    throw new ApiError(409, "Song is already in this album.");
  }

 album.songs.push(songId);

song.album = album._id;

await song.save();

album.totalSongs = album.songs.length;

const songs = await Song.find({
    _id: { $in: album.songs }
})
.select("duration")
.lean();

album.totalDuration = songs.reduce(
    (total, song) => total + (song.duration || 0),
    0
);

await album.save();

return album;
};

const removeSongFromAlbum = async ({
  albumId,
  songId,
  user,
}) => {

  const album = await findOwnedAlbumOrThrow(
    albumId,
    user
  );

  // Song album me hai ya nahi
  if (
    !album.songs.some(
      (id) => id.toString() === songId
    )
  ) {
    throw new ApiError(
      404,
      "Song not found in album."
    );
  }

  // Song fetch karo
  const song = await Song.findById(songId);

  // Album se remove
  album.songs = album.songs.filter(
    (id) => id.toString() !== songId
  );

  // Song ka album reference bhi remove karo
  if (song) {
    song.album = null;
    await song.save();
  }

  // Counters update
  album.totalSongs = album.songs.length;

  const songs = await Song.find({
    _id: { $in: album.songs }
  })
    .select("duration")
    .lean();

  album.totalDuration = songs.reduce(
    (total, song) => total + (song.duration || 0),
    0
  );

  await album.save();

  return album;

};

export default {
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumById,
  listAlbums,
  addSongToAlbum,
  removeSongFromAlbum,
};

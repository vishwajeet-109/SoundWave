 import Album from "../models/Album.js";
import Playlist from "../models/Playlist.js";

import Song from "../models/Song.js";
import ApiError from "../utils/ApiError.js";
import { SONG_STATUS } from "../constants/songStatus.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import generateSlug from "../utils/slugGenerator.js";



const uploadToCloudinary = (buffer, folder, resourceType = "image") => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
            },
            (error, result) => {

                if (error) return reject(error);

                resolve(result);

            }
        );

        streamifier
            .createReadStream(buffer)
            .pipe(stream);

    });
};


class SongService {


    /*
    |--------------------------------------------------------------------------
    | Create Song
    |--------------------------------------------------------------------------
    */

 async createSong(userId, data, files) {

    const coverImage = files?.coverImage?.[0];
    const audioFile = files?.audioFile?.[0];

    if (!coverImage) {
        throw new ApiError(
            400,
            "Cover image is required."
        );
    }

    if (!audioFile) {
        throw new ApiError(
            400,
            "Audio file is required."
        );
    }

    const slug = generateSlug(data.title);

    const exists = await Song.findOne({
        slug,
    });

    if (exists) {
        throw new ApiError(
            409,
            "Song title already exists."
        );
    }

    let coverUpload = null;
    let audioUpload = null;

    try {

        coverUpload = await uploadToCloudinary(
            coverImage.buffer,
            "soundwave/covers",
            "image"
        );

        audioUpload = await uploadToCloudinary(
            audioFile.buffer,
            "soundwave/songs",
            "video"
        );

        // Remove unexpected field if client sends it
        delete data.mongoLanguage;

        console.log("Song Data:", data);

        const song = await Song.create({

            ...data,

            mongoLanguage: "none",

            slug,

            artist: userId,

            coverImage: coverUpload.secure_url,

            coverImagePublicId: coverUpload.public_id,

            audioFile: audioUpload.secure_url,

            audioFilePublicId: audioUpload.public_id,

            status: SONG_STATUS.PENDING,

            playCount: 0,

            likeCount: 0,

            downloadCount: 0,

            shareCount: 0,

        });

        return song;

    } catch (error) {

        if (coverUpload?.public_id) {
            await cloudinary.uploader.destroy(
                coverUpload.public_id
            );
        }

        if (audioUpload?.public_id) {
            await cloudinary.uploader.destroy(
                audioUpload.public_id,
                {
                    resource_type: "video",
                }
            );
        }

        throw error;

    }

}


    /*
    |--------------------------------------------------------------------------
    | Get My Songs
    |--------------------------------------------------------------------------
    */

    async getMySongs(userId) {

        return await Song.find({

            artist: userId

        }).sort({

            createdAt: -1

        });

    }

    /*
    |--------------------------------------------------------------------------
    | Get Song By ID
    |--------------------------------------------------------------------------
    */

    async getSongById(songId) {

        const song = await Song.findById(songId)
            .populate("artist", "name email")
            .populate("album", "title");

        if (!song) {

            throw new ApiError(

                404,

                "Song not found"

            );

        }

        return song;

    }

    /*
    |--------------------------------------------------------------------------
    | Update Song
    |--------------------------------------------------------------------------
    */

    async updateSong(songId, userId, data) {

        const song = await Song.findOne({

            _id: songId,

            artist: userId

        });

        if (!song) {

            throw new ApiError(

                404,

                "Song not found"

            );

        }

        Object.assign(

            song,

            data

        );

        await song.save();

        return song;

    }

    /*
    |--------------------------------------------------------------------------
    | Delete Song
    |--------------------------------------------------------------------------
    */

    async deleteSong(songId, userId) {

    const song = await Song.findOne({

        _id: songId,

        artist: userId

    });

    if (!song) {

        throw new ApiError(

            404,

            "Song not found"

        );

    }

    /*
    |----------------------------------------
    | Remove Song From Albums
    |----------------------------------------
    */

    await Album.updateMany(

        {
            songs: song._id
        },

        {
            $pull: {
                songs: song._id
            }
        }

    );
    const affectedAlbums = await Album.find({
    songs: {
        $ne: song._id
    }
});

for (const album of affectedAlbums) {

    const songs = await Song.find({
        _id: {
            $in: album.songs
        }
    }).select("duration");

    album.totalSongs = album.songs.length;

    album.totalDuration = songs.reduce(
        (sum, s) => sum + (s.duration || 0),
        0
    );

    await album.save();

}

    /*
    |----------------------------------------
    | Remove Song From Playlists
    |----------------------------------------
    */

    await Playlist.updateMany(

        {
            songs: song._id
        },

        {
            $pull: {
                songs: song._id
            }
        }

    );
            const affectedPlaylists = await Playlist.find({
    songs: {
        $ne: song._id
    }
});

for (const playlist of affectedPlaylists) {

    const songs = await Song.find({
        _id: {
            $in: playlist.songs
        }
    }).select("duration");

    playlist.totalSongs = playlist.songs.length;

    playlist.totalDuration = songs.reduce(
        (sum, s) => sum + (s.duration || 0),
        0
    );

    await playlist.save();

}

    /*
    |----------------------------------------
    | Delete Cover Image
    |----------------------------------------
    */

    if (song.coverImagePublicId) {

        await cloudinary.uploader.destroy(

            song.coverImagePublicId

        );

    }

    /*
    |----------------------------------------
    | Delete Audio File
    |----------------------------------------
    */

    if (song.audioFilePublicId) {

        await cloudinary.uploader.destroy(

            song.audioFilePublicId,

            {

                resource_type: "video"

            }

        );

    }

    /*
    |----------------------------------------
    | Delete Song
    |----------------------------------------
    */

    await song.deleteOne();

    return true;

}
    /*
    |--------------------------------------------------------------------------
    | Pending Songs
    |--------------------------------------------------------------------------
    */

    async getPendingSongs() {

        return await Song.find({

            status: SONG_STATUS.PENDING

        })

        .populate(

            "artist",

            "name email"

        )

        .sort({

            createdAt: -1

        });

    }

    /*
    |--------------------------------------------------------------------------
    | Approve Song
    |--------------------------------------------------------------------------
    */

    async approveSong(songId, adminId) {

        const song = await Song.findById(songId);

        if (!song) {

            throw new ApiError(

                404,

                "Song not found"

            );

        }

        song.status = SONG_STATUS.APPROVED;

        song.approvedBy = adminId;

        song.approvedAt = new Date();

        await song.save();

        return song;

    }

    /*
    |--------------------------------------------------------------------------
    | Reject Song
    |--------------------------------------------------------------------------
    */

    async rejectSong(songId, reason = "") {

        const song = await Song.findById(songId);

        if (!song) {

            throw new ApiError(

                404,

                "Song not found"

            );

        }

        song.status = SONG_STATUS.REJECTED;

        song.rejectedReason = reason;

        await song.save();

        return song;

    }

    /*
    |--------------------------------------------------------------------------
    | Block Song
    |--------------------------------------------------------------------------
    */

    async blockSong(songId) {

        const song = await Song.findById(songId);

        if (!song) {

            throw new ApiError(

                404,

                "Song not found"

            );

        }

        song.status = SONG_STATUS.BLOCKED;

        await song.save();

        return song;

    }

    /*
|--------------------------------------------------------------------------
| Get All Approved Songs
|--------------------------------------------------------------------------
*/

async getAllSongs(query) {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter = {

        status: SONG_STATUS.APPROVED

    };

    if (query.genre) {

        filter.genre = query.genre;

    }

    if (query.language) {

        filter.language = query.language;

    }

    if (query.category) {

        filter.category = query.category;

    }

    if (query.search) {

        filter.$text = {

            $search: query.search

        };

    }

    const songs = await Song.find(filter)

        .populate("artist", "name")

        .populate("album", "title")

        .sort({

            createdAt: -1

        })

        .skip(skip)

        .limit(limit);

    const total = await Song.countDocuments(filter);

    return {

        page,

        limit,

        total,

        totalPages: Math.ceil(total / limit),

        songs

    };

}

}

export default new SongService();
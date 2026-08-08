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
            throw new ApiError(400, "Cover image is required.");
        }

        if (!audioFile) {
            throw new ApiError(400, "Audio file is required.");
        }

        const slug = generateSlug(data.title);

        const exists = await Song.findOne({ slug });
        if (exists) {
            throw new ApiError(409, "Song title already exists.");
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

            delete data.mongoLanguage;

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
                await cloudinary.uploader.destroy(coverUpload.public_id).catch(() => null);
            }

            if (audioUpload?.public_id) {
                await cloudinary.uploader.destroy(audioUpload.public_id, {
                    resource_type: "video",
                }).catch(() => null);
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
        return await Song.find({ artist: userId }).sort({ createdAt: -1 });
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
            throw new ApiError(404, "Song not found");
        }

        return song;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Song (Sanitized Update)
    |--------------------------------------------------------------------------
    */
    async updateSong(songId, userId, data) {
    const song = await Song.findOne({
        _id: songId,
        artist: userId,
    });

    if (!song) {
        throw new ApiError(404, "Song not found");
    }

    const allowedUpdates = [
        "title",
        "genre",
        "language",
        "category",
        "description",
        "album",
    ];

    // Check if title has actually changed before mutating song document
    const titleChanged =
        data.title !== undefined &&
        data.title.trim() !== "" &&
        data.title.trim() !== song.title;

    if (titleChanged) {
        const newSlug = generateSlug(data.title);

        const existingSong = await Song.findOne({
            slug: newSlug,
            _id: { $ne: songId },
        });

        if (existingSong) {
            throw new ApiError(
                409,
                "Song title already exists."
            );
        }

        song.slug = newSlug;
    }

    // Safely assign allowed updates
    for (const field of allowedUpdates) {
        if (data[field] !== undefined) {
            song[field] = data[field];
        }
    }

    await song.save();

    return song;
}

    /*
    |--------------------------------------------------------------------------
    | Delete Song (Fixed DB Cascading Query)
    |--------------------------------------------------------------------------
    */
    async deleteSong(songId, userId) {
        const song = await Song.findOne({
            _id: songId,
            artist: userId
        });

        if (!song) {
            throw new ApiError(404, "Song not found");
        }

        // 1. Fetch only affected Albums and Playlists BEFORE pull
        const affectedAlbums = await Album.find({ songs: song._id });
        const affectedPlaylists = await Playlist.find({ songs: song._id });

        // 2. Pull song reference
        await Album.updateMany(
            { songs: song._id },
            { $pull: { songs: song._id } }
        );

        await Playlist.updateMany(
            { songs: song._id },
            { $pull: { songs: song._id } }
        );

        // 3. Recalculate stats only for affected Albums
        for (const album of affectedAlbums) {
            const remainingSongIds = album.songs.filter(id => id.toString() !== song._id.toString());
            const songs = await Song.find({ _id: { $in: remainingSongIds } }).select("duration");

            album.songs = remainingSongIds;
            album.totalSongs = remainingSongIds.length;
            album.totalDuration = songs.reduce((sum, s) => sum + (s.duration || 0), 0);

            await album.save();
        }

        // 4. Recalculate stats only for affected Playlists
        for (const playlist of affectedPlaylists) {
            const remainingSongIds = playlist.songs.filter(id => id.toString() !== song._id.toString());
            const songs = await Song.find({ _id: { $in: remainingSongIds } }).select("duration");

            playlist.songs = remainingSongIds;
            playlist.totalSongs = remainingSongIds.length;
            playlist.totalDuration = songs.reduce((sum, s) => sum + (s.duration || 0), 0);

            await playlist.save();
        }

        // 5. Cleanup Cloudinary media
        if (song.coverImagePublicId) {
            await cloudinary.uploader.destroy(song.coverImagePublicId).catch(() => null);
        }

        if (song.audioFilePublicId) {
            await cloudinary.uploader.destroy(song.audioFilePublicId, {
                resource_type: "video"
            }).catch(() => null);
        }

        // 6. Delete Song Document
        await song.deleteOne();

        return true;
    }

    /*
    |--------------------------------------------------------------------------
    | Pending Songs
    |--------------------------------------------------------------------------
    */
    async getPendingSongs() {
        return await Song.find({ status: SONG_STATUS.PENDING })
            .populate("artist", "name email")
            .sort({ createdAt: -1 });
    }

    /*
    |--------------------------------------------------------------------------
    | Approve Song
    |--------------------------------------------------------------------------
    */
    async approveSong(songId, adminId) {
        const song = await Song.findById(songId);

        if (!song) {
            throw new ApiError(404, "Song not found");
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
            throw new ApiError(404, "Song not found");
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
            throw new ApiError(404, "Song not found");
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

        if (query.genre) filter.genre = query.genre;
        if (query.language) filter.language = query.language;
        if (query.category) filter.category = query.category;

        if (query.search) {
            filter.$text = { $search: query.search };
        }

        const songs = await Song.find(filter)
            .populate("artist", "name")
            .populate("album", "title")
            .sort({ createdAt: -1 })
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
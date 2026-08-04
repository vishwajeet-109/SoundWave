import Song from "../models/Song.js";
import ApiError from "../utils/ApiError.js";
import { SONG_STATUS } from "../constants/songStatus.js";

class SongService {

    /*
    |--------------------------------------------------------------------------
    | Create Song
    |--------------------------------------------------------------------------
    */

    async createSong(userId, data) {

        const song = await Song.create({

            ...data,

            artist: userId,

            status: SONG_STATUS.PENDING,

            playCount: 0,

            likeCount: 0,

            downloadCount: 0,

            shareCount: 0

        });

        return song;

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
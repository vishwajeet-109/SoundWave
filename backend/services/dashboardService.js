import User from "../models/User.js";
import Song from "../models/Song.js";
import Album from "../models/Album.js";
import Playlist from "../models/Playlist.js";

class DashboardService {

    async getUserDashboard(userId) {

        const playlistCount = await Playlist.countDocuments({
            owner: userId
        });

        return {
            playlistCount,

            likedSongs: 0,

            recentlyPlayed: 0,

            listeningHistory: 0,

            recommendedSongs: []
        };

    }

    async getArtistDashboard(userId) {

        const totalSongs = await Song.countDocuments({
            artist: userId
        });

        const totalAlbums = await Album.countDocuments({
            artist: userId
        });

        return {

            totalSongs,

            totalAlbums,

            followers: 0,

            totalStreams: 0,

            monthlyListeners: 0

        };

    }

    async getAdminDashboard() {

        const users = await User.countDocuments({
            role: "USER"
        });

        const artists = await User.countDocuments({
            role: "ARTIST"
        });

        const admins = await User.countDocuments({
            role: "ADMIN"
        });

        const songs = await Song.countDocuments();

        const albums = await Album.countDocuments();

        return {

            users,

            artists,

            admins,

            songs,

            albums,

            pendingSongs: 0,

            approvedSongs: 0,

            blockedSongs: 0

        };

    }

}

export default new DashboardService();
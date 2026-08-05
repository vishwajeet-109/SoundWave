import api from "../config/axios.js";
import FormData from "form-data";
import fs from "fs";
import path from "path";

import {
    pass,
    fail,
    info,
} from "../helpers/logger.js";

import {
    pass as reportPass,
    fail as reportFail,
} from "../report.js";

import {
    TEST_USER,
    TEST_ARTIST,
    TEST_ADMIN,
} from "../config/env.js";

import {
    saveToken,
    saveArtistToken,
    saveAdminToken,
    getToken,
    getArtistToken,
    getAdminToken,
} from "../helpers/auth.js";

async function runTest(name, fn) {

    try {

        await fn();

        pass(name);

        reportPass();

    }

    catch (err) {

        fail(name);

        reportFail();

        console.log("\n==========================");

        console.log(name);

        console.log("==========================");

        if (err.response) {

            console.log(
                "Status :",
                err.response.status
            );

            console.log(
                JSON.stringify(
                    err.response.data,
                    null,
                    2
                )
            );

        }

        else {

            console.log(err.message);

        }

        console.log("");

    }

}

export default async function fullWorkflowTests() {

    info(
        "\n========== FULL WORKFLOW ==========\n"
    );

    let songId = null;

    let albumId = null;

    let playlistId = null;

    const coverPath = path.resolve(
        "tests/assets/cover.jpg"
    );

    const audioPath = path.resolve(
        "tests/assets/sample.mp3"
    );


    /*
|--------------------------------------------------------------------------
| USER LOGIN
|--------------------------------------------------------------------------
*/

await runTest(

    "Workflow User Login",

    async () => {

        const res = await api.post(

            "/auth/login",

            TEST_USER

        );

        if (res.status !== 200) {

            throw {

                response: res

            };

        }

        saveToken(
            res.data.data.accessToken
        );

    }

);

/*
|--------------------------------------------------------------------------
| ARTIST LOGIN
|--------------------------------------------------------------------------
*/

await runTest(

    "Workflow Artist Login",

    async () => {

        const res = await api.post(

            "/auth/login",

            TEST_ARTIST

        );

        if (res.status !== 200) {

            throw {

                response: res

            };

        }

        saveArtistToken(
            res.data.data.accessToken
        );

    }

);

/*
|--------------------------------------------------------------------------
| ADMIN LOGIN
|--------------------------------------------------------------------------
*/

await runTest(

    "Workflow Admin Login",

    async () => {

        const res = await api.post(

            "/auth/login",

            TEST_ADMIN

        );

        if (res.status !== 200) {

            throw {

                response: res

            };

        }

        saveAdminToken(
            res.data.data.accessToken
        );

    }

);

/*
|--------------------------------------------------------------------------
| CREATE SONG
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Create Song",
    async () => {

        const form = new FormData();

        form.append(
            "title",
            `Workflow Song ${Date.now()}`
        );

        form.append(
            "genre",
            "Pop"
        );

        form.append(
            "category",
            "Romantic"
        );

        form.append(
            "language",
            "Hindi"
        );

        form.append(
            "description",
            "Integration workflow song."
        );

        form.append(
            "coverImage",
            fs.createReadStream(
                coverPath
            )
        );

        form.append(
            "audioFile",
            fs.createReadStream(
                audioPath
            )
        );

        const res = await api.post(

            "/songs",

            form,

            {

                headers: {

                    ...form.getHeaders(),

                    Authorization:
                        `Bearer ${getArtistToken()}`

                },

                maxBodyLength: Infinity

            }

        );
console.log("\n===== CREATE SONG RESPONSE =====");
console.log(JSON.stringify(res.data, null, 2));
console.log("================================\n");
        if (res.status !== 201) {

            throw {
                response: res
            };

        }

        songId =
            res.data.data._id;

    }
);


/*
|--------------------------------------------------------------------------
| GET MY SONGS
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Get My Songs",
    async () => {

        const res = await api.get(

            "/songs/my-songs",

            {

                headers: {

                    Authorization:
                        `Bearer ${getArtistToken()}`

                }

            }

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| PENDING SONGS
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Pending Songs",
    async () => {

        const res = await api.get(

            "/songs/pending/list",

            {

                headers: {

                    Authorization:
                        `Bearer ${getAdminToken()}`

                }

            }

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| APPROVE SONG
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Approve Song",
    async () => {

        const res = await api.patch(

            `/songs/${songId}/approve`,

            {},

            {

                headers: {

                    Authorization:
                        `Bearer ${getAdminToken()}`

                }

            }

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| VERIFY SONG
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Verify Song",
    async () => {

        const res = await api.get(

            `/songs/${songId}`

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

        if (
            res.data.data.status !==
            "APPROVED"
        ) {

            throw new Error(
                "Song was not approved."
            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| CREATE ALBUM
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Create Album",
    async () => {

        const res = await api.post(

            "/albums",

            {

                title:
                    `Workflow Album ${Date.now()}`,

                description:
                    "Integration Album",

                genre:
                    "Pop",

                category:
                    "Romantic"

            },

            {

                headers: {

                    Authorization:
                        `Bearer ${getArtistToken()}`

                }

            }

        );

        if (res.status !== 201) {

            throw {
                response: res
            };

        }

        albumId =
            res.data.data._id;

    }
);

/*
|--------------------------------------------------------------------------
| ADD SONG TO ALBUM
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Add Song To Album",
    async () => {

        const res = await api.post(

            `/albums/${albumId}/songs`,

            {

                songId

            },

            {

                headers: {

                    Authorization:
                        `Bearer ${getArtistToken()}`

                }

            }

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| VERIFY ALBUM
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Verify Album",
    async () => {

        const res = await api.get(

            `/albums/${albumId}`

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

        const album =
            res.data.data;

        if (
            !album.songs.some(
                (song) =>
                    song._id === songId
            )
        ) {

            throw new Error(
                "Song not added to album."
            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| REMOVE SONG FROM ALBUM
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Remove Song From Album",
    async () => {

        const res =
            await api.delete(

                `/albums/${albumId}/songs`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getArtistToken()}`

                    },

                    data: {

                        songId

                    }

                }

            );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| VERIFY SONG REMOVED
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Verify Song Removed From Album",
    async () => {

        const res =
            await api.get(

                `/albums/${albumId}`

            );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

        const album =
            res.data.data;

        if (

            album.songs.some(

                (song) =>

                    song._id === songId

            )

        ) {

            throw new Error(

                "Song still exists in album."

            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| CREATE PLAYLIST
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Create Playlist",
    async () => {

        const res = await api.post(

            "/playlists",

            {

                title:
                    `Workflow Playlist ${Date.now()}`,

                description:
                    "Integration Playlist",

                visibility:
                    "PRIVATE"

            },

            {

                headers: {

                    Authorization:
                        `Bearer ${getArtistToken()}`

                }

            }

        );

        if (res.status !== 201) {

            throw {
                response: res
            };

        }

        playlistId =
            res.data.data._id;

    }
);

/*
|--------------------------------------------------------------------------
| ADD SONG TO PLAYLIST
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Add Song To Playlist",
    async () => {

        const res = await api.post(

            `/playlists/${playlistId}/songs`,

            {

                songId

            },

            {

                headers: {

                    Authorization:
                        `Bearer ${getArtistToken()}`

                }

            }

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| VERIFY PLAYLIST
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Verify Playlist",
    async () => {

        const res = await api.get(

            `/playlists/${playlistId}`,

            {

                headers: {

                    Authorization:
                        `Bearer ${getArtistToken()}`

                }

            }

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

        const playlist =
            res.data.data;

        if (

            !playlist.songs.some(

                (song) =>

                    song._id.toString() ===
                    songId.toString()

            )

        ) {

            throw new Error(

                "Song not added to playlist."

            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| REMOVE SONG FROM PLAYLIST
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Remove Song From Playlist",
    async () => {

        const res =
            await api.delete(

                `/playlists/${playlistId}/songs`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getArtistToken()}`

                    },

                    data: {

                        songId

                    }

                }

            );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| VERIFY SONG REMOVED
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Verify Song Removed From Playlist",
    async () => {

        const res =
            await api.get(

                `/playlists/${playlistId}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getArtistToken()}`

                    }

                }

            );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

        const playlist =
            res.data.data;

        if (

            playlist.songs.some(

                (song) =>

                    song._id.toString() ===
                    songId.toString()

            )

        ) {

            throw new Error(

                "Song still exists in playlist."

            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| DELETE SONG
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Delete Song",
    async () => {

        const res = await api.delete(

            `/songs/${songId}`,

            {

                headers: {

                    Authorization:
                        `Bearer ${getArtistToken()}`

                }

            }

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| DELETE ALBUM
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Delete Album",
    async () => {

        const res = await api.delete(

            `/albums/${albumId}`,

            {

                headers: {

                    Authorization:
                        `Bearer ${getArtistToken()}`

                }

            }

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| DELETE PLAYLIST
|--------------------------------------------------------------------------
*/

await runTest(
    "Workflow Delete Playlist",
    async () => {

        const res = await api.delete(

            `/playlists/${playlistId}`,

            {

                headers: {

                    Authorization:
                        `Bearer ${getArtistToken()}`

                }

            }

        );

        if (res.status !== 200) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| USER CANNOT CREATE SONG
|--------------------------------------------------------------------------
*/

await runTest(
    "User Cannot Create Song",
    async () => {

        const form = new FormData();

        form.append(
            "title",
            "Unauthorized Song"
        );

        form.append(
            "genre",
            "Pop"
        );

        form.append(
            "category",
            "Test"
        );

        form.append(
            "language",
            "Hindi"
        );

        form.append(
            "coverImage",
            fs.createReadStream(
                coverPath
            )
        );

        form.append(
            "audioFile",
            fs.createReadStream(
                audioPath
            )
        );

        const res = await api.post(

            "/songs",

            form,

            {

                headers: {

                    ...form.getHeaders(),

                    Authorization:
                        `Bearer ${getToken()}`

                }

            }

        );

        if (res.status !== 403) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| MISSING TOKEN
|--------------------------------------------------------------------------
*/

await runTest(
    "Missing Token",
    async () => {

        const res = await api.get(
            "/songs/my-songs"
        );

        if (res.status !== 401) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| INVALID SONG ID
|--------------------------------------------------------------------------
*/

await runTest(
    "Invalid Song Id",
    async () => {

        const res = await api.get(

            "/songs/123456789012345678901234"

        );

        if (
            ![400,404].includes(
                res.status
            )
        ) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| INVALID ALBUM ID
|--------------------------------------------------------------------------
*/

await runTest(
    "Invalid Album Id",
    async () => {

        const res = await api.get(

            "/albums/123456789012345678901234"

        );

        if (
            ![400,404].includes(
                res.status
            )
        ) {

            throw {
                response: res
            };

        }

    }
);

/*
|--------------------------------------------------------------------------
| INVALID PLAYLIST ID
|--------------------------------------------------------------------------
*/

await runTest(
  "Invalid Playlist Id",
  async () => {

    const res = await api.get(

      "/playlists/123456789012345678901234",

      {
        headers: {
          Authorization: `Bearer ${getArtistToken()}`
        }
      }

    );

    if (![400, 404].includes(res.status)) {
      throw { response: res };
    }

  }
);

}
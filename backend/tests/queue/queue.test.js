import api from "../config/axios.js";

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
    getToken,
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

            console.log(err);

        }

    }

}

export default async function queueTests() {

    info("\n========== QUEUE ==========\n");

    let songId = null;

    /*
    |--------------------------------------------------------------------------
    | Find Song
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Find Queue Song",

        async () => {

            const songs =
                await api.get("/songs");

            if (songs.status !== 200) {

                throw {
                    response: songs
                };

            }

            if (
                !songs.data.data.length
            ) {

                console.log(
                    "No songs found. Skipping."
                );

                return;

            }

            songId =
                songs.data.data[0]._id;

        }

    );

    if (!songId) {

        pass("Queue Tests Skipped");

        reportPass();

        return;

    }

    /*
    |--------------------------------------------------------------------------
    | Get Queue
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get Queue",

        async () => {

            const res =
                await api.get(

                    "/me/queue",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (
                res.status !== 200
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Set Queue
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Set Queue",

        async () => {

            const res =
                await api.put(

                    "/me/queue",

                    {

                        songIds: [
                            songId
                        ],

                        startIndex: 0

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (
                res.status !== 200
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Add Song To Queue
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Add Song To Queue",

        async () => {

            const res =
                await api.post(

                    "/me/queue/songs",

                    {

                        songId

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
                    200,
                    201,
                    409
                ].includes(
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
    | Remove Song From Queue
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Remove Song From Queue",

        async () => {

            const res =
                await api.delete(

                    "/me/queue/songs",

                    {

                        data: {

                            index: 0

                        },

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
                    200,
                    404
                ].includes(
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
    | Clear Queue
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Clear Queue",

        async () => {

            const res =
                await api.delete(

                    "/me/queue",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (
                res.status !== 200
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Queue Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Queue Without Token",

        async () => {

            const res =
                await api.get(
                    "/me/queue"
                );

            if (
                res.status !== 401
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Invalid Song Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Queue Invalid Song Id",

        async () => {

            const res =
                await api.post(

                    "/me/queue/songs",

                    {

                        songId:
                            "123456789012345678901234"

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
                    400,
                    404,
                    422
                ].includes(
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
    | Invalid Queue Payload
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Queue Payload",

        async () => {

            const res =
                await api.put(

                    "/me/queue",

                    {

                        songIds: "invalid"

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
                    400,
                    422
                ].includes(
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
    | Play Next
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Play Next",

        async () => {

            const res =
                await api.post(

                    "/me/queue/next",

                    {},

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
                    200,
                    404
                ].includes(
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
    | Play Previous
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Play Previous",

        async () => {

            const res =
                await api.post(

                    "/me/queue/previous",

                    {},

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
                    200,
                    404
                ].includes(
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
    | Set Repeat Mode
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Set Repeat Mode",

        async () => {

            const res =
                await api.patch(

                    "/me/queue/repeat",

                    {

                        repeatMode: "all"

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
                    200,
                    400,
                    422
                ].includes(
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
    | Toggle Shuffle
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Toggle Shuffle",

        async () => {

            const res =
                await api.post(

                    "/me/queue/shuffle",

                    {},

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (
                res.status !== 200
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Invalid Repeat Mode
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Repeat Mode",

        async () => {

            const res =
                await api.patch(

                    "/me/queue/repeat",

                    {

                        repeatMode: "invalid"

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
                    400,
                    422
                ].includes(
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
    | Repeat Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Repeat Without Token",

        async () => {

            const res =
                await api.patch(

                    "/me/queue/repeat",

                    {

                        repeatMode: "all"

                    }

                );

            if (
                res.status !== 401
            ) {

                throw {
                    response: res
                };

            }

        }

    );
        /*
    |--------------------------------------------------------------------------
    | Shuffle Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Shuffle Without Token",

        async () => {

            const res =
                await api.post(
                    "/me/queue/shuffle"
                );

            if (
                res.status !== 401
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Next Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Next Without Token",

        async () => {

            const res =
                await api.post(
                    "/me/queue/next"
                );

            if (
                res.status !== 401
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Previous Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Previous Without Token",

        async () => {

            const res =
                await api.post(
                    "/me/queue/previous"
                );

            if (
                res.status !== 401
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Duplicate Song In Queue
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Duplicate Song Queue",

        async () => {

            await api.post(

                "/me/queue/songs",

                {

                    songId

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

                    }

                }

            );

            const res =
                await api.post(

                    "/me/queue/songs",

                    {

                        songId

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
                    200,
                    201,
                    409
                ].includes(
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
    | Multiple Queue Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Queue Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/me/queue",

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${getToken()}`

                            }

                        }

                    );

                if (
                    res.status !== 200
                ) {

                    throw {
                        response: res
                    };

                }

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Verify Queue
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Verify Queue",

        async () => {

            const res =
                await api.get(

                    "/me/queue",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (
                res.status !== 200
            ) {

                throw {
                    response: res
                };

            }

        }

    );
        /*
    |--------------------------------------------------------------------------
    | Remove Invalid Queue Index
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Remove Invalid Queue Index",

        async () => {

            const res =
                await api.delete(

                    "/me/queue/songs",

                    {

                        data: {

                            index: 999

                        },

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
                    200,
                    400,
                    404,
                    422
                ].includes(
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
    | Final Clear Queue
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Clear Queue",

        async () => {

            const res =
                await api.delete(

                    "/me/queue",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (
                res.status !== 200
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Verify Empty Queue
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Verify Empty Queue",

        async () => {

            const res =
                await api.get(

                    "/me/queue",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (
                res.status !== 200
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Clear Queue Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Clear Queue Without Token",

        async () => {

            const res =
                await api.delete(
                    "/me/queue"
                );

            if (
                res.status !== 401
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Queue Final Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Queue Final Verification",

        async () => {

            const res =
                await api.get(

                    "/me/queue",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`
                        }

                    }

                );

            if (
                res.status !== 200
            ) {

                throw {
                    response: res
                };

            }

        }

    );

}
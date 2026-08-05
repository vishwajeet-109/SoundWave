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

export default async function playbackTests() {

    info("\n========== PLAYBACK ==========\n");

    let songId = null;

    /*
    |--------------------------------------------------------------------------
    | Find Song
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Find Playback Song",

        async () => {

            const songs =
                await api.get("/songs");

            if (
                songs.status !== 200
            ) {

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

        pass("Playback Tests Skipped");

        reportPass();

        return;

    }

    /*
    |--------------------------------------------------------------------------
    | Get Progress
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get Playback Progress",

        async () => {

            const res =
                await api.get(

                    `/stream/${songId}/progress`,

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
    | Update Progress
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Update Playback Progress",

        async () => {

            const res =
                await api.patch(

                    `/stream/${songId}/progress`,

                    {

                        positionSeconds: 120,

                        completed: false

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
    | Continue Listening
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Continue Listening",

        async () => {

            const res =
                await api.get(

                    "/me/continue-listening",

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
    | Update Progress Completed
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Complete Playback",

        async () => {

            const res =
                await api.patch(

                    `/stream/${songId}/progress`,

                    {

                        positionSeconds: 240,

                        completed: true

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
    | Invalid Song Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Playback Invalid Song Id",

        async () => {

            const res =
                await api.get(

                    "/stream/123456789012345678901234/progress",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (

                ![
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
    | Get Progress Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Playback Without Token",

        async () => {

            const res =
                await api.get(

                    `/stream/${songId}/progress`

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
    | Update Progress Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Update Playback Without Token",

        async () => {

            const res =
                await api.patch(

                    `/stream/${songId}/progress`,

                    {

                        positionSeconds: 60,

                        completed: false

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
    | Continue Listening Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Continue Listening Without Token",

        async () => {

            const res =
                await api.get(

                    "/me/continue-listening"

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
    | Invalid Progress Payload
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Playback Payload",

        async () => {

            const res =
                await api.patch(

                    `/stream/${songId}/progress`,

                    {

                        positionSeconds: "abc",

                        completed: "yes"

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
    | Negative Position
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Negative Playback Position",

        async () => {

            const res =
                await api.patch(

                    `/stream/${songId}/progress`,

                    {

                        positionSeconds: -10,

                        completed: false

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
    | Large Playback Position
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Large Playback Position",

        async () => {

            const res =
                await api.patch(

                    `/stream/${songId}/progress`,

                    {

                        positionSeconds: 999999,

                        completed: false

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
    | Continue Listening Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Continue Listening Limit",

        async () => {

            const res =
                await api.get(

                    "/me/continue-listening?limit=5",

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
    | Multiple Progress Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Progress Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        `/stream/${songId}/progress`,

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

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Multiple Continue Listening Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Continue Listening Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/me/continue-listening",

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
    | Invalid Continue Listening Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Continue Listening Limit",

        async () => {

            const res =
                await api.get(

                    "/me/continue-listening?limit=abc",

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
    | Decimal Continue Listening Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Decimal Continue Listening Limit",

        async () => {

            const res =
                await api.get(

                    "/me/continue-listening?limit=10.5",

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
    | Final Playback Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Playback Verification",

        async () => {

            const res =
                await api.get(

                    `/stream/${songId}/progress`,

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
    | Final Continue Listening Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Continue Listening Verification",

        async () => {

            const res =
                await api.get(

                    "/me/continue-listening",

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
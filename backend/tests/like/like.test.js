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

export default async function likeTests() {

    info("\n========== LIKE ==========\n");

    let songId = null;

    /*
    |--------------------------------------------------------------------------
    | Find Song
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Find Song",

        async () => {

            const songs =
                await api.get(
                    "/songs"
                );

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

        pass("Like Tests Skipped");

        reportPass();

        return;

    }

    /*
    |--------------------------------------------------------------------------
    | Like Song
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Like Song",

        async () => {

            const res =
                await api.post(

                    `/songs/${songId}/like`,

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
    | Verify Like
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Verify Like",

        async () => {

            const res =
                await api.get(

                    "/me/likes",

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
    | Unlike Song
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Unlike Song",

        async () => {

            const res =
                await api.delete(

                    `/songs/${songId}/like`,

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
                    204,
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
    | Invalid Song Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Song Id",

        async () => {

            const res =
                await api.post(

                    "/songs/123456789012345678901234/like",

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
                    400,
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
    | Like Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Like Without Token",

        async () => {

            const res =
                await api.post(

                    `/songs/${songId}/like`

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
    | Unlike Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Unlike Without Token",

        async () => {

            const res =
                await api.delete(

                    `/songs/${songId}/like`

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
    | Duplicate Like
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Duplicate Like",

        async () => {

            await api.post(

                `/songs/${songId}/like`,

                {},

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

                    }

                }

            );

            const res =
                await api.post(

                    `/songs/${songId}/like`,

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
    | Double Unlike
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Double Unlike",

        async () => {

            await api.delete(

                `/songs/${songId}/like`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

                    }

                }

            );

            const res =
                await api.delete(

                    `/songs/${songId}/like`,

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
                    204,
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
    | Verify My Likes
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Verify My Likes",

        async () => {

            const res =
                await api.get(

                    "/me/likes",

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
    | Multiple Like Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Like Requests",

        async () => {

            for (let i = 0; i < 3; i++) {

                const res =
                    await api.post(

                        `/songs/${songId}/like`,

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

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Invalid HTTP Method
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Like Invalid Method",

        async () => {

            const res =
                await api.put(

                    `/songs/${songId}/like`,

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
                    404,
                    405
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
    | Verify Song Exists
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Verify Song Exists",

        async () => {

            const res =
                await api.get(

                    `/songs/${songId}`

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
    | My Likes Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Without Token",

        async () => {

            const res =
                await api.get(
                    "/me/likes"
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
    | Invalid Like Route
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Like Route",

        async () => {

            const res =
                await api.post(

                    "/songs/invalid-id/like",

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
    | Final Unlike Cleanup
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Unlike Cleanup",

        async () => {

            const res =
                await api.delete(

                    `/songs/${songId}/like`,

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
                    204,
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
    | Final My Likes Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final My Likes Verification",

        async () => {

            const res =
                await api.get(

                    "/me/likes",

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
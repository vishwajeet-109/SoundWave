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

export default async function followTests() {

    info("\n========== FOLLOW ==========\n");

    let artistId = null;

    /*
    |--------------------------------------------------------------------------
    | Find Artist
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Find Artist",

        async () => {

            const artists = await api.get(
                "/artists"
            );

            if (
                artists.status !== 200
            ) {

                throw {
                    response: artists
                };

            }

            if (
                !artists.data.data.length
            ) {

                console.log(
                    "No artists found. Skipping."
                );

                return;

            }

            artistId =
                artists.data.data[0]._id;

        }

    );

    if (!artistId) {

        pass("Follow Tests Skipped");

        reportPass();

        return;

    }

    /*
    |--------------------------------------------------------------------------
    | Follow Artist
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Follow Artist",

        async () => {

            const res =
                await api.post(

                    `/artists/${artistId}/follow`,

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
    | Followers List
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Artist Followers",

        async () => {

            const res =
                await api.get(

                    `/artists/${artistId}/followers`,

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
    | My Following
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Following",

        async () => {

            const res = await api.get(

                "/me/following",

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

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
    | Unfollow Artist
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Unfollow Artist",

        async () => {

            const res = await api.delete(

                `/artists/${artistId}/follow`,

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
    | Invalid Artist Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Artist Id",

        async () => {

            const res = await api.post(

                "/artists/123456789012345678901234/follow",

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
    | Follow Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Follow Without Token",

        async () => {

            const res = await api.post(

                `/artists/${artistId}/follow`,

                {}

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
    | Followers Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Followers Without Token",

        async () => {

            const res = await api.get(

                `/artists/${artistId}/followers`

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
    | My Following Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Following Without Token",

        async () => {

            const res = await api.get(
                "/me/following"
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
    | Duplicate Follow
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Duplicate Follow",

        async () => {

            await api.post(

                `/artists/${artistId}/follow`,

                {},

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

                    }

                }

            );

            const res = await api.post(

                `/artists/${artistId}/follow`,

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
    | Double Unfollow
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Double Unfollow",

        async () => {

            await api.delete(

                `/artists/${artistId}/follow`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

                    }

                }

            );

            const res = await api.delete(

                `/artists/${artistId}/follow`,

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
    | Followers Pagination
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Followers Pagination",

        async () => {

            const res = await api.get(

                `/artists/${artistId}/followers?page=1&limit=10`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

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
    | Following Pagination
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Following Pagination",

        async () => {

            const res = await api.get(

                "/me/following?page=1&limit=10",

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

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
    | Invalid Followers Artist Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Followers Artist Id",

        async () => {

            const res = await api.get(

                "/artists/123456789012345678901234/followers",

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
    | Invalid Following Query
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Following Invalid Query",

        async () => {

            const res = await api.get(

                "/me/following?page=-1&limit=abc",

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
    | Final Cleanup
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Follow Cleanup",

        async () => {

            await api.delete(

                `/artists/${artistId}/follow`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

                    }

                }

            );

        }

    );

}
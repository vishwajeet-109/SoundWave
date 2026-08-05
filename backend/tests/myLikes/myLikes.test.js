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

export default async function myLikesTests() {

    info("\n========== MY LIKES ==========\n");

    /*
    |--------------------------------------------------------------------------
    | Get My Likes
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get My Likes",

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
    | Pagination
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Pagination",

        async () => {

            const res =
                await api.get(

                    "/me/likes?page=1&limit=10",

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
    | Large Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Large Limit",

        async () => {

            const res =
                await api.get(

                    "/me/likes?page=1&limit=100",

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
    | Empty Query
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Empty Query",

        async () => {

            const res =
                await api.get(

                    "/me/likes",

                    {

                        params: {},

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
    | Without Token
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
    | Invalid Pagination
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Invalid Pagination",

        async () => {

            const res =
                await api.get(

                    "/me/likes?page=-1&limit=abc",

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
    | Invalid Query
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Invalid Query",

        async () => {

            const res =
                await api.get(

                    "/me/likes?page=test&limit=test",

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
    | Multiple Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple My Likes Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

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

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Zero Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Zero Limit",

        async () => {

            const res =
                await api.get(

                    "/me/likes?page=1&limit=0",

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
    | Negative Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Negative Limit",

        async () => {

            const res =
                await api.get(

                    "/me/likes?page=1&limit=-5",

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
    | Negative Page
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Negative Page",

        async () => {

            const res =
                await api.get(

                    "/me/likes?page=-10&limit=10",

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
    | Decimal Pagination
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Decimal Pagination",

        async () => {

            const res =
                await api.get(

                    "/me/likes?page=1.5&limit=10.5",

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
    | Final Verification
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

    /*
    |--------------------------------------------------------------------------
    | Stress Test
    |--------------------------------------------------------------------------
    */

    await runTest(

        "My Likes Stress Test",

        async () => {

            for (let i = 0; i < 10; i++) {

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

                if (res.status !== 200) {

                    throw {
                        response: res
                    };

                }

            }

        }

    );

}
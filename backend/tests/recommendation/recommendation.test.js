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

export default async function recommendationTests() {

    info("\n========== RECOMMENDATIONS ==========\n");

    /*
    |--------------------------------------------------------------------------
    | Get Recommendations
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get Recommendations",

        async () => {

            const res =
                await api.get(

                    "/recommendations",

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
    | Get Trending
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get Trending Songs",

        async () => {

            const res =
                await api.get(

                    "/recommendations/trending",

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
    | Recommendations Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Recommendations Limit",

        async () => {

            const res =
                await api.get(

                    "/recommendations?limit=5",

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
    | Trending Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Trending Limit",

        async () => {

            const res =
                await api.get(

                    "/recommendations/trending?limit=5",

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
    | Recommendations Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Recommendations Without Token",

        async () => {

            const res =
                await api.get(
                    "/recommendations"
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
    | Trending Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Trending Without Token",

        async () => {

            const res =
                await api.get(
                    "/recommendations/trending"
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
    | Invalid Recommendation Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Recommendation Invalid Limit",

        async () => {

            const res =
                await api.get(

                    "/recommendations?limit=abc",

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
    | Large Recommendation Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Recommendation Large Limit",

        async () => {

            const res =
                await api.get(

                    "/recommendations?limit=1000",

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
    | Decimal Recommendation Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Recommendation Decimal Limit",

        async () => {

            const res =
                await api.get(

                    "/recommendations?limit=10.5",

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
    | Multiple Recommendation Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Recommendation Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/recommendations",

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
    | Multiple Trending Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Trending Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/recommendations/trending",

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

        "Recommendation Zero Limit",

        async () => {

            const res =
                await api.get(

                    "/recommendations?limit=0",

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

        "Recommendation Negative Limit",

        async () => {

            const res =
                await api.get(

                    "/recommendations?limit=-5",

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
    | Final Recommendation Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Recommendation Verification",

        async () => {

            const res =
                await api.get(

                    "/recommendations",

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
    | Final Trending Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Trending Verification",

        async () => {

            const res =
                await api.get(

                    "/recommendations/trending",

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
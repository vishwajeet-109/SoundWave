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

export default async function historyTests() {

    info("\n========== HISTORY ==========\n");

    /*
    |--------------------------------------------------------------------------
    | Get History
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get Listening History",

        async () => {

            const res =
                await api.get(

                    "/me/history",

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
    | History Pagination
    |--------------------------------------------------------------------------
    */

    await runTest(

        "History Pagination",

        async () => {

            const res =
                await api.get(

                    "/me/history?page=1&limit=10",

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
    | Empty History Query
    |--------------------------------------------------------------------------
    */

    await runTest(

        "History Empty Query",

        async () => {

            const res =
                await api.get(

                    "/me/history",

                    {

                        params: {

                            page: 1,

                            limit: 100

                        },

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
    | Clear History
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Clear Listening History",

        async () => {

            const res =
                await api.delete(

                    "/me/history",

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
    | Clear Already Empty History
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Clear Empty History",

        async () => {

            const res =
                await api.delete(

                    "/me/history",

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
                    204
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
    | History Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "History Without Token",

        async () => {

            const res =
                await api.get(
                    "/me/history"
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
    | Clear History Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Clear History Without Token",

        async () => {

            const res =
                await api.delete(
                    "/me/history"
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

        "History Invalid Pagination",

        async () => {

            const res =
                await api.get(

                    "/me/history?page=-1&limit=abc",

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
    | Large Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "History Large Limit",

        async () => {

            const res =
                await api.get(

                    "/me/history?page=1&limit=1000",

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
    | Invalid Query Values
    |--------------------------------------------------------------------------
    */

    await runTest(

        "History Invalid Query",

        async () => {

            const res =
                await api.get(

                    "/me/history?page=test&limit=test",

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
    | Verify History After Clear
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Verify History After Clear",

        async () => {

            const res =
                await api.get(

                    "/me/history",

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
    | Multiple Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple History Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/me/history",

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

    /*
    |--------------------------------------------------------------------------
    | Zero Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "History Zero Limit",

        async () => {

            const res =
                await api.get(

                    "/me/history?page=1&limit=0",

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

        "History Negative Limit",

        async () => {

            const res =
                await api.get(

                    "/me/history?page=1&limit=-10",

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

        "History Negative Page",

        async () => {

            const res =
                await api.get(

                    "/me/history?page=-5&limit=10",

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
    | Decimal Values
    |--------------------------------------------------------------------------
    */

    await runTest(

        "History Decimal Pagination",

        async () => {

            const res =
                await api.get(

                    "/me/history?page=1.5&limit=10.5",

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

        "History Final Verification",

        async () => {

            const res =
                await api.get(

                    "/me/history",

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

}
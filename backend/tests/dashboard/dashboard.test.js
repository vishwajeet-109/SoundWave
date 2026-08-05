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

            console.log(err);

        }

    }

}

export default async function dashboardTests() {

    info("\n========== DASHBOARD ==========\n");

    /*
    |--------------------------------------------------------------------------
    | User Dashboard
    |--------------------------------------------------------------------------
    */

    await runTest(

        "User Dashboard",

        async () => {

            const res =
                await api.get(

                    "/dashboard/user",

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
    | Artist Dashboard
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Artist Dashboard",

        async () => {

            const res =
                await api.get(

                    "/dashboard/artist",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getArtistToken()}`

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
    | Admin Dashboard
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Admin Dashboard",

        async () => {

            const res =
                await api.get(

                    "/dashboard/admin",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getAdminToken()}`

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
    | User Dashboard Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "User Dashboard Without Token",

        async () => {

            const res =
                await api.get(
                    "/dashboard/user"
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
    | Artist Dashboard Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Artist Dashboard Without Token",

        async () => {

            const res =
                await api.get(
                    "/dashboard/artist"
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
    | Admin Dashboard Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Admin Dashboard Without Token",

        async () => {

            const res =
                await api.get(
                    "/dashboard/admin"
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
    | Super Admin Dashboard
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Super Admin Dashboard",

        async () => {

            const res =
                await api.get(

                    "/dashboard/super-admin",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getAdminToken()}`

                        }

                    }

                );

            if (

                ![
                    200,
                    403
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
    | Super Admin Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Super Admin Without Token",

        async () => {

            const res =
                await api.get(
                    "/dashboard/super-admin"
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
    | User Cannot Access Artist Dashboard
    |--------------------------------------------------------------------------
    */

    await runTest(

        "User Cannot Access Artist Dashboard",

        async () => {

            const res =
                await api.get(

                    "/dashboard/artist",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (
                res.status !== 403
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | User Cannot Access Admin Dashboard
    |--------------------------------------------------------------------------
    */

    await runTest(

        "User Cannot Access Admin Dashboard",

        async () => {

            const res =
                await api.get(

                    "/dashboard/admin",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (
                res.status !== 403
            ) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Artist Cannot Access Admin Dashboard
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Artist Cannot Access Admin Dashboard",

        async () => {

            const res =
                await api.get(

                    "/dashboard/admin",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getArtistToken()}`

                        }

                    }

                );

            if (
                res.status !== 403
            ) {

                throw {
                    response: res
                };

            }

        }

    );
        /*
    |--------------------------------------------------------------------------
    | Admin Cannot Access User Dashboard
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Admin Cannot Access User Dashboard",

        async () => {

            const res =
                await api.get(

                    "/dashboard/user",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getAdminToken()}`

                        }

                    }

                );

            if (

                res.status !== 403

            ) {

                throw {

                    response: res

                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Admin Cannot Access Artist Dashboard
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Admin Cannot Access Artist Dashboard",

        async () => {

            const res =
                await api.get(

                    "/dashboard/artist",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getAdminToken()}`

                        }

                    }

                );

            if (

                res.status !== 403

            ) {

                throw {

                    response: res

                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Artist Cannot Access User Dashboard
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Artist Cannot Access User Dashboard",

        async () => {

            const res =
                await api.get(

                    "/dashboard/user",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getArtistToken()}`

                        }

                    }

                );

            if (

                res.status !== 403

            ) {

                throw {

                    response: res

                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Multiple User Dashboard Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple User Dashboard Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/dashboard/user",

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
    | Multiple Artist Dashboard Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Artist Dashboard Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/dashboard/artist",

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${getArtistToken()}`

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
    | Multiple Admin Dashboard Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Admin Dashboard Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/dashboard/admin",

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${getAdminToken()}`

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
    | Multiple Super Admin Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Super Admin Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/dashboard/super-admin",

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${getAdminToken()}`

                            }

                        }

                    );

                if (

                    ![
                        200,
                        403
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
    | Final User Dashboard Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final User Dashboard Verification",

        async () => {

            const res =
                await api.get(

                    "/dashboard/user",

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
    | Final Artist Dashboard Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Artist Dashboard Verification",

        async () => {

            const res =
                await api.get(

                    "/dashboard/artist",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getArtistToken()}`

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
    | Final Admin Dashboard Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Admin Dashboard Verification",

        async () => {

            const res =
                await api.get(

                    "/dashboard/admin",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getAdminToken()}`

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
    | Final Super Admin Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Super Admin Verification",

        async () => {

            const res =
                await api.get(

                    "/dashboard/super-admin",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getAdminToken()}`

                        }

                    }

                );

            if (

                ![
                    200,
                    403
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

}
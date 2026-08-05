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

export default async function analyticsTests() {

    info("\n========== ANALYTICS ==========\n");

    /*
    |--------------------------------------------------------------------------
    | Dashboard Overview
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Dashboard Overview",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/overview",

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
    | Top Artists
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Top Artists",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/top-artists",

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
    | Monthly Analytics
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Monthly Analytics",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/monthly",

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
    | User Cannot Access Analytics
    |--------------------------------------------------------------------------
    */

    await runTest(

        "User Cannot Access Analytics",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/overview",

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
    | Analytics Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Analytics Without Token",

        async () => {

            const res =
                await api.get(
                    "/admin/analytics/overview"
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
    | Top Artists Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Top Artists Limit",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/top-artists?limit=5",

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
    | Monthly Analytics (12 Months)
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Monthly Analytics 12 Months",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/monthly?months=12",

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
    | Invalid Months
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Analytics Months",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/monthly?months=abc",

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
    | Invalid Top Artist Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Top Artist Limit",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/top-artists?limit=abc",

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
    | Multiple Overview Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Overview Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/admin/analytics/overview",

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
    | Multiple Top Artists Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Top Artists Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/admin/analytics/top-artists",

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
    | Large Top Artist Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Large Top Artist Limit",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/top-artists?limit=100",

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
    | Zero Top Artist Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Zero Top Artist Limit",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/top-artists?limit=0",

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
    | Negative Top Artist Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Negative Top Artist Limit",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/top-artists?limit=-5",

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
    | Large Months
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Large Analytics Months",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/monthly?months=100",

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
    | Zero Months
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Zero Analytics Months",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/monthly?months=0",

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
    | Negative Months
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Negative Analytics Months",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/monthly?months=-10",

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
    | Multiple Monthly Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Monthly Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/admin/analytics/monthly",

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
    | Decimal Top Artist Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Decimal Top Artist Limit",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/top-artists?limit=10.5",

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
    | Decimal Months
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Decimal Analytics Months",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/monthly?months=6.5",

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
    | Final Overview Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Overview Verification",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/overview",

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
    | Final Top Artists Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Top Artists Verification",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/top-artists",

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
    | Final Monthly Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Monthly Verification",

        async () => {

            const res =
                await api.get(

                    "/admin/analytics/monthly",

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

}
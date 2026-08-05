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

export default async function reportTests() {

    info("\n========== REPORT ==========\n");

    let reportId = null;

    let songId = null;

    /*
    |--------------------------------------------------------------------------
    | Find Song
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Find Song For Report",

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

        pass("Report Tests Skipped");

        reportPass();

        return;

    }

    /*
    |--------------------------------------------------------------------------
    | Create Report
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Create Report",

        async () => {

            const res =
                await api.post(

                    "/reports",

                    {

                        songId,

                        reason: "Spam",

                        description:
                            "Automated integration test."

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getToken()}`

                        }

                    }

                );

            if (
                res.status !== 201
            ) {

                throw {
                    response: res
                };

            }

            reportId =
                res.data.data?._id ||
                res.data.data?.report?._id ||
                null;

        }

    );

    /*
    |--------------------------------------------------------------------------
    | List Reports (Admin)
    |--------------------------------------------------------------------------
    */

    await runTest(

        "List Reports",

        async () => {

            const res =
                await api.get(

                    "/reports",

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

            if (
                !reportId &&
                Array.isArray(
                    res.data.data
                ) &&
                res.data.data.length
            ) {

                reportId =
                    res.data.data[0]._id;

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Report Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Create Report Without Token",

        async () => {

            const res =
                await api.post(

                    "/reports",

                    {

                        songId,

                        reason: "Spam"

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
    | Review Report (Admin)
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Review Report",

        async () => {

            if (!reportId) {

                console.log(
                    "No report found. Skipping."
                );

                return;

            }

            const res =
                await api.patch(

                    `/reports/${reportId}/review`,

                    {

                        status: "resolved",

                        note: "Reviewed by automated integration test."

                    },

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
    | Invalid Report Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Report Id",

        async () => {

            const res =
                await api.patch(

                    "/reports/123456789012345678901234/review",

                    {

                        status: "resolved"

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getAdminToken()}`

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
    | Invalid Review Status
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Review Status",

        async () => {

            if (!reportId) {

                return;

            }

            const res =
                await api.patch(

                    `/reports/${reportId}/review`,

                    {

                        status: "invalid-status"

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getAdminToken()}`

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
    | User Cannot Review Report
    |--------------------------------------------------------------------------
    */

    await runTest(

        "User Cannot Review Report",

        async () => {

            if (!reportId) {

                return;

            }

            const res =
                await api.patch(

                    `/reports/${reportId}/review`,

                    {

                        status: "resolved"

                    },

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
    | List Reports Without Admin
    |--------------------------------------------------------------------------
    */

    await runTest(

        "List Reports Without Admin",

        async () => {

            const res =
                await api.get(

                    "/reports",

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
    | List Reports Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "List Reports Without Token",

        async () => {

            const res =
                await api.get(

                    "/reports"

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
    | Empty Report Body
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Empty Report Body",

        async () => {

            const res =
                await api.post(

                    "/reports",

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
    | Missing Report Reason
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Missing Report Reason",

        async () => {

            const res =
                await api.post(

                    "/reports",

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
    | Invalid Song Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Report Invalid Song Id",

        async () => {

            const res =
                await api.post(

                    "/reports",

                    {

                        songId:
                            "123456789012345678901234",

                        reason: "Spam",

                        description: "Invalid song"

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
    | Invalid Artist Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Report Invalid Artist Id",

        async () => {

            const res =
                await api.post(

                    "/reports",

                    {

                        artistId:
                            "123456789012345678901234",

                        reason: "Spam",

                        description: "Invalid artist"

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
    | Multiple Report Creation
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Report Creation",

        async () => {

            for (let i = 0; i < 3; i++) {

                const res =
                    await api.post(

                        "/reports",

                        {

                            songId,

                            reason: "Spam",

                            description:
                                `Stress Test ${i}`

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
    | Report Pagination
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Report Pagination",

        async () => {

            const res =
                await api.get(

                    "/reports?page=1&limit=10",

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
    | Report Status Filter
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Report Status Filter",

        async () => {

            const res =
                await api.get(

                    "/reports?status=resolved",

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
    | Invalid Status Filter
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Report Status Filter",

        async () => {

            const res =
                await api.get(

                    "/reports?status=invalid-status",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${getAdminToken()}`

                        }

                    }

                );

            if (

                [
                    200,
                    400,
                    422
                ].includes(
                    res.status
                ) === false

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

        "Report Large Limit",

        async () => {

            const res =
                await api.get(

                    "/reports?limit=100",

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
    | Multiple Admin Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Report Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/reports",

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
    | Review Already Reviewed Report
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Review Already Reviewed Report",

        async () => {

            if (!reportId) {

                return;

            }

            const res =
                await api.patch(

                    `/reports/${reportId}/review`,

                    {

                        status: "resolved",

                        note: "Second review"

                    },

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
                    404,
                    409,
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
    | Invalid Pagination
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Report Invalid Pagination",

        async () => {

            const res =
                await api.get(

                    "/reports?page=-1&limit=abc",

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
    | Zero Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Report Zero Limit",

        async () => {

            const res =
                await api.get(

                    "/reports?limit=0",

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
    | Negative Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Report Negative Limit",

        async () => {

            const res =
                await api.get(

                    "/reports?limit=-10",

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
    | Final Report Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Report Verification",

        async () => {

            const res =
                await api.get(

                    "/reports",

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
    | Final Admin Verification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Final Admin Verification",

        async () => {

            const res =
                await api.get(

                    "/reports?status=resolved",

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
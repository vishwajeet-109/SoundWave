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

export default async function notificationTests() {

    info("\n========== NOTIFICATIONS ==========\n");

    let notificationId = null;

    /*
    |--------------------------------------------------------------------------
    | Get Notifications
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get Notifications",

        async () => {

            const res =
                await api.get(

                    "/me/notifications",

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

            if (
                Array.isArray(res.data.data) &&
                res.data.data.length
            ) {

                notificationId =
                    res.data.data[0]._id;

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Notification Pagination
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Notification Pagination",

        async () => {

            const res =
                await api.get(

                    "/me/notifications?page=1&limit=10",

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
    | Notification Large Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Notification Large Limit",

        async () => {

            const res =
                await api.get(

                    "/me/notifications?limit=100",

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
    | Notification Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Notification Without Token",

        async () => {

            const res =
                await api.get(
                    "/me/notifications"
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
    | Mark Notification As Read
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Mark Notification Read",

        async () => {

            if (!notificationId) {

                console.log(
                    "No notifications found. Skipping."
                );

                return;

            }

            const res =
                await api.patch(

                    `/me/notifications/${notificationId}/read`,

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
    | Invalid Notification Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Notification Id",

        async () => {

            const res =
                await api.patch(

                    "/me/notifications/123456789012345678901234/read",

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
    | Mark Read Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Notification Read Without Token",

        async () => {

            if (!notificationId) {

                return;

            }

            const res =
                await api.patch(

                    `/me/notifications/${notificationId}/read`

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
    | Mark All Notifications Read
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Mark All Notifications Read",

        async () => {

            const res =
                await api.patch(

                    "/me/notifications/read-all",

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
    | Mark All Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Mark All Notifications Without Token",

        async () => {

            const res =
                await api.patch(
                    "/me/notifications/read-all"
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
    | Delete Notification
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Delete Notification",

        async () => {

            if (!notificationId) {

                console.log(
                    "No notifications found. Skipping."
                );

                return;

            }

            const res =
                await api.delete(

                    `/me/notifications/${notificationId}`,

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
    | Invalid Notification Delete Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Notification Delete Id",

        async () => {

            const res =
                await api.delete(

                    "/me/notifications/123456789012345678901234",

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
    | Delete Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Delete Notification Without Token",

        async () => {

            if (!notificationId) {

                return;

            }

            const res =
                await api.delete(

                    `/me/notifications/${notificationId}`

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
    | Multiple Notification Requests
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Multiple Notification Requests",

        async () => {

            for (let i = 0; i < 5; i++) {

                const res =
                    await api.get(

                        "/me/notifications",

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
    | Invalid Pagination
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Notification Invalid Pagination",

        async () => {

            const res =
                await api.get(

                    "/me/notifications?page=-1&limit=abc",

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
    | Zero Limit
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Notification Zero Limit",

        async () => {

            const res =
                await api.get(

                    "/me/notifications?page=1&limit=0",

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

        "Notification Negative Limit",

        async () => {

            const res =
                await api.get(

                    "/me/notifications?page=1&limit=-5",

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

        "Notification Decimal Pagination",

        async () => {

            const res =
                await api.get(

                    "/me/notifications?page=1.5&limit=10.5",

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

        "Final Notification Verification",

        async () => {

            const res =
                await api.get(

                    "/me/notifications",

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
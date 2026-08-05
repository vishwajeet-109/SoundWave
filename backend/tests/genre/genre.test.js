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
    getAdminToken,
    getToken,
} from "../helpers/auth.js";

async function runTest(name, fn) {

    try {

        await fn();

        pass(name);

        reportPass();

    } catch (err) {

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

        } else {

            console.log(err);

        }

    }

}

export default async function genreTests() {

    info("\n========== GENRES ==========\n");

    let genreId = null;

    /*
    |--------------------------------------------------------------------------
    | List Genres
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get Genres",

        async () => {

            const res = await api.get(
                "/genres"
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
    | Create Genre
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Create Genre",

        async () => {

            const res = await api.post(

                "/genres",

                {

                    name: "API Test Genre",

                    description: "Created by automated test"

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${getAdminToken()}`

                    }

                }

            );

            if (res.status !== 201) {

                throw {
                    response: res
                };

            }

            genreId =
                res.data.data._id;

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Update Genre
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Update Genre",

        async () => {

            const res = await api.patch(

                `/genres/${genreId}`,

                {

                    name:
                        "Updated API Genre",

                    description:
                        "Updated description"

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${getAdminToken()}`

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
    | Delete Genre
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Delete Genre",

        async () => {

            const res = await api.delete(

                `/genres/${genreId}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getAdminToken()}`

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
    | Invalid Genre Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Genre Id",

        async () => {

            const res = await api.patch(

                "/genres/123456789012345678901234",

                {

                    name: "Rock"

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
    | Validation Error
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Genre Validation",

        async () => {

            const res = await api.post(

                "/genres",

                {

                    name: ""

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${getAdminToken()}`

                    }

                }

            );

            if (res.status !== 422) {

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

        "Genre Without Token",

        async () => {

            const res = await api.post(

                "/genres",

                {

                    name: "Rock"

                }

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
    | User Cannot Create Genre
    |--------------------------------------------------------------------------
    */

    await runTest(

        "User Cannot Create Genre",

        async () => {

            const res = await api.post(

                "/genres",

                {

                    name: "User Genre",

                    description: "Should fail"

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

                    }

                }

            );

            if (res.status !== 403) {

                throw {
                    response: res
                };

            }

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Duplicate Genre
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Duplicate Genre",

        async () => {

            const uniqueName =
                `Duplicate-Genre-${Date.now()}`;

            const first = await api.post(

                "/genres",

                {

                    name: uniqueName,

                    description: "First"

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${getAdminToken()}`

                    }

                }

            );

            if (first.status !== 201) {

                throw {
                    response: first
                };

            }

            const second = await api.post(

                "/genres",

                {

                    name: uniqueName,

                    description: "Second"

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
                    409
                ].includes(
                    second.status
                )
            ) {

                throw {
                    response: second
                };

            }

            await api.delete(

                `/genres/${first.data.data._id}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getAdminToken()}`

                    }

                }

            );

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Get All Genres
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get All Genres",

        async () => {

            const res = await api.get(
                "/genres?all=true"
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
    | Delete Invalid Genre
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Delete Invalid Genre",

        async () => {

            const res = await api.delete(

                "/genres/123456789012345678901234",

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
    | Delete Without Token
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Delete Genre Without Token",

        async () => {

            const res = await api.delete(

                "/genres/123456789012345678901234"

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
    | User Cannot Delete Genre
    |--------------------------------------------------------------------------
    */

    await runTest(

        "User Cannot Delete Genre",

        async () => {

            const create = await api.post(

                "/genres",

                {

                    name: `Delete-Test-${Date.now()}`,

                    description: "Delete Test"

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${getAdminToken()}`

                    }

                }

            );

            if (create.status !== 201) {

                throw {
                    response: create
                };

            }

            const res = await api.delete(

                `/genres/${create.data.data._id}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getToken()}`

                    }

                }

            );

            if (res.status !== 403) {

                throw {
                    response: res
                };

            }

            // Cleanup

            await api.delete(

                `/genres/${create.data.data._id}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${getAdminToken()}`

                    }

                }

            );

        }

    );

}
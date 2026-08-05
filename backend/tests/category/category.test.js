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

export default async function categoryTests() {

    info("\n========== CATEGORY ==========\n");

    let categoryId = null;

    /*
    |--------------------------------------------------------------------------
    | List Categories
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get Categories",

        async () => {

            const res = await api.get(
                "/categories"
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
    | Create Category
    |--------------------------------------------------------------------------
    */

    await runTest(

    "Create Category",

    async () => {

        const res = await api.post(

            "/categories",

            {

                name: `API-Test-${Date.now()}`,

                description: `Created-${Date.now()}`

            },

            {

                headers: {

                    Authorization: `Bearer ${getAdminToken()}`

                }

            }

        );

        console.log("\n===== CREATE CATEGORY RESPONSE =====");
        console.log(JSON.stringify(res.data, null, 2));
        console.log("===================================\n");

        if (res.status !== 201) {

            throw {

                response: res

            };

        }

        categoryId = res.data.data._id;

    }

);



    /*
    |--------------------------------------------------------------------------
    | Update Category
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Update Category",

        async () => {

            const res = await api.patch(

                `/categories/${categoryId}`,

                {

                    name:
                        "Updated API Category",

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
    | Delete Category
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Delete Category",

        async () => {

            const res = await api.delete(

                `/categories/${categoryId}`,

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
    | Invalid Category Id
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Invalid Category Id",

        async () => {

            const res = await api.patch(

                "/categories/123456789012345678901234",

                {

                    name: "Demo"

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${getAdminToken()}`

                    }

                }

            );

            if (
                ![400,404].includes(
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

        "Category Validation",

        async () => {

            const res = await api.post(

                "/categories",

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

        "Category Without Token",

        async () => {

            const res = await api.post(

                "/categories",

                {

                    name: "Demo"

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
    | User Cannot Create Category
    |--------------------------------------------------------------------------
    */

    await runTest(

        "User Cannot Create Category",

        async () => {

            const res = await api.post(

                "/categories",

                {

                    name: "User Category",

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
    | Duplicate Category
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Duplicate Category",

        async () => {

            const uniqueName =
                `Duplicate-${Date.now()}`;

            const first = await api.post(

                "/categories",

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

                "/categories",

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

                `/categories/${first.data.data._id}`,

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
    | List All Categories
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Get All Categories",

        async () => {

            const res = await api.get(

                "/categories?all=true"

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
    | Delete Invalid Category
    |--------------------------------------------------------------------------
    */

    await runTest(

        "Delete Invalid Category",

        async () => {

            const res = await api.delete(

                "/categories/123456789012345678901234",

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

        "Delete Category Without Token",

        async () => {

            const res = await api.delete(

                "/categories/123456789012345678901234"

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
    | User Cannot Delete Category
    |--------------------------------------------------------------------------
    */

    await runTest(

        "User Cannot Delete Category",

        async () => {

            const create = await api.post(

                "/categories",

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

                `/categories/${create.data.data._id}`,

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

                `/categories/${create.data.data._id}`,

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
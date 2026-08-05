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
  getArtistToken,
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

      console.log(err.message);

    }

    console.log("");

  }

}

export default async function albumsProtectedTests() {

  info(
    "\n========== ALBUMS (PROTECTED) ==========\n"
  );

  let albumId = null;

  /*
  ----------------------------------------
  CREATE ALBUM
  ----------------------------------------
  */

  await runTest(
    "Create Album",
    async () => {

      const res = await api.post(

        "/albums",

        {

          title: "Protected Test Album",

          description:
            "Created by automated API test",

          genre: "Pop",

          category: "Romantic"

        },

        {

          headers: {

            Authorization:
              `Bearer ${getArtistToken()}`

          }

        }

      );

      if (res.status !== 201) {

        throw {
          response: res
        };

      }

      albumId =
        res.data.data._id;

    }

  );

  /*
  ----------------------------------------
  GET ALBUM
  ----------------------------------------
  */

  await runTest(
    "Get Album By Id",
    async () => {

      const res =
        await api.get(
          `/albums/${albumId}`
        );

      if (res.status !== 200) {

        throw {
          response: res
        };

      }

    }
  );

  /*
  ----------------------------------------
  GET ALL ALBUMS
  ----------------------------------------
  */

  await runTest(
    "List Albums",
    async () => {

      const res =
        await api.get("/albums");

      if (res.status !== 200) {

        throw {
          response: res
        };

      }

    }
  );

  /*
  Part 2 me:

  ✔ Update Album

  ✔ Add Song

  ✔ Remove Song

  ✔ Delete Album

  ✔ Invalid Album

  ✔ Missing Token

  ✔ Unauthorized User

  */

}

/*
|--------------------------------------------------
| UPDATE ALBUM
|--------------------------------------------------
*/

await runTest(
  "Update Album",
  async () => {

    const res = await api.patch(

      `/albums/${albumId}`,

      {

        title: "Updated Test Album",

        description: "Updated Album",

        genre: "Rock"

      },

      {

        headers: {

          Authorization:
            `Bearer ${getArtistToken()}`

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
|--------------------------------------------------
| INVALID ALBUM ID
|--------------------------------------------------
*/

await runTest(
  "Invalid Album Id",
  async () => {

    const res = await api.patch(

      "/albums/123456789012345678901234",

      {

        title: "Test"

      },

      {

        headers: {

          Authorization:
            `Bearer ${getArtistToken()}`

        }

      }

    );

    if (

      ![
        400,
        404
      ].includes(res.status)

    ) {

      throw {

        response: res

      };

    }

  }
);

/*
|--------------------------------------------------
| DELETE ALBUM
|--------------------------------------------------
*/

await runTest(
  "Delete Album",
  async () => {

    const res = await api.delete(

      `/albums/${albumId}`,

      {

        headers: {

          Authorization:
            `Bearer ${getArtistToken()}`

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
|--------------------------------------------------
| DELETE AGAIN
|--------------------------------------------------
*/

await runTest(
  "Delete Missing Album",
  async () => {

    const res = await api.delete(

      `/albums/${albumId}`,

      {

        headers: {

          Authorization:
            `Bearer ${getArtistToken()}`

        }

      }

    );

    if (

      ![
        400,
        404
      ].includes(res.status)

    ) {

      throw {

        response: res

      };

    }

  }
);

/*
|--------------------------------------------------
| MISSING TOKEN
|--------------------------------------------------
*/

await runTest(
  "Missing Token",
  async () => {

    const res = await api.post(

      "/albums",

      {

        title: "Unauthorized Album"

      }

    );

    if (res.status !== 401) {

      throw {

        response: res

      };

    }

  }
);
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

      console.log(err.message);

    }

    console.log("");

  }

}

export default async function playlistsProtectedTests() {

  info(
    "\n========== PLAYLISTS (PROTECTED) ==========\n"
  );

  let playlistId = null;

  /*
  ----------------------------------------
  CREATE PLAYLIST
  ----------------------------------------
  */

  await runTest(
    "Create Playlist",
    async () => {

      const res = await api.post(

        "/playlists",

        {

          title: "Protected Playlist",

          description:
            "Playlist created by API test",

          visibility: "PRIVATE"

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

      playlistId =
        res.data.data._id;

    }

  );

  /*
  ----------------------------------------
  GET PLAYLIST
  ----------------------------------------
  */

  await runTest(
    "Get Playlist By Id",
    async () => {

      const res =
        await api.get(
          `/playlists/${playlistId}`,
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
  ----------------------------------------
  LIST PLAYLISTS
  ----------------------------------------
  */

  await runTest(
    "List Playlists",
    async () => {

      const res =
        await api.get(
          "/playlists",
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
----------------------------------------
UPDATE PLAYLIST
----------------------------------------
*/

await runTest(
  "Update Playlist",
  async () => {

    const res = await api.patch(

      `/playlists/${playlistId}`,

      {

        title: "Updated Playlist",

        description: "Updated"

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
----------------------------------------
DELETE PLAYLIST
----------------------------------------
*/

await runTest(
  "Delete Playlist",
  async () => {

    const res = await api.delete(

      `/playlists/${playlistId}`,

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
----------------------------------------
MISSING TOKEN
----------------------------------------
*/

await runTest(
  "Missing Token",
  async () => {

    const res = await api.post(

      "/playlists",

      {

        title: "Unauthorized"

      }

    );

    if (res.status !== 401) {

      throw {
        response: res
      };

    }

  }
);
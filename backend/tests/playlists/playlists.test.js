import api from "../config/axios.js";
import {

  getArtistToken,
  
} from "../helpers/auth.js";
import {
  pass,
  fail,
  info,
} from "../helpers/logger.js";

import {
  pass as reportPass,
  fail as reportFail,
} from "../report.js";

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

      console.log("Status :", err.response.status);

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

export default async function playlistsTests() {

  info("\n========== PLAYLISTS ==========\n");

  let playlistId = null;

  /*
  GET ALL PLAYLISTS
  */

  await runTest(
    "Get All Playlists",
    async () => {

      const res =
        await api.get("/playlists");

      if (res.status !== 200) {

        throw { response: res };

      }

      const playlists =
        res.data?.data?.items ??
        res.data?.data ??
        [];

      if (
        Array.isArray(playlists) &&
        playlists.length
      ) {

        playlistId =
          playlists[0]._id;

      }

    }
  );

  /*
  GET PLAYLIST BY ID
  */

  await runTest(
    "Get Playlist By Id",
    async () => {

      if (!playlistId) {

        console.log(
          "No playlists found. Skipping."
        );

        return;

      }

      const res =
        await api.get(
          `/playlists/${playlistId}`
        );

      if (res.status !== 200) {

        throw { response: res };

      }

    }
  );

 /*
|--------------------------------------------------------------------------
| INVALID PLAYLIST ID
|--------------------------------------------------------------------------
*/

await runTest(
  "Invalid Playlist Id",
  async () => {

    const res = await api.get(

      "/playlists/123456789012345678901234",

      {
        headers: {
          Authorization:
            `Bearer ${getArtistToken()}`
        }
      }

    );

    if (
      ![400, 404].includes(res.status)
    ) {

      throw {
        response: res
      };

    }

  }
);
}
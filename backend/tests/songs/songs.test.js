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

export default async function songsTests() {

  info("\n========== SONGS ==========\n");

  let songId = null;

  /*
  GET ALL SONGS
  */

  await runTest(
    "Get All Songs",
    async () => {

      const res = await api.get("/songs");

      if (res.status !== 200) {
        throw { response: res };
      }

      const songs =
        res.data?.data?.songs ??
        res.data?.data ??
        [];

      if (Array.isArray(songs) && songs.length) {
        songId = songs[0]._id;
      }

    }
  );

  /*
  GET SONG BY ID
  */

  await runTest(
    "Get Song By Id",
    async () => {

      if (!songId) {

        console.log("No songs found. Skipping.");

        return;

      }

      const res =
        await api.get(
          `/songs/${songId}`
        );

      if (res.status !== 200) {
        throw { response: res };
      }

    }
  );

  /*
  INVALID SONG ID
  */

  await runTest(
    "Invalid Song Id",
    async () => {

      const res =
        await api.get(
          "/songs/123456789012345678901234"
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

}
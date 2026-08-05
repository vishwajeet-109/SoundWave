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

export default async function albumsTests() {

  info("\n========== ALBUMS ==========\n");

  let albumId = null;

  /*
  GET ALL ALBUMS
  */

  await runTest(
    "Get All Albums",
    async () => {

      const res =
        await api.get("/albums");

      if (res.status !== 200) {
        throw { response: res };
      }

      const albums =
        res.data?.data?.items ??
        res.data?.data ??
        [];

      if (
        Array.isArray(albums) &&
        albums.length
      ) {

        albumId =
          albums[0]._id;

      }

    }
  );

  /*
  GET ALBUM BY ID
  */

  await runTest(
    "Get Album By Id",
    async () => {

      if (!albumId) {

        console.log(
          "No albums found. Skipping."
        );

        return;

      }

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
  INVALID ALBUM ID
  */

  await runTest(
    "Invalid Album Id",
    async () => {

      const res =
        await api.get(
          "/albums/123456789012345678901234"
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

}
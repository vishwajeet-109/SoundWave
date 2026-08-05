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

export default async function artistsTests() {

  info("\n========== ARTISTS ==========\n");

  let artistId = null;

  /*
  GET ALL ARTISTS
  */

  await runTest(
    "Get All Artists",
    async () => {

      const res = await api.get("/artists");

      if (res.status !== 200) {
        throw { response: res };
      }

      const artists = res.data?.data ?? [];

      if (
        Array.isArray(artists) &&
        artists.length
      ) {

        artistId = artists[0]._id;

      }

    }
  );

  /*
  GET ARTIST BY ID
  */

  await runTest(
    "Get Artist By Id",
    async () => {

      if (!artistId) {

        console.log(
          "No artists found. Skipping."
        );

        return;

      }

      const res = await api.get(
        `/artists/${artistId}`
      );

      if (res.status !== 200) {

        throw { response: res };

      }

    }
  );

  /*
  INVALID ARTIST ID
  */

  await runTest(
    "Invalid Artist Id",
    async () => {

      const res = await api.get(
        "/artists/123456789012345678901234"
      );

      if (
        ![400,404].includes(res.status)
      ) {

        throw { response: res };

      }

    }
  );

}
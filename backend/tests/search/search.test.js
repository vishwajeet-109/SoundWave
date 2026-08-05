import api from "../config/axios.js";

import {
  pass,
  fail,
  info,
} from "../helpers/logger.js";

import {
  getToken,
} from "../helpers/auth.js";

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

export default async function searchTests() {

  info("\n========== SEARCH ==========\n");

  /*
  SEARCH SONG
  */

  await runTest(
    "Search Songs",
    async () => {

      const res =
        await api.get(
          "/search",
          {
            params:{
              q:"love",
              type:"song"
            },
            headers:{
              Authorization:
                `Bearer ${getToken()}`
            }
          }
        );

      if (res.status !== 200) {
        throw { response: res };
      }

    }
  );

  /*
  SEARCH ARTIST
  */

  await runTest(
    "Search Artists",
    async () => {

      const res =
        await api.get(
          "/search",
          {
            params:{
              q:"a",
              type:"artist"
            },
            headers:{
              Authorization:
                `Bearer ${getToken()}`
            }
          }
        );

      if (res.status !== 200) {
        throw { response: res };
      }

    }
  );

  /*
  SEARCH ALBUM
  */

  await runTest(
    "Search Albums",
    async () => {

      const res =
        await api.get(
          "/search",
          {
            params:{
              q:"a",
              type:"album"
            },
            headers:{
              Authorization:
                `Bearer ${getToken()}`
            }
          }
        );

      if (res.status !== 200) {
        throw { response: res };
      }

    }
  );

  /*
  EMPTY QUERY
  */

await runTest(
  "Empty Search Validation",
  async () => {

    const res = await api.get("/search", {
      params:{
        q:"",
        type:"song"
      },
      headers:{
        Authorization:`Bearer ${getToken()}`
      }
    });

    console.log("DEBUG STATUS:", res.status);

    if (res.status !== 422) {
      throw { response: res };
    }

    }
  );

}


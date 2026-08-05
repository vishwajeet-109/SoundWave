import api from "../config/axios.js";
import FormData from "form-data";
import fs from "fs";
import path from "path";

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
  getArtistToken,
  getAdminToken,
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

export default async function songsProtectedTests() {

  info(
    "\n========== SONGS (PROTECTED) ==========\n"
  );

  let songId = null;

  const coverPath = path.resolve(
    "tests/assets/cover.jpg"
  );

  const audioPath = path.resolve(
    "tests/assets/sample.mp3"
  );

  /*
  |--------------------------------------------------
  | CREATE SONG
  |--------------------------------------------------
  */

  await runTest(
    "Create Song",
    async () => {

      const form = new FormData();

      form.append(
        "title",
        "Protected Test Song"
      );

      form.append(
        "genre",
        "Pop"
      );

      form.append(
        "category",
        "Romantic"
      );

      form.append(
        "language",
        "Hindi"
      );

      form.append(
        "description",
        "Song created from automated API test."
      );

      form.append(
        "coverImage",
        fs.createReadStream(
          coverPath
        )
      );

      form.append(
        "audioFile",
        fs.createReadStream(
          audioPath
        )
      );

      const res = await api.post(

        "/songs",

        form,

        {

          headers: {

            ...form.getHeaders(),

            Authorization:
`Bearer ${getArtistToken()}`

          },

          maxBodyLength: Infinity

        }

      );

      if (res.status !== 201) {

        throw {
          response: res
        };

      }

      songId =
        res.data?.data?._id ??
        res.data?.data?.id;

    }

  );

  /*
  |--------------------------------------------------
  | GET MY SONGS
  |--------------------------------------------------
  */

  await runTest(

    "Get My Songs",

    async () => {

      const res =
        await api.get(

          "/songs/my-songs",

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

      const songs =
        res.data?.data ?? [];

      if (
        Array.isArray(songs) &&
        songs.length &&
        !songId
      ) {

        songId = songs[0]._id;

      }

    }

  );

  /*
  songId ko Part 2 ke tests
  use karenge.
  */

}

/*
|--------------------------------------------------
| UPDATE SONG
|--------------------------------------------------
*/

await runTest(
  "Update Song",
  async () => {

    if (!songId) {
      throw new Error(
        "Song ID not found."
      );
    }

    const res = await api.put(

      `/songs/${songId}`,

      {
        title:
          "Updated Protected Song",

        genre: "Pop",

        category: "Romantic",

        language: "Hindi",

        description:
          "Updated by automated API test."

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
| INVALID SONG ID
|--------------------------------------------------
*/

await runTest(
  "Invalid Song Id",
  async () => {

    const res = await api.put(

      "/songs/123456789012345678901234",

      {
        title: "Test"
      },

      {

        headers: {

          Authorization:
            `Bearer ${getToken()}`

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
|--------------------------------------------------
| DELETE SONG
|--------------------------------------------------
*/

await runTest(
  "Delete Song",
  async () => {

    if (!songId) {

      throw new Error(
        "Song ID not found."
      );

    }

    const res =
      await api.delete(

        `/songs/${songId}`,

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
  "Delete Missing Song",
  async () => {

    const res =
      await api.delete(

        `/songs/${songId}`,

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
        400
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
|--------------------------------------------------
| MISSING TOKEN
|--------------------------------------------------
*/

await runTest(
  "Missing Token",
  async () => {

    const res =
      await api.get(
        "/songs/my-songs"
      );

    if (res.status !== 401) {

      throw {
        response: res
      };

    }

  }
);


await runTest(
  "Pending Songs",
  async () => {

    const res = await api.get(
      "/songs/pending/list",
      {
        headers: {
          Authorization:
            `Bearer ${getAdminToken()}`
        }
      }
    );

    if (res.status !== 200) {
      throw { response: res };
    }

  }
);


await runTest(
  "Approve Song",
  async () => {

    if (!songId) return;

    const res = await api.patch(
      `/songs/${songId}/approve`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${getAdminToken()}`
        }
      }
    );

    if (![200,404].includes(res.status)) {
      throw { response: res };
    }

  }
); await runTest(
  "Block Song",
  async () => {

    if (!songId) return;

    const res = await api.patch(
      `/songs/${songId}/block`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${getAdminToken()}`
        }
      }
    );

    if (![200,404].includes(res.status)) {
      throw { response: res };
    }

  }
);
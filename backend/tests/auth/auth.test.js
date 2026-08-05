import api from "../config/axios.js";

import { pass, fail, info } from "../helpers/logger.js";

import { pass as reportPass, fail as reportFail } from "../report.js";
import {
  TEST_USER,
  TEST_ARTIST,
  TEST_ADMIN,
} from "../config/env.js";

import {
  saveToken,
  saveArtistToken,
  saveAdminToken,
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

export default async function authTests() {

  info("\n========== AUTH ==========\n");

  await runTest("Register", async () => {

    const res = await api.post(
      "/auth/register",
      TEST_USER
    );

    if (![201,409].includes(res.status)) {
      throw {
        response: res
      };
    }

  });

  await runTest("Login", async () => {

    const res = await api.post(
      "/auth/login",
      {
        email: TEST_USER.email,
        password: TEST_USER.password
      }
    );

    if (res.status !== 200) {
      throw {
        response: res
      };
    }

    saveToken(
      res.data.data.accessToken
    );

  });
  await runTest("Artist Login", async () => {

  const res = await api.post(
    "/auth/login",
    TEST_ARTIST
  );

  if (res.status !== 200) {
    throw { response: res };
  }

  saveArtistToken(
    res.data.data.accessToken
  );

});

await runTest("Admin Login", async () => {

  const res = await api.post(
    "/auth/login",
    TEST_ADMIN
  );

  if (res.status !== 200) {
    throw { response: res };
  }

  saveAdminToken(
    res.data.data.accessToken
  );

});

  await runTest("Wrong Password", async () => {

    const res = await api.post(
      "/auth/login",
      {
        email: TEST_USER.email,
        password: "WrongPassword123"
      }
    );

    if (res.status !== 401) {
      throw {
        response: res
      };
    }

  });

  await runTest("/me", async () => {

    const res = await api.get(
      "/auth/me",
      {
        headers:{
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );

    if (res.status !== 200) {
      throw {
        response: res
      };
    }

  });

}
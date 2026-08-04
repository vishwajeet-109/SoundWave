// tests/globalSetup.js

import { MongoMemoryServer } from "mongodb-memory-server";
import fs from "fs";
import path from "path";

const globalConfigPath = path.join(process.cwd(), "tests", ".mongo-uri.tmp");

export default async function globalSetup() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // Stash the URI where test files can read it. Jest runs
  // globalSetup/globalTeardown in a separate process from the tests
  // themselves, so state can't just live on `global`.
  globalThis.__MONGOD__ = mongod;
  fs.writeFileSync(globalConfigPath, uri);
  process.env.MONGO_TEST_URI = uri;
}

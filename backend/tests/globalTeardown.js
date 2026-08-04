// tests/globalTeardown.js

import fs from "fs";
import path from "path";

const globalConfigPath = path.join(process.cwd(), "tests", ".mongo-uri.tmp");

export default async function globalTeardown() {
  if (globalThis.__MONGOD__) {
    await globalThis.__MONGOD__.stop();
  }

  if (fs.existsSync(globalConfigPath)) {
    fs.unlinkSync(globalConfigPath);
  }
}

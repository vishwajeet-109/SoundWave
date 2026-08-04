import fs from "fs";
import path from "path";
import mongoose from "mongoose";

const globalConfigPath = path.join(process.cwd(), "tests", ".mongo-uri.tmp");

const getTestUri = () => {
  if (process.env.MONGO_TEST_URI) return process.env.MONGO_TEST_URI;

  if (fs.existsSync(globalConfigPath)) {
    return fs.readFileSync(globalConfigPath, "utf8");
  }

  throw new Error("Test MongoDB URI not found — did globalSetup run?");
};

export const connectTestDB = async () => {
  await mongoose.connect(getTestUri());
};

export const disconnectTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
};

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map((collection) =>
      collection.deleteMany({})
    )
  );
};
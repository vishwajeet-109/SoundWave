import "dotenv/config";
import mongoose from "mongoose";


import connectDB from "../config/db.js";
import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";

await connectDB();

const users = [
  {
    name: "Test Artist",
    email: "artist@test.com",
    password: "Password@123",
    role: ROLES.ARTIST,
  },
  {
    name: "Test Admin",
    email: "admin@test.com",
    password: "Password@123",
    role: ROLES.ADMIN,
  },
];

for (const u of users) {
  const exists = await User.findOne({ email: u.email });

  if (exists) {
    console.log(`✔ ${u.email} already exists`);
    continue;
  }

  

        await User.create({
  name: u.name,
  email: u.email,
  password: u.password,
  role: u.role,
  emailVerified: true,
  status: "ACTIVE",
});

  console.log(`✔ ${u.role} created -> ${u.email}`);
}

await mongoose.disconnect();

console.log("\nDone.");
process.exit(0);
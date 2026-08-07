import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";
import { USER_STATUS } from "../constants/status.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const seedSuperAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is missing in your environment variables (.env)!");
    }

    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected Successfully...");

    const adminEmail = "vishugupta7275@gmail.com";
    
    // Purana record delete karein
    await User.deleteOne({ email: adminEmail });

    // Constants se exact valid enum values use karein
    const superAdmin = await User.create({
      name: "Vishwajeet Gupta",
      email: adminEmail,
      password: "7275583220",
      role: ROLES.ADMIN || "admin", // Yahan model ke enum ke hisaab se 'admin' ya ROLES.ADMIN pass hoga
      status: USER_STATUS.ACTIVE || "active",
      emailVerified: true
    });

    console.log("\n👑 SUPER ADMIN SEEDED SUCCESSFULLY:");
    console.log(`Name:  ${superAdmin.name}`);
    console.log(`Email: ${superAdmin.email}`);
    console.log(`Role:  ${superAdmin.role}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedSuperAdmin();
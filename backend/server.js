import "dotenv/config";
import http from "http";
import mongoose from "mongoose";

import app from "./app.js";
import connectDB from "./config/db.js";
import { initSocket } from "./socket/index.js";

const PORT = Number(process.env.PORT || 5000);

const bootstrap = async () => {
  await connectDB();

  const httpServer = http.createServer(app);
  initSocket(httpServer);

  const server = httpServer.listen(PORT, () => {
    console.log(`
========================================
🚀 SoundWave Server Running
🌍 Environment : ${process.env.NODE_ENV}
📡 Port        : ${PORT}
========================================
`);
  });

  const gracefulShutdown = (signal) => {
    console.log(`\nReceived ${signal}. Closing server...`);

    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

  process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error);
    server.close(() => process.exit(1));
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    server.close(() => process.exit(1));
  });
};

bootstrap().catch((error) => {
  console.error("Failed to bootstrap server:", error.message);
  process.exit(1);
});
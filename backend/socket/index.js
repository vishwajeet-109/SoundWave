// socket/index.js
//
// socket/index.js should be initialized by the HTTP server bootstrap,
// and should always validate the JWT using the same configuration as the
// REST auth layer. The runtime contract expects a `getIO` export.

import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { jwtConfig } from "../config/jwt.js";
import { USER_STATUS } from "../constants/status.js";
import { registerPlayerEvents } from "./playerEvents.js";
import { registerPresenceEvents, markUserOffline } from "./presenceEvents.js";

let io = null;

const authenticateSocket = async (socket, next) => {
  try {
    const rawToken =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.replace("Bearer ", "") ||
      socket.handshake.headers?.cookie
        ?.split("; ")
        .find((cookie) => cookie.trim().startsWith("accessToken="))
        ?.split("=")[1];

    const token = rawToken?.trim();

    if (!token) {
      return next(new Error("Authentication token is missing."));
    }

    const decoded = jwt.verify(token, jwtConfig.accessToken.secret);
    const user = await User.findById(decoded.id || decoded._id).select("_id role status");

    if (!user || user.status !== USER_STATUS.ACTIVE) {
      return next(new Error("Invalid or inactive user."));
    }

    socket.user = { _id: user._id.toString(), role: user.role };
    next();
  } catch (error) {
    next(new Error("Invalid or expired token."));
  }
};

export const initSocket = (httpServer, options = {}) => {
  if (io) {
    return io;
  }

  const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
    ...options,
  });

  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    const userRoom = `user:${socket.user._id}`;
    socket.join(userRoom);

    registerPresenceEvents(io, socket);
    registerPlayerEvents(io, socket);

    socket.on("disconnect", () => {
      markUserOffline(io, socket);
    });
  });

  return io;
};

export const getIO = () => io;

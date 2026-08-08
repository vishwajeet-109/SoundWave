import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import approvalRoutes from "./routes/approvalRoutes.js";
import songApprovalRoutes from "./routes/songApprovalRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import streamRoutes from "./routes/streamRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import queueRoutes from "./routes/queueRoutes.js";
import playbackRoutes from "./routes/playbackRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { sanitizeRequest } from "./middleware/sanitizeMiddleware.js";
import { compressionMiddleware, hppMiddleware, performanceMiddleware } from "./middleware/performanceMiddleware.js";
import { corsOptions, helmetOptions, performanceConfig } from "./config/security.js";
import ApiError from "./utils/ApiError.js";
import artistRoutes from "./routes/artists.js";
import likeRoutes from "./routes/likeRoutes.js";
import myLikesRoutes from "./routes/myLikesRoutes.js";
import { myFollowingRouter } from "./routes/followRoutes.js";
const app = express();

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(sanitizeRequest);
app.use(hppMiddleware);
app.use(compressionMiddleware);
app.use(performanceMiddleware({ thresholdMs: performanceConfig.slowRequestThresholdMs }));
app.use(morgan("dev"));

app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/admin", approvalRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/songs", songRoutes);
app.use("/api/v1/albums", albumRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/genres", genreRoutes);
app.use("/api/v1/playlists", playlistRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/stream", streamRoutes);
app.use("/api/v1/recommendations", recommendationRoutes);
app.use("/api/v1/me/history", historyRoutes);
app.use("/api/v1/me/queue", queueRoutes);
app.use("/api/v1/me/notifications", notificationRoutes);
app.use("/api/v1/stream", playbackRoutes.progressRouter);
app.use("/api/v1/me/continue-listening", playbackRoutes.continueListeningRouter);
app.use("/api/v1/artists", artistRoutes);
app.use("/api/v1/approvals", songApprovalRoutes);

app.use("/api/v1/songs/:songId/like", likeRoutes);

app.use("/api/v1/me/likes", myLikesRoutes);
app.use("/api/v1/me/following", myFollowingRouter);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SoundWave API 🚀",
  });
});

app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

app.use(errorMiddleware);

export default app;
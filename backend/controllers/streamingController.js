// controllers/streamingController.js
//
// HTTP Range proxying is handled here rather than in the service
// layer because it manipulates req/res directly (headers, piping) —
// the service stays responsible for permission checks and analytics.

import axios from "axios";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import streamingService from "../services/streamingService.js";

export const streamSong = asyncHandler(async (req, res) => {
  const song = await streamingService.getStreamableSong({
    songId: req.params.songId,
    user: req.user,
  });

  const range = req.headers.range;

  // Ask Cloudinary for the same byte range the client requested,
  // so we're proxying, not fully buffering, the file.
  const upstream = await axios.get(song.audioUrl, {
    responseType: "stream",
    headers: range ? { Range: range } : {},
    validateStatus: (status) => status === 200 || status === 206,
  });

  const contentLength = upstream.headers["content-length"];
  const contentRange = upstream.headers["content-range"];
  const contentType = upstream.headers["content-type"] || "audio/mpeg";

  res.status(upstream.status === 206 ? 206 : 200);
  res.set({
    "Content-Type": contentType,
    "Accept-Ranges": "bytes",
    ...(contentLength ? { "Content-Length": contentLength } : {}),
    ...(contentRange ? { "Content-Range": contentRange } : {}),
    "Cache-Control": "no-store",
  });

  upstream.data.on("error", () => {
    if (!res.headersSent) {
      res.status(502).json(new ApiError(502, "Failed to stream audio.").toJSON?.() ?? {
        success: false,
        message: "Failed to stream audio.",
      });
    } else {
      res.end();
    }
  });

  upstream.data.pipe(res);

  // Only count it as a "play" on an initial request or a range
  // request starting at byte 0 — avoids inflating playCount once
  // per every seek/chunk request during a single listen.
  const isInitialRequest = !range || range.startsWith("bytes=0-");
  if (isInitialRequest) {
    recordPlayFireAndForget(req, song._id);
  }
});

const recordPlayFireAndForget = (req, songId) => {
  streamingService
    .recordPlay({
      songId,
      userId: req.user._id,
      device: req.headers["user-agent"] || null,
    })
    .catch(() => {});
};

import { albumApi } from "../api/albumApi";

// NOTE ON BACKEND RESPONSE SHAPE
// --------------------------------------------------------------------------
// `ApiResponse` is defined as `(statusCode, message, data)`, but every
// method in `albumController.js` (getAlbumById, createAlbum, updateAlbum,
// listAlbums, etc.) calls it as:
//
//   new ApiResponse(200, album, "Album fetched successfully.")
//
// i.e. the album object is passed where `message` is expected, and the
// success string is passed where `data` is expected. So on the wire the
// real album payload arrives in `response.data.message`, not
// `response.data.data`.
//
// This mirrors a defensive pattern already used elsewhere in the app (see
// `extractPayload` in `features/home/api/homeApi.js`), which checks both
// `.data` and `.message`. We do the same here, scoped to a single album
// object, so this keeps working whether or not that backend swap is ever
// fixed.
function extractAlbumPayload(payload) {
  if (!payload || typeof payload !== "object") return payload;

  if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload.message && typeof payload.message === "object" && !Array.isArray(payload.message)) {
    return payload.message;
  }

  return payload.data ?? payload.message ?? payload;
}

export const albumService = {
  async getAlbumById(albumId) {
    const response = await albumApi.getAlbumById(albumId);
    return extractAlbumPayload(response.data);
  },
};


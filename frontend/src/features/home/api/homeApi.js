import api from "@/lib/api/axios";

function extractPayload(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== "object") {
    return payload;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload.data !== undefined && payload.data !== null) {
    return payload.data;
  }

  if (Array.isArray(payload.message)) {
    return payload.message;
  }

  if (payload.message && typeof payload.message === "object") {
    return payload.message;
  }

  return payload;
}

export async function getSongs(params = {}) {
  const { data } = await api.get("/songs", { params });
  return extractPayload(data);
}

export async function getAlbums(params = {}) {
  const { data } = await api.get("/albums", { params });
  return extractPayload(data);
}

export async function getArtists(params = {}) {
  const { data } = await api.get("/artists", { params });
  return extractPayload(data);
}

export async function getPlaylists(params = {}) {
  const { data } = await api.get("/playlists", { params });
  return extractPayload(data);
}

export async function getHistory(params = {}) {
  const { data } = await api.get("/me/history", { params });
  return extractPayload(data);
}

import api from "@/lib/api/axios";

export async function getSongs(params = {}) {
  const { data } = await api.get("/songs", { params });
  return data.data;
}

export async function getAlbums(params = {}) {
  const { data } = await api.get("/albums", { params });
  return data.data;
}

export async function getArtists(params = {}) {
  const { data } = await api.get("/artists", { params });
  return data.data;
}

export async function getPlaylists(params = {}) {
  const { data } = await api.get("/playlists", { params });
  return data.data;
}

export async function getHistory(params = {}) {
  try {
    const { data } = await api.get("/me/history", {
      params,
    });

    return data.data;
  } catch {
    return [];
  }
}
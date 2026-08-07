export const API = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  SONGS: "/songs",
  ALBUMS: "/albums",
  PLAYLISTS: "/playlists",
  SEARCH: "/search",
  HISTORY: "/history",
  LIKES: "/likes",
  QUEUE: "/queue",

  NOTIFICATIONS: {
    ALL: "/notifications",
    MARK_AS_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_AS_READ: "/notifications/read-all",
  },

  DASHBOARD: {
    STATS: "/dashboard/stats",
    OVERVIEW: "/dashboard/overview",
  },

  ANALYTICS: {
    OVERVIEW: "/analytics/overview",
    SONGS: "/analytics/songs",
    STREAMS: "/analytics/streams",
    AUDIENCE: "/analytics/audience",
  },

  ARTIST: {
    PROFILE: "/artists/me",
    DASHBOARD: "/artists/dashboard",
  },

  UPLOAD: {
    SONG: "/songs/upload",
    ALBUM: "/albums/upload",
  },

  REPORTS: {
    LIST: "/reports",
    CREATE: "/reports",
  },

  APPROVAL: {
    LIST: "/approval",
    APPROVE: (id) => `/approval/${id}/approve`,
    REJECT: (id) => `/approval/${id}/reject`,
  },

  CATEGORY: {
    LIST: "/categories",
  },

  GENRE: {
    LIST: "/genres",
  },
};
export const API_ENDPOINTS = API;

export default API;
export const QUERY_KEYS = {
  AUTH: ["auth"],

  USER: ["user"],

  SONGS: ["songs"],

  SONG: (id) => ["song", id],

  ALBUMS: ["albums"],

  ALBUM: (id) => ["album", id],

  PLAYLISTS: ["playlists"],

  PLAYLIST: (id) => ["playlist", id],


  HISTORY: ["history"],

  LIKES: ["likes"],

  QUEUE: ["queue"],

  NOTIFICATIONS: ["notifications"],

  DASHBOARD: ["dashboard"],

  ANALYTICS: ["analytics"],


  

  SEARCH: (params) => ["search", params],

  TRENDING_SEARCH: ["trending-search"],

  RECENT_SEARCH: ["recent-search"],
  
};
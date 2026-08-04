import api from "@/lib/api/axios";
import { API } from "@/constants/apiEndpoints";

// Real backend route (confirmed in backend/routes/albumRoutes.js -> app.js
// mounts it at /api/albums, and VITE_API_BASE_URL already includes /api):
//   GET /api/albums/:albumId
//
// Reuses the existing shared Axios instance (with its auth interceptor) —
// no new Axios instance is created here.

export const albumApi = {
  getAlbumById(albumId) {
    return api.get(`${API.ALBUMS}/${albumId}`);
  },
};

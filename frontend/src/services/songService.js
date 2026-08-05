import api from "./api";

const songService = {

  getAll(params = {}) {
    return api.get("/songs", {
      params,
    });
  },

  getById(id) {
    return api.get(`/songs/${id}`);
  },

  getTrending() {
    return api.get("/songs", {
      params: {
        sort: "playCount",
        limit: 10,
      },
    });
  },

};

export default songService;
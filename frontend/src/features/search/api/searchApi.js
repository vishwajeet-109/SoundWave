import api from "@/lib/api/axios";

export const searchApi = {

  search(params = {}) {

    return api.get("/search", {
      params: {
        q: params.q,
        type: params.type,
      },
    });

  },

};
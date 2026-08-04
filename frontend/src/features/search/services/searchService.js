import { searchApi } from "../api/searchApi";

export const searchService = {

  async search(params) {

    const response = await searchApi.search(params);

    return response.data;

  },

};
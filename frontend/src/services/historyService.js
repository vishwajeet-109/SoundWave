import api from "./api";

class HistoryService {
  getHistory(params = {}) {
    return api.get("/me/history", {
      params,
    });
  }

  clearHistory() {
    return api.delete("/me/history");
  }
}

export default new HistoryService();
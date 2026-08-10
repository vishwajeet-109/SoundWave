import api from "./api";

class HistoryService {
  getHistory(params = {}) {
    return api.get("/me/history", { params });
  }

  addToHistory(songId) {
    return api.post("/me/history", { songId });
  }

  clearHistory() {
    return api.delete("/me/history");
  }
}

export default new HistoryService();
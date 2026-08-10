import api from "./api";

class HistoryService {
  getHistory(params = {}) {
    return api.get("/me/history", {
      params,
    });
  }

  // 🚀 Added method to record/save played song to history
  addToHistory(songId) {
    return api.post("/me/history", { songId }); // Agar backend ka route alag ho (jaise /history), toh wahan change kar sakte hain
  }

  clearHistory() {
    return api.delete("/me/history");
  }
}

export default new HistoryService();
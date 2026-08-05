import api from "./api";

const authService = {
  // =========================
  // AUTH
  // =========================

  login(credentials) {
    return api.post("/auth/login", credentials);
  },

  register(data) {
    return api.post("/auth/register", data);
  },

  logout() {
    return api.post("/auth/logout");
  },

  getMe() {
    return api.get("/auth/me");
  },

  refresh() {
    return api.post("/auth/refresh");
  },

  // =========================
  // PASSWORD
  // =========================

  forgotPassword(email) {
    return api.post("/auth/forgot-password", {
      email,
    });
  },

  resetPassword(token, password) {
    return api.post("/auth/reset-password", {
      token,
      password,
    });
  },

  changePassword(currentPassword, newPassword) {
    return api.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
  },

  // =========================
  // EMAIL
  // =========================

  generateVerification() {
    return api.post("/auth/generate-verification");
  },

  verifyEmail(token) {
    return api.get(`/auth/verify-email?token=${token}`);
  },
};

export default authService;
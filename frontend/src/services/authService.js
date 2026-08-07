import api from "./api";

const authService = {
  // =========================
  // AUTH
  // =========================

  // Ye function ab har tarah ke input ko handle kar lega (Object, 2 args, ya 1 arg)
  login(arg1, arg2) {
    let payload = {};

    // Case 1: Agar ek object pass kiya gaya hai (jaise { email, password })
    if (typeof arg1 === 'object' && arg1 !== null) {
      payload = arg1;
    } 
    // Case 2: Agar email aur password alag-alag arguments mein diye gaye hain
    else if (typeof arg1 === 'string' && typeof arg2 === 'string') {
      payload = { email: arg1, password: arg2 };
    } 
    // Case 3: Fallback agar sirf email string gayi ho
    else if (typeof arg1 === 'string') {
      payload = { email: arg1, password: arg2 || '' };
    }

    // Ye hamesha ek valid JSON object { email, password } hi backend ko bhejega
    return api.post("/auth/login", payload);
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
    return api.post("/auth/forgot-password", { email });
  },

  resetPassword(token, password) {
    return api.post("/auth/reset-password", { token, password });
  },

  changePassword(currentPassword, newPassword) {
    return api.post("/auth/change-password", { currentPassword, newPassword });
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
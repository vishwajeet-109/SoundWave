import { create } from "zustand";
import authService from "@/services/authService";

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials, portalRole) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.login(credentials);

      const user = response.user || response.data?.user;
      const userRole = user?.role;

      if (portalRole === "user" && userRole !== "user") {
        throw new Error("You are not authorized to login from this page.");
      }

      if (portalRole === "artist" && userRole !== "artist") {
        throw new Error("Access denied. Artist credentials required.");
      }

      if (
        portalRole === "admin" &&
        userRole !== "admin" &&
        userRole !== "super_admin"
      ) {
        throw new Error("Access denied. Admin credentials required.");
      }

      set({
        user,
        token: response.token || response.data?.token,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true, role: userRole };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed";

      set({
        error: message,
        isLoading: false,
      });

      return {
        success: false,
        message,
      };
    }
  },

  logout: () => {
    authService.logout();

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
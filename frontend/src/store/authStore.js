import { create } from "zustand";
import authService from "@/services/authService";
import { resetPlayerForLogout } from "@/context/PlayerContext";

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  initialized: false,
  isLoading: false,
  error: null,

  initialize: async () => {
    const { initialized } = get();

    if (initialized) return;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        initialized: true,
        isLoading: false,
        error: null,
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await authService.getMe();
      const user = response?.user || response?.data?.user || null;

      set({
        user,
        token: response?.token || response?.data?.token || token,
        isAuthenticated: Boolean(user),
        initialized: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error?.response?.status === 401) {
        resetPlayerForLogout();
        localStorage.removeItem("accessToken");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          initialized: true,
          isLoading: false,
          error: null,
        });
        return;
      }

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        initialized: true,
        isLoading: false,
        error: null,
      });
    }
  },

login: async (credentials, password, portalRole) => {
  set({ isLoading: true, error: null });

  try {
    let payload;
    let resolvedPortalRole = portalRole;

    // login({ email, password }, "admin")
    if (typeof credentials === "object" && credentials !== null) {
      payload = {
        email: credentials.email,
        password: credentials.password,
      };

      resolvedPortalRole = password;
    }

    // login(email, password, "admin")
    else {
      payload = {
        email: credentials,
        password,
      };
    }

    const response = await authService.login(payload);

    // Support both:
    // response.data.user
    // response.data.data.user
    // response.user
    const responseData = response?.data ?? response;

    const user =
      responseData?.user ??
      responseData?.data?.user ??
      response?.user ??
      null;

    const accessToken =
      responseData?.accessToken ??
      responseData?.data?.accessToken ??
      response?.accessToken ??
      null;

    if (!user) {
      console.error("LOGIN RESPONSE:", response);
      throw new Error("Invalid login response.");
    }

    const userRole = String(user.role || "").toLowerCase();

    // Normalize portal role
    const portal = String(resolvedPortalRole || "").toLowerCase();

    // USER PORTAL
    if (portal === "user" && userRole !== "user") {
      throw new Error(
        "You are not authorized to login from this page."
      );
    }

    // ARTIST PORTAL
    if (portal === "artist" && userRole !== "artist") {
      throw new Error(
        "Access denied. Artist credentials required."
      );
    }

    // ADMIN PORTAL
    if (
      portal === "admin" &&
      userRole !== "admin" &&
      userRole !== "super_admin"
    ) {
      throw new Error(
        "Access denied. Admin credentials required."
      );
    }

    // Save token
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    set({
      user,
      token: accessToken,
      isAuthenticated: true,
      initialized: true,
      isLoading: false,
      error: null,
    });

    return user;
  } catch (error) {
    console.error("Login error:", error);

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Login failed";

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: message,
    });

    throw new Error(message);
  }
},

  logout: async () => {
    resetPlayerForLogout();

    try {
      await authService.logout();
    } catch (error) {
      console.warn("Logout request failed, clearing local auth state anyway.", error);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      initialized: true,
      isLoading: false,
      error: null,
    });
  },
}));

export default useAuthStore;
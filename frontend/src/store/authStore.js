import { create } from "zustand";

import authService from "@/services/authService";
import { storage } from "@/utils/storage";

const useAuthStore = create((set, get) => ({
  user: storage.getUser(),
  accessToken: storage.getToken(),

  loading: false,
  initialized: false,

  isAuthenticated: !!storage.getToken(),

  // ======================
  // LOGIN (FIXED)
  // ======================

  login: async (emailOrCredentials, password) => {
    set({ loading: true });

    try {
      // Handle both object { email, password } and separate (email, password) arguments
      let credentials = emailOrCredentials;
      if (typeof emailOrCredentials === 'string' && password) {
        credentials = { email: emailOrCredentials, password };
      }

      const response = await authService.login(credentials);

      const { accessToken, user } = response.data.data;

      storage.setToken(accessToken);
      storage.setUser(user);

      set({
        user,
        accessToken,
        isAuthenticated: true,
        initialized: true,
        loading: false,
      });

      return response.data;
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  // ======================
  // REGISTER
  // ======================

  register: async (data) => {
    set({ loading: true });

    try {
      const response = await authService.register(data);

      set({
        loading: false,
      });

      return response.data;
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  // ======================
  // FETCH CURRENT USER
  // ======================

  fetchCurrentUser: async () => {
    try {
      const response = await authService.getMe();

      const user = response.data.data;

      storage.setUser(user);

      set({
        user,
        initialized: true,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      storage.clear();

      set({
        user: null,
        accessToken: null,
        initialized: true,
        isAuthenticated: false,
      });

      throw error;
    }
  },

  // ======================
  // INITIALIZE APP
  // ======================

  initialize: async () => {
    const token = storage.getToken();

    if (!token) {
      set({
        initialized: true,
        isAuthenticated: false,
      });

      return;
    }

    try {
      await get().fetchCurrentUser();
    } catch {
      // handled in fetchCurrentUser
    }
  },

  // ======================
  // LOGOUT
  // ======================

  logout: async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore logout API failure
    }

    storage.clear();

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      initialized: true,
    });
  },

  // ======================
  // UPDATE USER
  // ======================

  updateUser: (user) => {
    storage.setUser(user);

    set({
      user,
    });
  },
}));

export default useAuthStore;
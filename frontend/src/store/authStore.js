import { create } from "zustand";
import authService from "@/services/authService";
import { storage } from "@/utils/storage";

const useAuthStore = create((set, get) => ({

  user: storage.getUser(),

  accessToken: storage.getToken(),

  loading: false,

  initialized: false,

  isAuthenticated: !!storage.getToken(),

  login: async (credentials) => {

    set({ loading: true });

    try {

      const response = await authService.login(credentials);

      const { accessToken, user } = response.data.data;

      storage.setToken(accessToken);

      storage.setUser(user);

      set({
  user,
  accessToken,
  initialized: true,
  isAuthenticated: true,
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

  } catch {

    storage.clear();

    set({
      user: null,
      accessToken: null,
      initialized: true,
      isAuthenticated: false,
    });

  }

},


});

export default useAuthStore;
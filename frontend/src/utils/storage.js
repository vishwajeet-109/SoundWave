const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export const storage = {
  getToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  setToken: (token) =>
    localStorage.setItem(ACCESS_TOKEN_KEY, token),

  removeToken: () =>
    localStorage.removeItem(ACCESS_TOKEN_KEY),

  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user) =>
    localStorage.setItem(USER_KEY, JSON.stringify(user)),

  removeUser: () =>
    localStorage.removeItem(USER_KEY),

  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
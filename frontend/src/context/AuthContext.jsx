import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Temporary guest mode
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      user,
      setUser,

      isAuthenticated: !!user,

      login: (userData) => {
        setUser(userData);
      },

      logout: () => {
        setUser(null);
      },
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export default AuthContext;
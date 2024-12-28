import React, { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin ,getToken, getAuthenticatedUser, logout } from "../services/authService";


interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (token) {
        try {
          const authenticatedUser = await getAuthenticatedUser();
          setUser(authenticatedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error al autenticar usuario:", error);
          logout();
        }
      }
    };

    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    const token = await apiLogin(username, password);
    if (token) {
      const authenticatedUser = await getAuthenticatedUser();
      setUser(authenticatedUser);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

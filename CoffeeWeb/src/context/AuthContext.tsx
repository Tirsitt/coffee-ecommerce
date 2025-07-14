import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";

export type UserRole = "user" | "admin";

export type User = {
  email: string;
  name?: string;
  role: UserRole;
  lastLogin?: Date;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Session timeout (30 minutes for admin, 2 hours for users)
const SESSION_TIMEOUT = {
  admin: 30 * 60 * 1000,
  user: 2 * 60 * 60 * 1000
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check session expiration
  const checkSession = useCallback((storedUser: string) => {
    const parsedUser = JSON.parse(storedUser) as User & { timestamp: number };
    const timeout = parsedUser.role === "admin" 
      ? SESSION_TIMEOUT.admin 
      : SESSION_TIMEOUT.user;
      
    if (Date.now() - parsedUser.timestamp > timeout) {
      localStorage.removeItem("user");
      return null;
    }
    return parsedUser;
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        const validUser = checkSession(stored);
        setUser(validUser);
        if (!validUser) {
          navigate("/login");
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, [navigate, checkSession]);

  const login = async (email: string, password: string, isAdmin?: boolean) => {
    setLoading(true);
    try {
      const foundUser = mockUsers.find(
        (u) =>
          u.email === email &&
          u.password === password &&
          (!isAdmin || u.role === "admin") // Only check admin role if isAdmin=true
      );

      if (!foundUser) {
        throw new Error(isAdmin 
          ? "Invalid admin credentials" 
          : "Invalid email or password");
      }

      const userData: User = { 
        email: foundUser.email, 
        name: foundUser.name, 
        role: foundUser.role as UserRole,
        lastLogin: new Date()
      };

      // Store with timestamp for session expiration
      localStorage.setItem("user", JSON.stringify({
        ...userData,
        timestamp: Date.now()
      }));

      setUser(userData);
      navigate(foundUser.role === "admin" ? "/admin/dashboard" : "/");
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    const wasAdmin = user?.role === "admin";
    setUser(null);
    localStorage.removeItem("user");
    navigate(wasAdmin ? "/admin/login" : "/");
  }, [navigate, user]);

  // Auto-logout on inactivity
  useEffect(() => {
    const handleInactivity = () => {
      if (!user) return;
      
      const stored = localStorage.getItem("user");
      if (stored && !checkSession(stored)) {
        logout();
      }
    };

    const interval = setInterval(handleInactivity, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [user, checkSession, logout]);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
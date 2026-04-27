import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try{
      const saved = localStorage.getItem("auth");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
    
  });

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (!auth?.token) {
        setAuthLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/api/auth/me");
        setAuth((prev) => ({
          ...prev,
          user: data.user,
          company: data.company,
        }));
      } catch (error) {
          if (error.response?.status === 401) {
            setAuth(null); // only logout if token is invalid
          }
        // setAuth(null);
        console.warn("Session check failed, keeping local auth");
      } finally {
        setAuthLoading(false);
      }
    };

    verifySession();
  }, [auth?.token]);

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  const login = async (formData) => {
    const { data } = await api.post("/api/auth/login", formData);

    if(!data?.token) {
      throw new Error("Invalid login response")
    }
    setAuth(data);
    return data;
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");

    window.location.href = "/login"
  };

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      login,
      logout,
      authLoading,
      isAuthenticated: !!auth?.token,
    }),
    [auth, authLoading],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

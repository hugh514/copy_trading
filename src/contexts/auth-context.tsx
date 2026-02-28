"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import api from "../services/api";
import { User, AuthState } from "../types/auth";

interface AuthContextType extends AuthState {
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get("/api/auth/me");
      const userData = response.data.data;
      setState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      deleteCookie("token");
    }
  }, []);

  const login = async (token: string) => {
    setCookie("token", token, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
    await refreshUser();
  };

  const logout = () => {
    deleteCookie("token");
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      refreshUser();
    } else {
      setState((prev: AuthState) => ({ ...prev, isLoading: false }));
    }
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

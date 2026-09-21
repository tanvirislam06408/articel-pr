"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "author" | "user";
  bio?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("monon_auth_token");
    if (savedToken) {
      setToken(savedToken);
      api.auth
        .me()
        .then((res) => {
          if (res.data) {
            setUser(res.data);
          }
        })
        .catch(() => {
          localStorage.removeItem("monon_auth_token");
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await api.auth.login(credentials);
    if (res.data?.token) {
      localStorage.setItem("monon_auth_token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    }
  };

  const logout = () => {
    localStorage.removeItem("monon_auth_token");
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await api.auth.me();
      if (res.data) {
        setUser(res.data);
      }
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
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

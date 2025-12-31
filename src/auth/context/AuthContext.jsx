import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("customer/get");
      setUser(data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (response) => {
    try {
      if (!response?.token) return false;

      localStorage.setItem("token", response.token);

      setUser(response.data);

      closeAuth();
      navigate("/account/profile");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    navigate("/");
  };

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);
if (loading) return null; 

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthOpen,
        login,
        logout,
        openAuth,
        closeAuth,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

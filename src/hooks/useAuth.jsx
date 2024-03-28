import { useState, useContext, createContext } from "react";

import api from "../api/api";

export const AuthContext = createContext(null);

import { useLocation } from "wouter";

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState("");

  const [, setLocation] = useLocation();

  const adminInStorage = async () => {
    try {
      const res = await api.checkForAdmin();

      return res;
    } catch (err) {
      return false;
    }
  };

  const adminHasRegistered = async () => {
    const res = await api.checkIfAdminHasRegistered();

    return res.registered;
  };

  const register = async (data) => {
    await api.register(data);
    setLocation("/_/login");
  };

  const login = async (data) => {
    const res = await api.login(data);

    setAdmin(res.admin);
    setLocation("/_/data");
  };

  const logout = async () => {
    const res = await api.logout();

    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        setAdmin,
        adminInStorage,
        adminHasRegistered,
        logout,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

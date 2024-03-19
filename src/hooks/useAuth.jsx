import { useState, useContext, createContext } from 'react';

import api from '../api/api';

export const AuthContext = createContext(null);

import { useLocation } from 'wouter';

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState('');

  const [, setLocation] = useLocation();

  const adminInStorage = async () => {
    try {
      const res = await api.checkForAdmin();
      console.log(res, 'admin in storage');
      return res.admin;
    } catch (err) {
      return false;
    }
  };

  const adminHasRegistered = async () => {
    const res = await api.checkIfAdminHasRegistered();
    console.log(res, 'admin has registered');
    return res.registered;
  };

  const register = async (data) => {
    await api.register(data);
    setLocation('/login');
  };

  const login = async (data) => {
    const res = await api.login(data);
    console.log(res, 'logged in');
    setAdmin(res.admin);
    setLocation('/data');
  };

  const logout = async () => {
    const res = await api.logout();
    console.log(res, 'logged out');
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

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const currentPath = window.location.pathname;

    if (!userEmail && currentPath !== "/sign-in" && currentPath !== "/sign-up" && currentPath !== "/forgot-password" && currentPath !== "/password-reset" && currentPath !== "/") {
      setIsAuthenticated(false);
      window.location.href = "/sign-in";
    } else {
      setUserEmail(userEmail);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email) => {
    localStorage.setItem("userEmail", email);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    window.location.href = "/sign-in";
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <UserContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;

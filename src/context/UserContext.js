"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userEmail"]);
  const [userEmail, setUserEmail] = useState(cookies.userEmail || null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const currentPath = window.location.pathname;

    if (!cookies.userEmail && currentPath !== "/sign-in" && currentPath !== "/sign-up" && currentPath !== "/forgot-password" && currentPath !== "/password-reset" && currentPath !== "/") {
      setIsAuthenticated(false);
      window.location.href = "/sign-in";
    } else {
      setUserEmail(cookies.userEmail || null);
      setIsAuthenticated(true);
    }
  }, [cookies]);

  const login = (email) => {
    localStorage.setItem("userEmail", email);
    setCookie("userEmail", email, {
      path: "/",
      maxAge: 3600,
      sameSite: "strict",
    });
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    removeCookie("userEmail", { path: "/" });
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

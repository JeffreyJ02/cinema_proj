"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      try {
        // Decodes the token and sets the user so frontend can pull data from the token
        const decoded = jwtDecode(cookies.token);
        setUser(decoded);
        console.log("Decoded token:", decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    } else {
      setUser(null); // No token found
    }
  }, [cookies.token]); // Rerun if the token changes

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;

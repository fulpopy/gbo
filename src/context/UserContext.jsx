// context/UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Function to log in and store the token
  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("accessToken", token); // Save token in localStorage
  };

  // Function to log out
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  // Provide the token, login, and logout functions to other components
  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

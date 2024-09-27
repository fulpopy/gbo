// context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Function to log in and store the token
  const login = (userData, token) => {
    setToken(token);
    localStorage.setItem("accessToken", token); // Save token in localStorage
    localStorage.setItem("username", userData.username);
  };

  // Function to log out
  const logout = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
  };

  // Provide the token, login, and logout functions to other components
  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

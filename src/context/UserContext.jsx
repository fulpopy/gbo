// context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      const decodedToken = jwtDecode(savedToken);
      setToken(savedToken);
      setIsAdmin(decodedToken.isAdmin);
      setUser(decodedToken.username);
    }
  }, []);

  // Function to log in and store the token
  const login = (token) => {
    setToken(token);
    const decodedToken = jwtDecode(token);
    setIsAdmin(decodedToken.isAdmin);
    setUser(decodedToken.username);
    localStorage.setItem("accessToken", token);
  };

  // Function to log out
  const logout = () => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("accessToken");
  };

  // Provide the token, login, and logout functions to other components
  return (
    <UserContext.Provider value={{ token, login, logout, isAdmin, user }}>
      {children}
    </UserContext.Provider>
  );
};

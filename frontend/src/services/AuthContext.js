import React, { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {     
    const userJson = localStorage.getItem("user");
    const storageJwt = localStorage.getItem("token");

    if (Boolean(userJson) && Boolean(storageJwt)) {
      const userObj = JSON.parse(userJson);
      setUser(userObj);
      setToken(storageJwt);
      setIsLoggedIn(true);
    }

  }, []);

  const login = (userObj, token) => {
    setIsLoggedIn(true);
    setUser(userObj);
    setToken(token);

    const userJson = JSON.stringify(userObj);
    localStorage.setItem("user", userJson);
    localStorage.setItem("token", token);
  }

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
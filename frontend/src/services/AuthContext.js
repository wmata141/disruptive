import React, { useState, useEffect, createContext } from 'react';

// Create a context to manage authentication
const AuthContext = createContext();

// Define the Provider component that will be used to provide authentication information to child components
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // State to control whether the user is logged in  
  // State to store the authentication token
  // State to store the authenticated user information

  // Effect that runs when the component mounts to check if there is an authenticated user in local storage
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const storageJwt = localStorage.getItem("token");

    // If there is a user and a token in local storage, set them in the state
    if (Boolean(userJson) && Boolean(storageJwt)) {
      const userObj = JSON.parse(userJson);
      setUser(userObj);
      setToken(storageJwt);
      setIsLoggedIn(true);
    }

  }, []);

  // Function to log in
  const login = (userObj, token) => {
    setIsLoggedIn(true);
    setUser(userObj);
    setToken(token);

    // Store the user information and token in local storage
    const userJson = JSON.stringify(userObj);
    localStorage.setItem("user", userJson);
    localStorage.setItem("token", token);
  }

  // Function to log out
  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUser(null);
    // Remove user data and token from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  // Provide the context with authentication information and the login and logout functions to child components
  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context and Provider component to be used in other components
export { AuthContext, AuthProvider };
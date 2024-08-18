import React, { useState, useEffect, createContext } from 'react';

// Creamos un contexto para manejar la autenticación
const AuthContext = createContext();

// Definimos el componente Provider que será utilizado para proveer la información de autenticación a los componentes hijos
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Estado para controlar si el usuario ha iniciado sesión  
  // Estado para almacenar el token de autenticación
  // Estado para almacenar la información del usuario autenticado

  // Efecto que se ejecuta al iniciar el componente para verificar si hay un usuario autenticado en el almacenamiento local
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const storageJwt = localStorage.getItem("token");

    // Si hay un usuario y un token en el almacenamiento local, se establecen en el estado
    if (Boolean(userJson) && Boolean(storageJwt)) {
      const userObj = JSON.parse(userJson);
      setUser(userObj);
      setToken(storageJwt);
      setIsLoggedIn(true);
    }

  }, []);

  // Función para iniciar sesión
  const login = (userObj, token) => {
    setIsLoggedIn(true);
    setUser(userObj);
    setToken(token);

    // Se almacena la información del usuario y el token en el almacenamiento local
    const userJson = JSON.stringify(userObj);
    localStorage.setItem("user", userJson);
    localStorage.setItem("token", token);
  }

  // Función para cerrar sesión
  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUser(null);
    // Se eliminan los datos de usuario y token del almacenamiento local
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  // Se provee el contexto con la información de autenticación y las funciones de login y logout a los componentes hijos
  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportamos el contexto y el componente Provider para ser utilizados en otros componentes
export { AuthContext, AuthProvider };
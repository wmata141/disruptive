import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router';
import { AuthContext } from '../services/AuthContext';

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  const isAuthenticated = () => {
    // Verificar si el usuario está autenticado
    // return true o false
    return user
  };

  if (isAuthenticated()) {
    return <Outlet />;
  }

  return <Navigate to="/login" />
}

export default PrivateRoute;
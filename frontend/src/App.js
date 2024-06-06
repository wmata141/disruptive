import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "./services/AuthContext";
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/MainLayout';
import LoginView from './modules/login';
import DashboardView from './modules/dashboard';
import Category from './modules/category';
import Theme from './modules/theme';

const App = () => {
  const globalStyles = {
    a: {
      color: "unset",
      textDecoration: "none"
    }
  };

  return (
    <AuthProvider>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginView />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<MainLayout />}>
              <Route path="" element={<DashboardView />} />
              <Route path="/dashboard/category" element={<Category />} />
              <Route path="/dashboard/theme" element={<Theme />} />
            </Route>
          </Route>

          <Route path='*' element={<LoginView />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;

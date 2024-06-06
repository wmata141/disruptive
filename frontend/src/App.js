import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "./services/AuthContext";
import LoginView from './modules/login';

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
          <Route path='*' element={<LoginView />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;

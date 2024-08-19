import React, { useState, useContext } from "react";
import axios from 'axios';
import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../services/AuthContext";

const API_URL = process.env.REACT_APP_API_URL

const LogIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setIsLoggedIn, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const hanleSignIn = async (e) => {
    e.preventDefault();
    props.setOnRequest(true);
    props.onSignIn()

    if (email === '' || password === '') {
      setTimeout(() => {
        props.setOnRequest(false);
      }, 1000);

      return toast.warning('The form contains empty fields')
    }

    const objData = {
      "email": email,
      "password": password
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, objData)

      const { user, accessToken } = response.data

      login(user, accessToken)

      setIsLoggedIn(true);

      setTimeout(() => {
        navigate("/dashboard/index");
      }, 1000);

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }

      setTimeout(() => {
        props.setOnRequest(false);
      }, 1000);
    }
  };

  return (
    <Box component="form" maxWidth={400} width="100%" onSubmit={hanleSignIn}>
      <Stack spacing={3}>
        <TextField
          label="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete='off'
          fullWidth
          required
        />
        <TextField
          label="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete='off'
          fullWidth
          required
        />
        <Button type="submit" size="large" variant="contained" color="success">
          sign in
        </Button>
      </Stack>
    </Box>
  );
};

export default LogIn;
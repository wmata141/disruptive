import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Select, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { AuthContext } from "../../services/AuthContext";

const API_URL = process.env.REACT_APP_API_URL

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('reader');

  const { setIsLoggedIn, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const hanleRegister = async (e) => {
    e.preventDefault();
    props.setOnRequest(true);
    props.onSignIn()

    if (name === '' || email === '' || password === '') {
      setTimeout(() => {
        props.setOnRequest(false);
      }, 1000);

      return toast.warning('El formulario contiene campos vacios')
    }

    const objData = {
      "name": name,
      "email": email,
      "password": password,
      "type": type
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, objData)

      const { user, accessToken } = response.data

      login(user, accessToken)

      setIsLoggedIn(true);

      setTimeout(() => {
        navigate("/dashboard");
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
    <Box component="form" maxWidth={400} width="100%" onSubmit={hanleRegister}>
      <Stack spacing={3}>
        <TextField
          label="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          inputProps={{
            minLength: 1,
            maxLength: 20,
          }}
          autoComplete='off'
          required
          fullWidth
        />
        <TextField
          label="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete='off'
          required
          fullWidth
        />
        <TextField
          label="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete='off'
          required
          fullWidth
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="type"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <MenuItem value={'reader'} selected >Reader</MenuItem>
          <MenuItem value={'creator'}>Creator</MenuItem>
        </Select>
        <Button type="submit" size="large" variant="contained" color="success">
          sign up
        </Button>
      </Stack>
    </Box>
  );
};

export default Register;
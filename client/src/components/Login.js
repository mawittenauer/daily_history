import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Typography, Container, CssBaseline } from "@mui/material";
import { styled } from "@mui/system";
import { useCookies } from 'react-cookie';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const [, setCookie] = useCookies();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password.');
      }

      const data = await response.json();

      // Set the token in an HTTP-only cookie
      setCookie('authToken', data.token, { path: '/' });
      console.log('Token set:', data.token); // Log the token to the console

      // Redirect to the home page or wherever you want to go after successful login
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledSubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </StyledSubmitButton>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </StyledForm>
      </div>
    </StyledContainer>
  );
};

export default Signin;

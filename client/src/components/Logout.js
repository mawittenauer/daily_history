// src/components/Logout.js
import React, { useEffect } from 'react';
import { Typography, Container, CssBaseline } from '@mui/material';
import { Cookies } from 'react-cookie';

const Logout = () => {
  const cookies = new Cookies();

  useEffect(() => {
    const handleLogout = () => {
        // Remove the authentication token cookie
        cookies.remove('authToken', { path: '/' });

        // Redirect to the login page or wherever you want to go after logout
        window.location.href = '/login';
    };

    handleLogout();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Logout
        </Typography>
      </div>
    </Container>
  );
};

export default Logout;

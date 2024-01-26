// src/components/Home.js
import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useCookies } from 'react-cookie';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  textAlign: 'center',
}));

const StyledHeading = styled(Typography)({
  marginBottom: theme => theme.spacing(4),
});

const StyledFeature = styled(Typography)({
  marginBottom: theme => theme.spacing(2),
});

const Home = () => {
  const [cookies] = useCookies(['authToken']);
  const authToken = cookies.authToken;

  return (
    <StyledContainer component="main" maxWidth="md">
      <CssBaseline />
      <StyledHeading component="h1" variant="h3">
        Welcome to Our History App
      </StyledHeading>
      {authToken ? (
        <>
          <StyledFeature variant="h5">You are logged in!</StyledFeature>
          {/* Display additional authenticated content */}
        </>
      ) : (
        <>
          <StyledFeature variant="h5">Get daily history facts sent straight to the platforms you use most!</StyledFeature>
        </>
      )}
      {/* Add more features or information as needed */}
    </StyledContainer>
  );
};

export default Home;
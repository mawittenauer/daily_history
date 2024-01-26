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
        Welcome to Your Finance App
      </StyledHeading>
      {authToken ? (
        <>
          <StyledFeature variant="h5">You are logged in!</StyledFeature>
          {/* Display additional authenticated content */}
        </>
      ) : (
        <>
          <StyledFeature variant="h5">Track Your Debts, Assets, Savings, and Investments</StyledFeature>
          <StyledFeature variant="h5">Plan for Retirement</StyledFeature>
        </>
      )}
      {/* Add more features or information as needed */}
    </StyledContainer>
  );
};

export default Home;
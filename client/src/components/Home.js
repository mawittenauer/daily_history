import React from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import { styled } from "@mui/system";

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
  return (
    <StyledContainer component="main" maxWidth="md">
      <CssBaseline />
      <StyledHeading component="h1" variant="h3">
        Welcome to Your Finance App
      </StyledHeading>
      <StyledFeature variant="h5">
        Track Your Debts, Assets, Savings, and Investments
      </StyledFeature>
      <StyledFeature variant="h5">
        Plan for Retirement
      </StyledFeature>
      {/* Add more features or information as needed */}
    </StyledContainer>
  );
};

export default Home;

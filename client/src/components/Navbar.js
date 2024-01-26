import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const StyledAppBar = styled(AppBar)({
  borderBottom: '1px solid #ddd',
  backgroundColor: '#fff',
});

const StyledToolbar = styled(Toolbar)({
  flexWrap: 'wrap',
});

const StyledTypography = styled(Typography)({
  flexGrow: 1,
});

const StyledLink = styled(Link)({
  margin: '8px',
  textDecoration: 'none',
});

const StyledButton = styled(Button)({
  color: '#007BFF',
  borderColor: '#007BFF',
});

const Navbar = () => {
  return (
    <StyledAppBar position="sticky" elevation={0}>
      <StyledToolbar>
        <StyledTypography variant="h6" color="inherit" noWrap>
          Your Finance App
        </StyledTypography>
        <nav>
          <StyledLink to="/signup">
            <StyledButton variant="outlined">Sign Up</StyledButton>
          </StyledLink>
          <StyledLink to="/login">
            <StyledButton variant="outlined">Sign In</StyledButton>
          </StyledLink>
        </nav>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;

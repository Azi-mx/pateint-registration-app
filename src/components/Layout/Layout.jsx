import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }} maxWidth="100%">
          {children}
        </Container>
        <Box
          component="footer"
          sx={{ py: 3, bgcolor: "background.paper", textAlign: "center" }}
        >
          <Container>
            <Typography sx={{ color: "text.secondary" }}>
              {new Date().getFullYear()} Patient Registration System
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Layout;

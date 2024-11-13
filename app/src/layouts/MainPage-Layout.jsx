import { Box, Paper } from "@mui/material";
import { MenuAppBar } from "@components/appBar/MenuAppBar";
import PropTypes from "prop-types";
import Header from "@components/header/Header";
import { useState } from "react";
import LateralNav from "@components/navigation/LateralNav";
import Footer from "@components/footer/FooterSection";
import { Outlet } from "react-router-dom";
import ScrollToTopButton from "../utils/ScrollToTopButton ";

export const MainPageLayout = () => {
  const [showLateralNav, setShowLateralNav] = useState(true);

  const handleLateralNav = () => {
    setShowLateralNav(!showLateralNav);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ScrollToTopButton />
      <Header />
      <MenuAppBar
        handleLateralNav={handleLateralNav}
        showLateralNav={showLateralNav}
      />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: { xs: "column", md: "row" },
          boxSizing: 'border-box',
        }}
      >
        {showLateralNav && <LateralNav />}
        <Paper sx={{ width: "100%", padding: "10px", overflow: "hidden" }}>
          <Outlet />
        </Paper>
      </Box>
      <Footer />
    </Box>
  );
};

MainPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

import { useState, useEffect } from "react";
import { Box, Fab } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTheme } from "@mui/material/styles";

const ScrollToTopButton = () => {
  const theme = useTheme();
  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fab
      color="primary"
      aria-label="scroll to top"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: visible ? "block" : "none",
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.text.dark,
      }}
      onClick={scrollToTop}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ArrowUpwardIcon />
      </Box>
    </Fab>
  );
};

export default ScrollToTopButton;

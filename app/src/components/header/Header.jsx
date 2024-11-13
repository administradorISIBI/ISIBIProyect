import { Box } from "@mui/material";
import logo from "@assets/img/ISIBILogo.png";
import logoPoli from "@assets/img/logo-UNIVERSITASXXI.png";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignContent: "center",
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          margin: "0px 20px",
          alignContent: "center",
          justifyContent: "space-between",
          p: "5px",
          cursor: "pointer",
        }}
      >
        <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
          <Box
            component="img"
            src={logo}
            alt="IsibiLogo"
            sx={{
              height: { xs: "30px", sm: "45px" }, 
            }}
          />
        </Box>
        <Box
          component="img"
          src="https://www.politecnicojic.edu.co/images/logo/logo.png"
          alt="LogoPoliJIC"

          onClick={() => window.open('https://www.politecnicojic.edu.co/', "_blank")}
          sx={{
            height: { xs: "35px", sm: "50px" }, 
          }}
        />
      </Box>
    </Box>
  );
};

export default Header;

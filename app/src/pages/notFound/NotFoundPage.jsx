import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import notFoundImage from "@assets/img/404NotFound.jpg";

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <img
          src={notFoundImage}
          alt="404 Not Found"
          style={{height: '50vh',  maxWidth: "100%", marginBottom: "20px" }}
        />
      </Box>
      <Button onClick={handleClick} sx={{ mt: 2, height:'5vh', width:'10vw' }}>
        volver
      </Button>
    </Box>
  );
};

export default NotFoundPage;

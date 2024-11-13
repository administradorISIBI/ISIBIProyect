import Header from "@components/header/Header";
import Footer from "@components/footer/FooterSection";
import { Box } from "@mui/material";
import Login from "@components/auth/LoginRegister";

const AuthPage = () => {
  return (
    <>
      <Box sx={{ minHeight: '100vh', display:'flex', flexDirection:'column'}}>
        <Header />
        <Box sx={{flex:'1', display: 'flex'}}>
            <Login/>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default AuthPage;

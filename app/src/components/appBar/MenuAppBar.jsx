import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "@store/auth/actions";
import { Logout } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
import { selectPalette } from "@store/config/selectors";
import { setNight, setNormal } from "@store/config/reducers";

export const MenuAppBar = ({ handleLateralNav, showLateralNav }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { status } = useSelector(selectPalette)

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.palette.secondary.dark,
      cancelButtonColor: theme.palette.error.main,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutAction());
        Swal.fire("Cerrado!", "Has cerrado sesión con éxito.", "success");
      }
    });
  };

  const handleChangeTheme = () => {
    if (status === 'normal') {
      dispatch(setNight())
    } else {
      dispatch(setNormal())
    }
  }

  return (
    <Box>
      <AppBar
        sx={{
          margin: "0px 0px 0px 0px",
          position: "relative",
          zIndex: '1'
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              transition: "transform 0.3s ease",
              transform: showLateralNav ? "rotate(360deg)" : "rotate(0deg)",
            }}
            onClick={handleLateralNav}
          >
            <MenuIcon />
          </IconButton>
          {/* se puede realizar un breacumb con  {location.pathname.replace(/^\/+/, '')} */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inicio
          </Typography>
          {/* <IconButton sx={{ margin: '0px 10px', color: theme.palette.text.main }} onClick={handleChangeTheme}>
            <LightModeOutlinedIcon />
          </IconButton> */}
          {isAuthenticated ? (
            <>
              <Box sx={{ mr: "10px" }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {user.username}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  p: "5px",
                  "&:hover": { bgcolor: "#FF914D" },
                  borderRadius: "5px",
                }}
              >
                <Logout
                  onClick={handleLogout}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </Box>
            </>
          ) : (
            <>
              <Button onClick={handleLogin}>Iniciar sesión</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

MenuAppBar.propTypes = {
  handleLateralNav: PropTypes.func.isRequired,
  showLateralNav: PropTypes.bool.isRequired,
};

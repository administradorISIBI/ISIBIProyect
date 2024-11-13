import { useEffect, useState } from "react";
import style from "./Login.module.css";

import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { setLoginSuccess } from "@store/auth/reducers";

import Swal from "sweetalert2";
import { createUser } from "@store/auth/actions";
import { login } from "@store/auth/actions";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { BackPath } from "../../utils/BackPath";

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUserName, setSignupUserName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  // const [submitType, setSubmitType] = useState("");

  const token = useSelector((state) => state.auth.token);
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const { loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("authToken");
    // console.log("session token");

    if (sessionToken && !token) {
      const token = sessionStorage.getItem("authToken");
      const email = sessionStorage.getItem("email");
      const username = sessionStorage.getItem("username");
      const rol = sessionStorage.getItem("rol");
      dispatch(setLoginSuccess({ token, user: { email, username, rol } }));
    }
    if (auth) {
      navigate("/");
    }
  }, [dispatch, token, navigate, auth]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const action = await dispatch(login({ email: loginEmail, password: loginPassword }));

    if (action.type.endsWith("rejected")) {
      Swal.fire({
        title: "Error",
        text: action.payload,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const action = await dispatch(
      createUser({
        username: signupUserName,
        email: signupEmail,
        password: signupPassword,
      })
    );
    if (action.type.endsWith("rejected")) {
      Swal.fire({
        title: "Error",
        text: action.payload.message,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    } else {
      Swal.fire({
        title: "Registro Exitoso",
        text: action.payload.message,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      handleResetFields()
    }
  };

  const handleClickBack = () => {
    navigate("/");
  };
  const handleResetFields = () => {
    setLoginEmail("");
    setLoginPassword("");
    setSignupUserName("");
    setSignupEmail("");
    setSignupPassword("");
  }

  return (
    <div className={style.body}>
      {/* Background main */}
      <div className={style.main} style={{}}>
        <input
          type="checkbox"
          id="chk"
          aria-hidden="true"
          className={style.checkbox}
          onClick={handleResetFields}
        />
        <BackPath/>
        <div className={style.login}>
          <form className={style.containform} onSubmit={handleSignUp}>
          <Tooltip
              title={
                <span>
                  El Nombre de usuario y Correo electrónico deben ser únicos
                </span>
              }
              sx={{
                position: 'absolute',
                right: '0px',
                top: '0px',
              }}
            >
              <IconButton size="small" >
                <HelpOutlineIcon sx={{ fontSize: '25px', zIndex: 10 }} />
              </IconButton>
            </Tooltip>
            <label
              htmlFor="chk"
              aria-hidden="true"
              className={`${style.chk} ${style.label}`}
            >
              Registro
            </label>
            <input
              type="text"
              name="txt"
              placeholder="Nombre de usuario"
              required
              value={signupUserName}
              onChange={(e) => setSignupUserName(e.target.value)}
              className={style.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className={style.input}
            />
            <input
              type="password"
              name="pswd"
              placeholder="Contraseña"
              required
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className={style.input}
            />
            <Button type="submit" className={style.button}>
              {loading ? <CircularProgress size="25px" /> : "Registrarse"}
            </Button>
            <div>
              <label style={{ marginRight: "5px" }}>
                ¿Ya te tienes cuenta?{" "}
              </label>
              <label htmlFor="chk" className={`${style.regToLogin} `}>
                inicia sesión
              </label>
            </div>
            <Box sx={{ margin: '50px 0px' }}>
              <Button onClick={handleClickBack}>
                <ArrowBackIcon />
              </Button>
            </Box>
          </form>
        </div>

        <div className={style.signup}>
          <form className={style.containform} onSubmit={handleLogin}>
            <label
              htmlFor="chk"
              aria-hidden="true"
              className={`${style.chk} ${style.label}`}
            >
              <Typography variant="title"> Iniciar Sesión</Typography>
            </label>

            <input
              type="email"
              name="Nombre de usuario"
              placeholder="Correo electrónico"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className={style.input}
            />
            <input
              type="password"
              name="pswd"
              placeholder="contraseña"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className={style.input}
            />
            <Button type="submit" className={`${style.button}`}>
              {loading ? <CircularProgress size="25px" /> : "Iniciar Sesión"}
            </Button>
            <label htmlFor="chk" className={`${style.regToLogin}  `}>
              Registrate
            </label>
            <label className={`${style.regToLogin}  `}>
              ¿Olvidaste tu contraseña?
            </label>

            <Box sx={{ margin: '50px 0px' }}>
              <Button onClick={handleClickBack}>
                <ArrowBackIcon />
              </Button>
            </Box>
            <Tooltip
              title={
                <span>
                  ¿Por qué iniciar sesión?
                  <br /><br />
                  Porque así podrás tener el registro de tus búsquedas y guardar los recursos que te gusten en una sección de favoritos!!
                </span>
              }
              sx={{
                position: 'absolute',
                right: '0px',
                top: '0px'
              }}
            >
              <IconButton size="small" >
                <HelpOutlineIcon sx={{ fontSize: '25px', }} />
              </IconButton>
            </Tooltip>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

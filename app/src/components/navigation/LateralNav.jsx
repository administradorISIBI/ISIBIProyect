import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectAuth } from "@store/auth/selectors";
//icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useTheme } from "@mui/material/styles";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LateralNav = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, rol } = useSelector(selectAuth);

  return (
    <Box
      sx={{
        padding: "0px 10px",
        backgroundColor: theme.palette.background.main
      }}
    >
      <List sx={{ p: "0px", width: "100%" }}>
        <ListItem
          button
          component={Link}
          to={"/"}
          sx={{
            cursor: "pointer",
            // p: "10px",
            width: "100%",
            bgcolor:
              location.pathname === "/"
                ? theme.palette.secondary.dark
                : "transparent",
          }}
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={"Búsqueda Básica"} />
        </ListItem>
        <ListItem
          button
          // component={Link}
          // to={"/busqueda-avanzada"}
          onClick={() => navigate("/busqueda-avanzada")}
          sx={{
            cursor: "pointer",
            // p: "10px",
            bgcolor:
              location.pathname === "/busqueda-avanzada"
                ? theme.palette.secondary.dark
                : "transparent",
            width: "100%",
          }}
        >
          <ListItemIcon>
            <TuneIcon />
          </ListItemIcon>
          <ListItemText primary={"Búsqueda Avanzada"} />
        </ListItem>
        <Divider sx={{ margin: "20px 0" }} /> {/* Separador */}
        {isAuthenticated ? (
          <>
            <Box sx={{ pl: "10px", pb: "15px" }}>
              <Typography>Perfil</Typography>
            </Box>
            <ListItem
              button
              // component={Link}
              // to={"/favoritos"}
              onClick={() => navigate("/favoritos")}
              sx={{
                cursor: "pointer",
                // p: "10px",
                width: "100%",
                bgcolor:
                  location.pathname === "/favoritos"
                    ? theme.palette.secondary.dark
                    : "transparent",
              }}
            >
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={"Favoritos"} />
            </ListItem>
            <ListItem
              button
              // component={Link}
              // to={"/historial"}
              onClick={() => navigate("/historial")}
              sx={{
                cursor: "pointer",
                // p: "10px",
                width: "100%",
                bgcolor:
                  location.pathname === "/historial"
                    ? theme.palette.secondary.dark
                    : "transparent",
              }}
            >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"Historial"} />
            </ListItem>
            <Divider sx={{ margin: "20px 0" }} />{" "}
            {/* Separador para Panel de administración */}
            {rol === "admin" ? (
              <>
                <Box sx={{ pl: "10px", pb: "15px" }}>
                  <Typography>Panel de administración</Typography>
                </Box>
                <ListItem
                  button
                  // component={Link}
                  // to={"/usuarios"}
                  onClick={() => navigate("/usuarios")}
                  sx={{
                    cursor: "pointer",
                    // p: "10px",
                    width: "100%",
                    bgcolor:
                      location.pathname === "/usuarios"
                        ? theme.palette.secondary.dark
                        : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Usuarios"} />
                </ListItem>
                <ListItem
                  button
                  // component={Link}
                  // to={"/catalogos"}
                  onClick={() => navigate("/catalogos")}
                  sx={{
                    cursor: "pointer",
                    // p: "10px",
                    width: "100%",
                    bgcolor:
                      location.pathname === "/catalogos" || location.pathname === "/catalogos/form"
                        ? theme.palette.secondary.dark
                        : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Catálogos"} />
                </ListItem>

                <ListItem
                  button
                  // to={"/catalogs-systems"}
                  onClick={() => navigate("/catalogs-systems")}
                  sx={{
                    cursor: "pointer",
                    width: "100%",
                    bgcolor:
                      location.pathname === "/catalogs-systems"
                        ? theme.palette.secondary.dark
                        : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <BookmarksIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Sistemas de Catálogos"} />
                </ListItem>
                <Divider sx={{ margin: "20px 0" }} />{" "}
              </>
            ) : null}
          </>
        ) : null}
        <Box sx={{ pl: "10px", pb: "15px" }}>
          <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginBottom: '20px' }}>
            <Typography>Acerca de  </Typography>
            <InfoOutlinedIcon sx={{ fontSize: "20px", ml: '10px' }} />
          </Box>
          <Box sx={{ border: '1px solid #ddd', borderRadius: '8px' }}>
            <Box sx={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
              <ListItem sx={{ cursor: "pointer", }} onClick={() => window.open("https://scribehow.com/shared/How_To_Search_and_Manage_Academic_Resources_Online__z1MLlFdyTceSuA6xIb_bEw", "_blank")}>
                <ListItemText primary={"Manual de usuario"} />
              </ListItem>
            </Box>
            <Divider  />
            <Box sx={{ width: '100%', textAlign: 'center'}}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography >Autores</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Autor: Diego Agudelo */}
                  <ListItem
                    sx={{ cursor: "pointer" }}
                    onClick={() => window.open("https://www.linkedin.com/in/-diego-agudelo/", "_blank")}
                  >
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <LinkedInIcon sx={{ fontSize: "20px" }} />
                    </ListItemIcon>
                    <ListItemText primary="Diego Agudelo" />
                  </ListItem>

                  {/* Autor: Jorge Giraldo */}
                  <ListItem
                    sx={{ cursor: "pointer" }}
                    onClick={() => window.open("https://www.linkedin.com/in/jorge-eliecer-giraldo-plaza-97846b310/", "_blank")}
                  >
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <LinkedInIcon sx={{ fontSize: "20px" }} />
                    </ListItemIcon>
                    <ListItemText primary="Jorge Giraldo" />
                  </ListItem>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ margin: "20px 0" }} />{" "}
      </List>
    </Box>
  );
};

export default LateralNav;

import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createFavorite, deleteFavorite } from "@store/favorites/actions";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";

const ResourceCard = ({ data, imagen = null, url = null, parentInfo = null, id }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const location = useLocation();
  const isFavoritesPath = location.pathname === "/favoritos";

  const { Link, titulo, ...dataFields } = data;

  const handleCardClick = useCallback(() => {
    const targetUrl = Link || url;
    if (targetUrl) {
      window.open(targetUrl, "_blank");
    }
  }, [Link, url]);

  const handleCardSave = useCallback(async () => {
    try {
      const email = sessionStorage.getItem("email") || null;
      const newFavorite = {
        email,
        imagen,
        nombre: parentInfo?.nombre,
        large_name: parentInfo?.large_name,
        resource: {
          ...data,
          Link: undefined // Excluir el campo "Link" del objeto resource
        },
      };
      const action = await dispatch(createFavorite(newFavorite));
      if (action.type.endsWith("fulfilled")) {
        Swal.fire({
          title: "¡Satisfactorio!",
          text: "Recurso añadido satisfactoriamente a tus favoritos",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo añadir el recurso a favoritos",
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al guardar la tarjeta:", error);
    }
  }, [data, imagen, parentInfo, dispatch]);
  

  const handleCardDelete = useCallback(() => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar este item de tu lista?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.palette.secondary.dark,
      cancelButtonColor: theme.palette.error.main,
      confirmButtonText: "Sí, Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFavorite(id))

        Swal.fire("Limpiado!", "Has borrado este item", "success");
      }
    });
  }, [data]);

  return (
    <Card
      sx={{
        display: "flex",
        padding: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5f5",
          transform: "scale(1.02)",
          transition: "all 0.3s ease",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: "contain" }}
        image={imagen}
        alt={titulo || "Recurso"}
        onClick={handleCardClick}
      />

      <CardContent sx={{ flex: 1, p: "0px 0px 0px 10px" }}>
        <Grid container>
          <Grid item xs={11} onClick={handleCardClick}>
            {Object.entries(dataFields)
              .filter(([key]) => key.toLowerCase() !== "catalogimage") // Excluir el campo "Link"
              .map(([key, value], index) => (
                <Typography key={index} variant="body2" color="textSecondary">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </Typography>
              ))}
          </Grid>

          <Grid item xs={1} display="flex" justifyContent="flex-end">
            <IconButton
              onClick={isFavoritesPath ? handleCardDelete : handleCardSave}
              sx={{ height: "40px" }}
            >
              {isFavoritesPath ? <DeleteIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default React.memo(ResourceCard);

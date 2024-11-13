import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { selectUnivCatalogs } from "@store/universities/selectors";
import { useEffect } from "react";
import { fetchunivCatalogs } from "@store/universities/actions";
import { disableCatalog } from "@store/universities/reducers";
import RefreshIcon from "@mui/icons-material/Refresh";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const InstitutionsList = () => {
  const dispatch = useDispatch();
  const { univCatalogs: catalogs, status } = useSelector(selectUnivCatalogs);

  useEffect(() => {
    if (status !== "succeeded") {
      dispatch(fetchunivCatalogs());
    }
  }, [dispatch]);

  const handleDelete = (institution) => {
    console.log("Deleting: ", institution.nombre);
    dispatch(disableCatalog(institution.nombre));
  };

  const activeInstitutions = catalogs.filter(
    (institution) => institution.status
  );

  const handleRefresh = () => {
    dispatch(fetchunivCatalogs());
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "center", flexGrow: 1 }}
        >
          Instituciones asociadas
        </Typography>
        <IconButton
          onClick={handleRefresh}
          sx={{
            position: "absolute",
            right: 0,
            color: "text.secondary",
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {activeInstitutions.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No hay catálogos disponibles.
          </Typography>
        ) : (
          activeInstitutions.map((institution, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                width: "100%",
                maxWidth: {xs: 300, lg: 350},
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
                paddingInline: 2,
                cursor: "pointer",
                zIndex: 2
              }}
              onClick={() => window.open(institution.urlCatalogo, "_blank")}
            >
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100, objectFit: "contain" }}
                image={institution.imagen}
                alt={institution.large_name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography>
                  {institution.large_name}
                </Typography>
              </CardContent>
              <IconButton
                aria-label="delete"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(institution);
                }}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 5,
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </Card>

          ))
        )}
      </Box>
    </Box>
  );
};

export default InstitutionsList;

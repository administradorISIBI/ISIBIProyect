import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUnivCatalogs } from "@store/universities/selectors";
import {
  Paper,
  Typography,
  List,
  Divider,
  Box,
  Button,
  TextField,
  CardMedia,
  Pagination
} from "@mui/material";
import ResourceCard from "../resourceCard/ResourceCard";
import { useTheme } from "@mui/material/styles";
import { selectResults } from "@store/results/selectors";
import { setSelectedCatalog } from "@store/results/reducers";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const SearchResults = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { univCatalogs } = useSelector(selectUnivCatalogs);
  const [institutions, setInstitutions] = useState([]);
  const [numRecursos, setNumRecursos] = useState(2);
  const { catalogSelected } = useSelector(selectResults);
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 5;

  useEffect(() => {
    if (!catalogSelected) {
      const universities = univCatalogs.filter((univ) => univ.status === true);
      setInstitutions(universities);
    }
  }, [univCatalogs]);

  const validateNumber = (value) => {
    const numericValue = Number(value);
    if (numericValue >= 1 && numericValue <= 100) {
      setNumRecursos(value);
    }
  };

  useEffect(() => {
    if (catalogSelected) {
      setInstitutions([catalogSelected]);
      setNumRecursos(20);
    } else {
      const universities = univCatalogs.filter((univ) => univ.status === true);
      setInstitutions(universities);
      setNumRecursos(2);
    }
    setCurrentPage(1);

  }, [catalogSelected]);

  const handleResetSelected = () => {
    dispatch(setSelectedCatalog(null));
  };

  const allLimitedResources = institutions.flatMap((catalog) => {
    const limitedResources = (catalog.foundResources || []).slice(0, numRecursos);
    return limitedResources.map((resource) => ({
      ...resource,
      parentInfo: catalog,
    }));
  });
  
  // Aplicar la paginación después de limitar los recursos por universidad
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = allLimitedResources.slice(indexOfFirstResource, indexOfLastResource);

  // Cambiar de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    scrollToTop();
  };

  return (
    <Paper sx={{ margin: "0 auto", marginTop: 0, width: "100%" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          padding: "8px",
          borderRadius: "4px 4px 0px 0px",
        }}
      >
        Recursos encontrados
      </Typography>
      {/* <Box sx={{
        display: 'flex',
        width: '100%',
        alignContent: 'center',
        justifyContent: "center",
        padding: '5px',
        textAlign: 'center',
      }}>
        {catalogSelected
          ? (<>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100, objectFit: "contain" }}
                image={catalogSelected.imagen}
                alt={catalogSelected.nombre || "Logo Universidad"}
              />
              <Box pl={2}>
                <Typography>{`Seleccionaste el catálogo de "${catalogSelected.large_name}"`} </Typography>
              </Box>
            </Box>
          </>)
          : ""}
      </Box> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: '0px 20px',
          border: '1px solid #ddd'
        }}
      >
        <Box>
          {catalogSelected && (
            <Button onClick={handleResetSelected}>Ver todos</Button>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: '10px'
          }}
        >
          <Typography sx={{ mr: "5px" }}>Cantidad de recursos:</Typography>
          <TextField
            sx={{ width: "80px" }}
            size="small"
            type="number"
            value={numRecursos}
            onChange={(e) => validateNumber(e.target.value)}
            placeholder="Número de recursos"
          />
        </Box>
      </Box>

      <List>
        {currentResources.map((resource, resIndex) => {
          const parentInfo = resource.parentInfo
          delete resource.parentInfo
          
          const imageSource = resource.imagen || parentInfo.imagen || "";
          return (
            <React.Fragment key={resIndex}>
              <ResourceCard
                data={resource}
                imagen={imageSource}
                url={resource.url}
                parentInfo={parentInfo}
              />
              <Divider component="li" sx={{ marginY: 2 }} />
            </React.Fragment>
          );
        })}
      </List>

      <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <Pagination
          count={Math.ceil(institutions.flatMap((catalog) => catalog.foundResources || []).length / resourcesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Paper>
  );
};

export default SearchResults;

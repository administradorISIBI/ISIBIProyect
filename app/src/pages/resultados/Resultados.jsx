import { Box, Grid2, IconButton, Typography } from "@mui/material";
import CatalogListResult from "@components/catalogListResult/CatalogListResult";
import SearchResults from "@components/searchResults/SearchResults";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectResults } from "@store/results/selectors";
import { useEffect } from "react";
import { setSearching } from "../../store/results/reducers";

const Resultados = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { searchParam, searching } = useSelector(selectResults);

  useEffect(() => {
    if (!searching) {
      window.history.back()
    }
  }, [searching])


  const handleReturn = () => {
    dispatch(setSearching(false))
    window.history.back()
    // navigate(-1);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box>
          <IconButton onClick={handleReturn}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box sx={{ padding: "10px" }}>
          <Typography variant="h6">
            Parámetro de búsqueda: {searchParam}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Grid2 container spacing={2} sx={{ height: "100%" }}>
          <Grid2
            size={{ xs: 12, sm: 12, md: 4 }}
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              minHeight: "100%",
            }}
          >
            <CatalogListResult />
          </Grid2>
          <Grid2
            size={{ xs: 12, sm: 12, md: 8 }}
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              minHeight: "100%",
            }}
          >
            <SearchResults />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Resultados;

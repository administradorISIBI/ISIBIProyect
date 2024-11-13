import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUnivCatalogs } from "@store/universities/selectors";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  CircularProgress,
  Box,
} from "@mui/material";
import { setSelectedCatalog } from "@store/results/reducers";
import { useTheme } from "@mui/material/styles";

const CatalogListResult = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { univCatalogs } = useSelector(selectUnivCatalogs);
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const universities = univCatalogs.filter((univ) => univ.status === true);
    setInstitutions(universities);
  }, [univCatalogs]);
  const handleClickCatalog = (catalogo) => {
    dispatch(setSelectedCatalog(catalogo));
  };
  return (
    <Paper sx={{ margin: "0 auto", marginTop: 0 }}>
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
          Lista de resultados por catálogo
        </Typography>
        <List>
          {institutions?.map((catalogo, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "all 0.3s ease",
                  },
                }}
                onClick={() => handleClickCatalog(catalogo)}
              >
                <Box sx={{ marginRight: "10px" }}>
                  <Typography variant="body1">{catalogo.large_name}</Typography>
                </Box>
                <Box>
                  {catalogo.loading ? (
                    <CircularProgress size="15px" />
                  ) : (
                    `(${catalogo.totalFound})`
                  )}
                </Box>
              </ListItem>
              {index < institutions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
    </Paper>
  );
};

export default CatalogListResult;

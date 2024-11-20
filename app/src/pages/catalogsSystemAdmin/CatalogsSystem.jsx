import { MainPageLayout } from "@layouts/MainPage-Layout";

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "@components/page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useFilterData from "@hooks/useFilterData";
import ChangeStatus from "@components/utils/ChangeStatus";
import { Box, Button, CardMedia, Paper } from "@mui/material";

import { Link } from "react-router-dom";
import TableHeader from "./TableHeader";
import { fetchCatalogSystems } from "@store/catalogsSystems/actions";
import { selectCatalogSystems } from "../../store/catalogsSystems/selectors";
import { useTheme } from "@mui/material/styles";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DynamicForm from "./DinamicForm";

const renderDynamicContent = (data, level = 1) => {
  if (typeof data === "object" && !Array.isArray(data)) {
    return Object.entries(data).map(([key, value]) => (
      <Box key={key} sx={{ marginBottom: 1, marginLeft: level * 2 }}>
        {typeof value === "string" ? (
          <Typography sx={{ fontWeight: 'bold', display: 'inline', whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {key}:
          </Typography>
        ) : (
          <Typography sx={{ fontWeight: 'bold', display: 'block' }}>{key}:</Typography>
        )}
        {renderDynamicContent(value, level + 1)}
      </Box>
    ));
  } else if (Array.isArray(data)) {
    return data.map((item, index) => (
      <Box key={index} sx={{ marginBottom: 1, marginLeft: level * 2 }}>
        {renderDynamicContent(item, level + 1)}
      </Box>
    ));
  } else {
    return (
      <Typography sx={{ display: 'inline', whiteSpace: 'normal', wordWrap: 'break-word' }}>
        {String(data)}
      </Typography>
    );
  }
};



const CatalogsSystem = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { value, setValue, setAllData } = useFilterData([]);
  const [catalogsystemsStatus, setcatalogsystemsStatus] = useState({});
  // const { catalogsystems, loading } = useSelector(selectCatalogsystems);
  const { catalogsystems, loading } = useSelector(selectCatalogSystems);
  const [searchName, setSearchName] = useState('');

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  // Calcular los datos paginados
  const paginatedData = catalogsystems.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  useEffect(() => {
    if (Object.keys(catalogsystems).length === 0) {
    //console.log("no hay catalogsystems");
      dispatch(fetchCatalogSystems());
    }
    setAllData(catalogsystems);
  }, [dispatch, setAllData]);

  useEffect(() => {
    const statuses = catalogsystems.reduce((acc, catalogsystem) => {
      acc[catalogsystem.nombre] = catalogsystem.status;
      return acc;
    }, {});
    setcatalogsystemsStatus(statuses);
  //console.log(statuses);
  }, [catalogsystems]);



  const handleFilter = (searchTerm) => {
    setSearchName(searchTerm);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const handlePaginationReset = () => setPaginationModel({ page: 0, pageSize: 10 });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant="h5">Sistemas de catálogos asociados</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <TableHeader value={searchName} handleFilter={handleFilter} paginationReset={handlePaginationReset} />
          <Box padding={2}>
            {loading ? (
              <Typography>Cargando...</Typography>
            ) : (
              paginatedData.map((catalog, index) => (
                <Paper key={index} sx={{ marginBottom: 2}}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      padding:'5px',
                      backgroundColor: theme.palette.primary.main,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        color: "white",
                        padding: "8px",
                        borderRadius: "4px",
                        textAlign: 'center',
                        textTransform: 'uppercase'
                      }}
                    >
                      {catalog.nombre}
                    </Typography>
                    {/* <Button
                      // onClick={handleRefresh}
                      sx={{
                        position: "absolute",
                        right: 0,
                        color: "text.secondary",
                        
                      }}
                    >
                      <ModeEditOutlinedIcon sx={{fontSize: "25px"}}/>
                    </Button> */}
                  </Box>
                  {renderDynamicContent(catalog)}
                </Paper>
              ))
            )}
          </Box>
        </Paper>
      </Grid>
      {/* <DynamicForm data={paginatedData[0]}/> */}
    </Grid>
  );
};

export default CatalogsSystem;

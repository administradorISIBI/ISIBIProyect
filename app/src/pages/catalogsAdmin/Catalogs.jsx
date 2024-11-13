
// ** MUI Imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "@components/page-header/PageHeader";
import { selectUnivCatalogs } from "@store/universities/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useFilterData from "@hooks/useFilterData";
import ChangeStatus from "@components/utils/ChangeStatus";
import { Box, Button, CardMedia, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {
  fetchunivCatalogs,
  updateunivCatalog,
} from "@store/universities/actions";
import { Link, useNavigate } from "react-router-dom";
import TableHeader from "./TableHeader";

const defaultColumns = [
  {
    flex: 0.1,
    minWidth: 250,
    field: "imagen",
    headerName: "imagen",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CardMedia
          component="img"
          sx={{ width: 150, height: 50, objectFit: "contain" }}
          image={row.imagen}
        />
      </Box>
    ),
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: "nombre",
    headerName: "Nombre corto",
    renderCell: ({ row }) => <Typography>{row.nombre}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 350,
    field: "nombrelargo",
    headerName: "Nombre Completo",
    renderCell: ({ row }) => <Typography>{row.large_name}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: "syscatalog",
    headerName: "Sistema de catalogo",
    renderCell: ({ row }) => <Typography>{row.catalog_system}</Typography>,
  },
];

const Catalogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { value, setValue, setAllData } = useFilterData([]);
  const [univCatalogsStatus, setunivCatalogsStatus] = useState({});
  const { univCatalogs, loading } = useSelector(selectUnivCatalogs);
  const [searchName, setSearchName] = useState('');

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  // Calcular los datos paginados
  const paginatedData = univCatalogs.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  useEffect(() => {
    if (Object.keys(univCatalogs).length === 0) {
      console.log("no hay univCatalogs");
      dispatch(fetchunivCatalogs());
    }
    setAllData(univCatalogs);
  }, [univCatalogs, setAllData]);

  useEffect(() => {
    const statuses = univCatalogs.reduce((acc, univCatalog) => {
      acc[univCatalog.nombre] = univCatalog.status;
      return acc;
    }, {});
    setunivCatalogsStatus(statuses);
    console.log(statuses);
  }, [univCatalogs]);

  const handleStatusChange = (id, event) => {
    const isActive = event.target.checked;
    console.log(isActive);
    console.log(id);

    // dispatch(updateFoodType({ id, status }))
    //   .unwrap()
    //   .then((payload) => {
    //     setFoodTypeStatus((prevStatuses) => ({ ...prevStatuses, [id]: payload.status }));
    //   });
    dispatch(updateunivCatalog({ id, body: { status: isActive } }));
  };

  const handleUrlClick = (url) => {
    window.open(url, "_blank");
  };

  const handleFilter = (searchTerm) => {
    setSearchName(searchTerm);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const handleEditar = (nombre) => {
    navigate(`/catalogos/form/${nombre}`);  
  }
  const handlePaginationReset = () => setPaginationModel({ page: 0, pageSize: 10 });

  const switchColumn = {
    flex: 0.1,
    minWidth: 75,
    field: "switch",
    headerName: "Estado",
    renderCell: ({ row }) => (
      <ChangeStatus
        checked={univCatalogsStatus[row.nombre]}
        onChange={(event) => handleStatusChange(row.nombre, event)}
      />
    ),
  };

  const linkColumn = {
    flex: 0.1,
    minWidth: 160,
    field: "link",
    headerName: "Link",
    renderCell: ({ row }) => (
      <Link onClick={() => handleUrlClick(row.url)}>{row.url}</Link>
    ),
  };

  const accionColumn = {
    flex: 0.1,
    minWidth: 160,
    field: "action",
    headerName: "Acción",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => handleEditar(row.nombre)} startIcon={<EditIcon/>}></Button>
      </Box>
    ),
  };

  const columns = [switchColumn, ...defaultColumns, linkColumn, accionColumn];

  return (
    <>
      <Grid container >
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant="h5">Catálogos asociados</Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <TableHeader value={searchName} handleFilter={handleFilter} paginationReset={handlePaginationReset} />
            {univCatalogs && (
              <DataGrid
                autoHeight
                rows={paginatedData}
                columns={columns}
                getRowId={(row) => row.nombre}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 15, 50]}
                paginationMode="server"
                rowCount={univCatalogs.length}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                loading={loading}
                sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Catalogs;

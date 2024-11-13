
// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "@components/page-header/PageHeader";
import { selectSearchs } from "@store/searchs/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useFilterData from "@hooks/useFilterData";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Paper} from "@mui/material";
import TableHeader from "./TableHeader";
import { deleteSearch, fetchSearchs } from "@store/searchs/actions";
//saludos
const defaultColumns = [
  {
    flex: 0.2,
    minWidth: 300,
    field: "searchname",
    headerName: "Parámetro de Búsqueda",
    renderCell: ({ row }) => (
      <Typography  variant="centered">
        {row.params?.searchParam?.join(" ")}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: "type",
    headerName: "Tipo",
    renderCell: ({ row }) => (
      <Typography  variant="centered">
        {row.advanced ? "Avanzada": "Básica" }
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: "sortOrder",
    headerName: "Orden",
    renderCell: ({ row }) => (
      <Typography variant="centered">{row.params?.sortOrder || "-"}</Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: "format",
    headerName: "Formato",
    renderCell: ({ row }) => (
      <Typography  variant="centered">{row.params?.format || "-"}</Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "language",
    headerName: "Idioma",
    renderCell: ({ row }) => (
      <Typography  variant="centered">{row.params?.language || "-"}</Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: "dateCreated",
    headerName: "Fecha de Creación",
    renderCell: ({ row }) => (
      <Typography  variant="centered">
        {new Date(row.dateCreated).toLocaleDateString("es-ES")}
      </Typography>
    ),
  },
];

const HistorialPage = () => {
  const dispatch = useDispatch();
  const { value, setValue, setAllData } = useFilterData([]);
  const { searchs, loading } = useSelector(selectSearchs);
  const [searchName, setSearchName] = useState('');

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Calcular los datos paginados
  const paginatedData = searchs.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      dispatch(fetchSearchs(email));
      setAllData(searchs);
    }
  }, [dispatch, setAllData]);

  const handleDelete = (id) => {
    dispatch(deleteSearch(id))
  }

  const handleFilter = (searchTerm) => {
    setSearchName(searchTerm);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const handlePaginationReset = () => setPaginationModel({ page: 0, pageSize: 10 });

  const accionColumn = {
    flex: 0.1,
    minWidth: 160,
    field: "action",
    headerName: "Acción",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
        <Button
        // onClick={() => handleSearch()}
        >Re-Buscar</Button>
        <IconButton
          onClick={() => handleDelete(row._id)}
          sx={{
            // color: 'secondary.dark', 
            cursor: 'pointer'
          }}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Box>
    ),
  };

  const columns = [...defaultColumns, accionColumn];

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Historial de Búsqueda</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <TableHeader value={searchName} handleFilter={handleFilter} paginationReset={handlePaginationReset} />
            {searchs && (
              <DataGrid
                autoHeight
                rows={paginatedData}
                columns={columns}
                getRowId={(row) => row.dateCreated}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 15, 50]}
                paginationMode="server"
                rowCount={searchs.length} // Establecer el número total de filas
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

export default HistorialPage;

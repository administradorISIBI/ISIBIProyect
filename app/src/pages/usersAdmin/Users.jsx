
// ** MUI Imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "@components/page-header/PageHeader";
import { selectUsers } from "@store/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useFilterData from "@hooks/useFilterData";
import ChangeStatus from "@components/utils/ChangeStatus";
import { Box, Button, Paper } from "@mui/material";
import { fetchUsers, updateUsers } from "@store/users/actions";
import TableHeader from "./TableHeader";

const defaultColumns = [
  {
    flex: 0.1,
    minWidth: 200,
    field: "username",
    headerName: "Nombre de usuario",
    renderCell: ({ row }) => <Typography>{row.username}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 350,
    field: "email",
    headerName: "Correo Electrónico",
    renderCell: ({ row }) => <Typography>{row.email}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: "role",
    headerName: "Rol",
    renderCell: ({ row }) => <Typography>{row.role}</Typography>,
  },
];

const Users = () => {
  const dispatch = useDispatch();
  const { value, setValue, setAllData } = useFilterData([]);
  const [usersStatus, setUsersStatus] = useState({});
  const { users, loading } = useSelector(selectUsers);
  const [searchName, setSearchName] = useState('');

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Calcular los datos paginados
  const paginatedData = users.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  useEffect(() => {
    dispatch(fetchUsers());
    setAllData(users);
  }, [dispatch,setAllData]);

  useEffect(() => {
    const statuses = users.reduce((acc, User) => {
      acc[User.username] = User.status;
      return acc;
    }, {});
    setUsersStatus(statuses);
    console.log(statuses);
  }, [users]);

  const handleStatusChange = (id, event) => {
    const isActive = event.target.checked;
    console.log(isActive);
    console.log(id);

    // dispatch(updateFoodType({ id, status }))
    //   .unwrap()
    //   .then((payload) => {
    //     setFoodTypeStatus((prevStatuses) => ({ ...prevStatuses, [id]: payload.status }));
    //   });
    dispatch(updateUsers({ id, body: { status: isActive } }));
  };

  const handleFilter = (searchTerm) => {
    setSearchName(searchTerm);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const handlePaginationReset = () => setPaginationModel({ page: 0, pageSize: 10 });

  const switchColumn = {
    flex: 0.1,
    minWidth: 75,
    field: "switch",
    headerName: "Estado",
    renderCell: ({ row }) => (
      <ChangeStatus
        checked={usersStatus[row.nombre]}
        onChange={(event) => handleStatusChange(row.nombre, event)}
      />
    ),
  };

  const accionColumn = {
    flex: 0.1,
    minWidth: 160,
    field: "action",
    headerName: "Acción",
    renderCell: () => (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button>Editar</Button>
      </Box>
    ),
  };

  const columns = [switchColumn, ...defaultColumns, accionColumn];

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Usuarios registrados</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper>
          <TableHeader value={searchName} handleFilter={handleFilter} paginationReset={handlePaginationReset} />
            {users && (
              <DataGrid
                autoHeight
                rows={paginatedData} 
                columns={columns}
                getRowId={(row) => row.username}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 15, 50]}
                paginationMode="server"
                rowCount={users.length} // Establecer el número total de filas
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

export default Users;

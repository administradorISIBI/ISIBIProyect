// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { deleteAllSearch } from "@store/searchs/actions";

const TableHeader = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // ** Props
  const { value, handleFilter, paginationReset } = props;

  const [searchTerm, setSearchTerm] = useState("");
  // ** State
  const [open, setOpen] = useState(false);

  // ** Function to handle the search submission
  const handleSearch = () => {
    handleFilter(searchTerm);
  };

  const handleDeleteAll = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar todo tu historial de búsqueda?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.palette.secondary.dark,
      cancelButtonColor: theme.palette.error.main,
      confirmButtonText: "Sí, Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const email = sessionStorage.getItem('email')
        dispatch(deleteAllSearch(email));
        Swal.fire("Limpiado!", "Has borrado tu historial", "success");
      }
    });
  }

  const clearSearch = () => {
    setSearchTerm("");
    handleFilter("");
  };

  return (
    <>
      <Box
        sx={{
          p: 3,
          pb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" onClick={handleDeleteAll}>
          Borrar todos
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            sx={{ mr: 2 }}
            InputProps={{
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={clearSearch} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Buscar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TableHeader;

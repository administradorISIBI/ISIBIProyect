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
import { useDispatch } from "react-redux";
import { setAllCatalogs } from "@store/universities/actions";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TableHeader = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ** Props
  const { value, handleFilter, paginationReset } = props;

  const [searchTerm, setSearchTerm] = useState("");

  // ** State

  // ** Function to handle the search submission
  const handleSearch = () => {
    handleFilter(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
    handleFilter("");
  };

  const handleDesactivar = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres desactivar todos los catálogos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.palette.secondary.dark,
      cancelButtonColor: theme.palette.error.main,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setAllCatalogs(false));
        Swal.fire(
          "Desactivados!",
          "Has desactivado todos los catálogos",
          "success"
        );
      }
    });
  };
  const handleActivar = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres activar todos los catálogos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.palette.secondary.dark,
      cancelButtonColor: theme.palette.error.main,
      confirmButtonText: "Sí, activar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setAllCatalogs(true));
        Swal.fire("Activados!", "Has activado todos los catálogos", "success");
      }
    });
  };

  const handleGoToCreate = () => {
    navigate("/catalogos/form")
  }

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={handleDesactivar} startIcon={<BlockIcon />}>
            Desactivar todos
          </Button>
          <Button variant="contained" onClick={handleActivar} startIcon={<CheckCircleIcon />}>
            Activar todos
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <TextField
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
          </Button> */}
          <Button variant="contained" onClick={handleGoToCreate} startIcon={<LibraryAddIcon />}>
            Agregar un nuevo catálogo
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TableHeader;

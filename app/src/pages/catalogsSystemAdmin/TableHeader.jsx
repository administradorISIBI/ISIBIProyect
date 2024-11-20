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

const TableHeader = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
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

  // const handleNew = () =>{
  // //console.log("handle new")
  // }

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
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={handleNew}>
            Agregar un Sistema de catálogos nuevo
          </Button>
        </Box> */}
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
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
        </Box> */}
      </Box>
    </>
  );
};

export default TableHeader;

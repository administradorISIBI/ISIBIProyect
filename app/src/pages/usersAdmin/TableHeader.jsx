// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const TableHeader = (props) => {
  // ** Props
  const { value, handleFilter, paginationReset } = props;

  const [searchTerm, setSearchTerm] = useState("");
  // ** State
  const [open, setOpen] = useState(false);
  const handleDialogToggle = () => setOpen(!open);

  // ** Function to handle the search submission
  const handleSearch = () => {
    handleFilter(searchTerm);
  };

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
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={handleDialogToggle}>
            Desactivar todos
          </Button>
          <Button variant="contained" onClick={handleDialogToggle}>
            Activar todos
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

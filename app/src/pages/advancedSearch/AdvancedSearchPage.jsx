import { Box, Button, Paper, TextField, MenuItem, IconButton, Typography, Tooltip, Divider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectResults } from "@store/results/selectors";
import InstitutionsList from "@components/catalogList/InstitutionList";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { searchAdvanced } from "../../store/universities/actions";
import { setSearching, setSearchParamsState } from "../../store/results/reducers";

export const AdvancedSearchPage = () => {
  const dispatch = useDispatch();
  const { searchParam, searching } = useSelector(selectResults);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState([{ value: "" }]);
  const [errorField, setErrorField] = useState(false);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [format, setFormat] = useState("articulo");
  const [language, setLanguage] = useState("espanol");
  const [dateRange, setDateRange] = useState({ start: "", end: "2024" });

  useEffect(() => {
    setSearchParams([{ value: searchParam }]);
  }, [searchParam]);

  const handleSearch = () => {
    if (searchParams.some(param => param.value === "")) {
      setErrorField(true);
      return;
    }
    const searchParamBody = []
    for (const param of searchParams) {
      if (param.condition) {
        searchParamBody.push(param.condition)
      }
      if (param.value) {
        searchParamBody.push(param.value)
      }
    }
    const params = {}

    params.searchParam = searchParamBody
    params.sortOrder = sortOrder
    params.format = format
    params.language = language
    params.dateRange = dateRange

    const bodyRequest = {}
    bodyRequest.advanced = true
    bodyRequest.params = params

    const concatenatedString = searchParams
    .map((item, index) => {
      if (index > 0 && item.condition) {
        return `${item.condition} ${item.value}`.trim();
      }
      return item.value;
    })
    .filter(Boolean) 
    .join(" ");     

    dispatch(searchAdvanced(bodyRequest))
    dispatch(setSearching(true))
    console.log(searchParams)
    console.log(concatenatedString)
    dispatch(setSearchParamsState(concatenatedString))

    navigate("/resultados")

  };

  const addSearchField = () => {
    setSearchParams([...searchParams, { condition: "AND", value: "" }]);
  };

  const removeSearchField = (index) => {
    setSearchParams(searchParams.filter((_, i) => i !== index));
  };

  const handleSearchParamChange = (index, key, value) => {
    const newSearchParams = [...searchParams];
    newSearchParams[index][key] = value;
    setSearchParams(newSearchParams);
  };

  const handleGoToResults = () => {
    navigate("/resultados");
  }

  return (
    <Paper sx={{ m: "10px", p: "20px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Búsqueda avanzada</Typography>
        <Tooltip
          title={
            <span>
              Aquí puedes realizar una búsqueda detallada seleccionando varios criterios.
              <br />
              Únicamente está habilitada la búsqueda vanzada para el sistema de catálogo KOHA
            </span>
          }
        >
          <IconButton size="small" >
            <HelpOutlineIcon sx={{ fontSize: '25px', }} />
          </IconButton>
        </Tooltip>
      </Box>


      {/* Campos de búsqueda dinámica */}
      {searchParams.map((param, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {index > 0 && (
            <TextField
              select
              value={param.condition}
              onChange={(e) => handleSearchParamChange(index, "condition", e.target.value)}
              sx={{ width: "80px", mr: 1 }}
            >
              <MenuItem value="AND">Y</MenuItem>
              <MenuItem value="OR">O</MenuItem>
            </TextField>
          )}
          <TextField
            label="Palabra clave"
            variant="outlined"
            sx={{ flexGrow: 1, mr: 1 }}
            value={param.value}
            onChange={(e) => handleSearchParamChange(index, "value", e.target.value)}
            error={errorField && param.value === ""}
          />
          <IconButton onClick={() => addSearchField()}>
            <AddIcon />
          </IconButton>
          {index > 0 && (
            <IconButton onClick={() => removeSearchField(index)}>
              <RemoveIcon />
            </IconButton>
          )}
        </Box>
      ))}

      {/* Campos adicionales independientes */}
      <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap", justifyContent: 'center' }}>
        <TextField
          select
          label="Ordenar por"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          sx={{ minWidth: "150px" }}
        >
          <MenuItem value="relevance">Relevancia</MenuItem>
          <Divider />
          <MenuItem value="popularity_asc">{"Popularidad (mayor a menor)"} </MenuItem>
          <MenuItem value="popularity_dsc">{"Popularidad (menor a mayor)"} </MenuItem>
          <Divider />
          <MenuItem value="author_az">{"Autor (A-Z)"}</MenuItem>
          <MenuItem value="author_za">{"Autor (Z-A)"}</MenuItem>
          <Divider />
          <MenuItem value="title_az">{"Título (A-Z)"}</MenuItem>
          <MenuItem value="title_za">{"Título (Z-A)"}</MenuItem>
        </TextField>

        <TextField
          select
          label="Tipos de contenido"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          sx={{ minWidth: "150px" }}
        >
          <MenuItem value="libro">Libro</MenuItem>
          <MenuItem value="articulo">Artículo</MenuItem>
          <MenuItem value="tesis">Tesis</MenuItem>
        </TextField>

        <TextField
          select
          label="Idioma"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          sx={{ minWidth: "150px" }}
        >
          <MenuItem value="espanol">Español</MenuItem>
          <MenuItem value="ingles">Inglés</MenuItem>
        </TextField>
      </Box>

      {/* Campo de rango de fecha */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', gap: 2, mt: 5 }}>
        <TextField
          label="Año desde"
          type="number"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: 0, max: 9999 }}
          placeholder="Ej. 2000"
          sx={{ width: '125px' }}
          value={dateRange.start}
          onChange={(e) => {
            const year = e.target.value;
            if (year >= 0 && year <= 9999) {
              setDateRange({ ...dateRange, start: year });
            }
          }}
        />
        -
        <TextField
          label="Año hasta"
          type="number"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: 0, max: 9999 }}
          placeholder="Ej. 2023"
          sx={{ width: '125px' }}
          value={dateRange.end}
          onChange={(e) => {
            const year = e.target.value;
            if (year >= 0 && year <= 9999) {
              setDateRange({ ...dateRange, end: year });
            }
          }}
        />
      </Box>

      {/* Botones de acción */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button onClick={() => {
          setSearchParams([{ condition: "y", value: "" }]);
          setSortOrder("");
          setFormat("");
          setLanguage("");
          setDateRange({ start: "", end: "" });
        }}
          sx={{ width: '200px' }}
        >
          Nueva búsqueda
        </Button>
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ width: '200px' }}>
          Buscar
        </Button>
      </Box>
      {
        searching ?
          <Button onClick={handleGoToResults}>Ir a resultados</Button>
          :
          null
      }
      <InstitutionsList />
    </Paper>
  );
};

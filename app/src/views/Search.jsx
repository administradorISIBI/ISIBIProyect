import { Box, Button, Paper, TextField } from "@mui/material";
import InstitutionsList from "@components/catalogList/InstitutionList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { search } from "@store/universities/actions";
import { useNavigate } from "react-router-dom";
import { setSearchParamsState } from "@store/results/reducers";
import { selectResults } from "@store/results/selectors";
import { setSearching } from "@store/results/reducers";

export const Search = () => {
  const dispatch = useDispatch();
  const { searchParam, searching } = useSelector(selectResults)

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState("");
  const [errorField, setErrorField] = useState(false);

  useEffect(() => {
    setSearchParams(searchParam)
  }, [searchParam])


  const handleSearch = () => {
    if (searchParams.length == 0) {
      setErrorField(true);
      return;
    }
    const params = {}
    params.searchParam = [searchParams]

    const searchBody = {}
    searchBody.advanced = false
    searchBody.params = params
    dispatch(setSearchParamsState(searchParams))
    dispatch(search(searchBody));
    dispatch(setSearching(true))
    navigate("/resultados");
  };

  const handleGoToResults = () => {
    navigate("/resultados");
  }
  return (
    <Paper
      sx={{
        m: "10px",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: "20px", display: "flex" }}>
        <TextField
          error={errorField}
          id="standard-search"
          label="Término de búsqueda"
          type="search"
          variant="standard"
          sx={{ width: "100%" }}
          value={searchParams}
          onChange={(e) => {
            setSearchParams(e.target.value);
          }}

        />
        
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%"}}>
          <Button onClick={handleSearch}>Buscar</Button>
          {
            searching ?
              <Button variant="tertiary" onClick={handleGoToResults}>Ir a resultados</Button>
              :
              null
          }
        </Box>
      <InstitutionsList />
    </Paper>
  );
};

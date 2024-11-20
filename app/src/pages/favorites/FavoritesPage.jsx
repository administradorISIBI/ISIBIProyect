import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "@components/page-header/PageHeader";
import { Box, CircularProgress, Divider, Pagination, TextField } from "@mui/material";
import ResourceCard from "@components/resourceCard/ResourceCard";
import { selectFavorites } from "@store/favorites/selectors";
import { fetchFavorites } from "@store/favorites/actions";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favorites, loading } = useSelector(selectFavorites);
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const mail = sessionStorage.getItem('email')
    dispatch(fetchFavorites(mail));
  }, [dispatch]);

  const handleFilter = (event) => {
    setSearchName(event.target.value);
    setPage(1);
  };

  const filteredFavorites = useMemo(() => {
    if (!searchName) return favorites;
    return favorites.filter((favorite) => {
      const { Titulo, Autor } = favorite.resource;
      const { nombre, large_name } = favorite;

      // Lista de campos que se incluirán en la búsqueda
      const campos = [
        Titulo,
        Autor,
        nombre,
        large_name,
      ];

      return campos.some((campo) =>
        campo?.toLowerCase().includes(searchName.toLowerCase())
      );
    });
  }, [favorites, searchName]);

  const paginatedFavorites = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredFavorites.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFavorites, page]);

  const handleChangePage = (event, value) => {
    setPage(value);
    scrollToTop();
  };



  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PageHeader title={<Typography variant="h5">Favoritos</Typography>} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Buscar favoritos"
            value={searchName}
            onChange={handleFilter}
          />
        </Grid>

        <Grid item xs={12}>
          {/* {!loading ? ( */}
          {
            paginatedFavorites.length > 0 ? (
              paginatedFavorites.map((favorite) => (
                <Fragment key={favorite._id}>
                  <ResourceCard
                    data={favorite.resource}
                    imagen={favorite.imagen || null}
                    parentInfo={{
                      nombre: favorite.nombre,
                      large_name: favorite.large_name,
                    }}
                    id={favorite._id}
                  />
                  <Divider sx={{ marginY: 2 }} />
                </Fragment>
              ))
            ) : (
              <p>No hay elementos favoritos para mostrar.</p>
            )
          }
          {/* ) : (
            <Box sx={{display:'flex', justifyContent:'center', margin:'30px'}}>
              <CircularProgress />
            </Box>
          )} */}

        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(filteredFavorites.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FavoritesPage;

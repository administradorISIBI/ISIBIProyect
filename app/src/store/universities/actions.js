import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, put, patch } from "../apiInstance";
import { selectUnivCatalogNames, selectUnivCatalogs } from "./selectors";
import { loadSearch, resetLoading, setIsloading } from "./reducers";
import { resetSelected, setSearching } from "../results/reducers";

export const fetchunivCatalogs = createAsyncThunk(
  "catalogs/fetchUnivCatalogs",
  async (rejectWithValue) => {
    try {
      const response = await get(`/universities`, true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const search = createAsyncThunk(
  "catalogs/search",
  async (searchParams, { getState, rejectWithValue, dispatch }) => {
    try {
      //console.log(searchParams);
      resetSelected();
      const state = getState();
      const catalogs = selectUnivCatalogs(state)
        .univCatalogs.filter((univ) => univ.status === true)
        .map((univ) => univ.nombre);

      //console.log(catalogs);
      catalogs.forEach((catalog) => {
        dispatch(setIsloading(catalog));
      });

      const email = sessionStorage.getItem("email");
      if (email) {
        const catalogsObject = selectUnivCatalogs(state)
          .univCatalogs.filter((catalog) => catalog.status === true)
          .map((catalog) => ({
            large_name: catalog.large_name,
            url: catalog.url,
            nombre: catalog.nombre,
          }));
        const dataSearch = {
          email,
          catalogs: catalogsObject,
          params: searchParams.params,
          advanced: searchParams.advanced,
        };
        //console.log(dataSearch);
        await post(`/search`, dataSearch);
      }
      const responses = await Promise.all(
        catalogs.map(async (university) => {
          searchParams.catalog = university;
          try {
            const response = await post(`/search-and-crawl`, searchParams);
            dispatch(loadSearch(response.data));
            dispatch(resetLoading(university));
            return response.data;
          } catch (error) {
            console.error(error.response);
            dispatch(
              loadSearch({
                university,
                data: {
                  foundResources: [],
                  totalCount: 0,
                  universityName: university,
                },
              })
            );
            dispatch(resetLoading(university));
          }
        })
      );
    } catch (error) {
      dispatch(setSearching(false));
      return rejectWithValue(error.response);
    }
  }
);

export const searchAdvanced = createAsyncThunk(
  "catalogs/search",
  async (searchParams, { getState, rejectWithValue, dispatch }) => {
    try {
      //extracción del estado con los catálogos
      const state = getState();
      const catalogs = selectUnivCatalogs(state)
        .univCatalogs.filter((univ) => univ.status === true)
        .map((univ) => univ.nombre);

      // cambia el estado de cada catálogo a cargando
      catalogs.forEach((catalog) => {
        dispatch(setIsloading(catalog));
      });

      //si tiene sesión, se guarda el historial
      const email = sessionStorage.getItem("email");
      if (email) {
        const catalogsObject = selectUnivCatalogs(state)
          .univCatalogs.filter((catalog) => catalog.status === true)
          .map((catalog) => ({
            large_name: catalog.large_name,
            url: catalog.url,
            nombre: catalog.nombre,
          }));
        const dataSearch = {
          email,
          catalogs: catalogsObject,
          params: searchParams.params,
          advanced: searchParams.advanced,
        };
        //console.log(dataSearch);
        await post(`/search`, dataSearch);
      }

      //fin guardar historial
      const responses = await Promise.all(
        catalogs.map(async (university) => {
          searchParams.catalog = university;
          try {
            const response = await post(`/search-and-crawl`, searchParams);
            dispatch(loadSearch(response.data));
            dispatch(resetLoading(university));
            return response.data;
          } catch (error) {
            console.error(error.response);
            dispatch(
              loadSearch({
                university,
                data: {
                  foundResources: [],
                  totalCount: 0,
                  universityName: university,
                },
              })
            );
            dispatch(resetLoading(university));
          }
        })
      );
    } catch (error) {
      dispatch(setSearching(false));
      return rejectWithValue(error.response);
    }
  }
);

//estados -> patch
export const updateunivCatalog = createAsyncThunk(
  "users/updateunivCatalog",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const url = `/universities/${id}`;
      //console.log(body);
      const response = await patch(url, body);
      //console.log(response);
      if (response.status === 200) {
        //console.log(response);
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error("Error updating university catalog status:", error);

      return rejectWithValue(
        error.response?.data?.message || "Unknown error occurred"
      );
    }
  }
);

export const setAllCatalogs = createAsyncThunk(
  "users/setAllCatalogs",
  async (status, { getState, rejectWithValue }) => {
    try {
      const catalogIds = selectUnivCatalogNames(getState());
      // //console.log(catalogIds)
      const updatePromises = catalogIds.map(async (id) => {
        try {
          const url = `/universities/${id}`;
          const response = await patch(url, { status: status });
          if (response.status !== 200) {
            return rejectWithValue(`Failed to update catalog with ID: ${id}`);
          }
          return response.data;
        } catch (error) {
          console.error(`Error updating catalog with ID: ${id}`, error);
          return rejectWithValue(
            error.response?.data?.message || "Unknown error occurred"
          );
        }
      });

      const results = await Promise.all(updatePromises);
      //console.log(results);
      return results;
    } catch (error) {
      console.error("Error updating catalogs:", error);
      return rejectWithValue("An error occurred while updating catalogs");
    }
  }
);

export const createNewCatalog = createAsyncThunk(
  "users/createNewCatalog",
  async (body, { rejectWithValue }) => {
    try {
      const response = await post(`/universities`, body);

      return response.data;
    } catch (error) {
      console.error("Error creating catalogs:", error);
      return rejectWithValue("An error occurred while creating catalogs");
    }
  }
);

export const updateAllCatalog = createAsyncThunk(
  "users/updateAllCatalog",
  async ({ body, catalogName }, { rejectWithValue }) => {
    try {
      const response = await put(`/universities/${catalogName}`, body);

      return response.data;
    } catch (error) {
      console.error("Error updating catalogs:", error);
      return rejectWithValue("An error occurred while updating catalogs");
    }
  }
);

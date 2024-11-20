import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, put } from "../apiInstance";
import { logoutAction } from "../auth/actions";
import Swal from "sweetalert2";

const handleErrorResponse = (error, dispatch) => {
  if (error.response) {
    console.error("Error status:", error.response.status);
    if (error.response.status === 401) {
      Swal.fire(
        "Oh no",
        "Se ha vencido tu sesión, vuelve a iniciar sesión",
        "alert"
      );
      dispatch(logoutAction());
    }
    return {
      status: error.response.status,
      message: error.response.data || "An error occurred",
    };
  } else {
    console.error("Error:", error.message);
    return {
      status: null,
      message: error.message || "Network error",
    };
  }
};

export const fetchCatalogSystems = createAsyncThunk(
  "CatalogSystems/fetchCatalogSystems",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await get(`/catalogs-systems`);
    //console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error, dispatch));
    }
  }
);

//completar de aquí para abajo
export const createCatalogSystem = createAsyncThunk(
  "CatalogSystems/createCatalogSystem",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await post(`catalogsystem`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error, dispatch));
    }
  }
);

export const deleteCatalogSystem = createAsyncThunk(
  "CatalogSystems/deleteCatalogSystem",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await put(`catalogsystem/${id}`);
      if (response.data.success) {
        response.data.id = id;
        return response.data;
      }
      return rejectWithValue({
        status: response.data.status || null,
        message: response.data.message || "Delete failed",
      });
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error, dispatch));
    }
  }
);

export const deleteAllCatalogSystem = createAsyncThunk(
  "CatalogSystems/deleteAllCatalogSystem",
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const response = await put(`/catalogsystem/deleteall/${email}`);
      if (response.data.success) {
        dispatch(fetchCatalogSystems());
        return response.data;
      }
      return rejectWithValue({
        status: response.data.status || null,
        message: response.data.message || "Delete failed",
      });
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error, dispatch));
    }
  }
);

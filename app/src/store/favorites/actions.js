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

export const fetchFavorites = createAsyncThunk(
  "Favorites/fetchFavorites",
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const response = await get(`/favorite/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error, dispatch));
    }
  }
);

export const createFavorite = createAsyncThunk(
  "Favorites/createFavorite",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await post(`/favorite`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error, dispatch));
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "Favorites/deleteFavorite",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await put(`/favorite/${id}`);
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

export const deleteAllFavorite = createAsyncThunk(
  "Favorites/deleteAllFavorite",
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const response = await put(`/favorite/deleteall/${email}`);
      if (response.data.success) {
        dispatch(fetchFavorites());
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

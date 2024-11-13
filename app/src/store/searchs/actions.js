import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, put } from "../apiInstance";
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

export const fetchSearchs = createAsyncThunk(
  "Searchs/fetchSearchs",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await get(`/search/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error, dispatch));
    }
  }
);

export const deleteSearch = createAsyncThunk(
  "Searchs/deleteSearch",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await put(`/search/delete/${id}`);
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

export const deleteAllSearch = createAsyncThunk(
  "Searchs/deleteAllSearch",
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const response = await put(`/search/deleteall/${email}`);
      if (response.data.success) {
        dispatch(fetchSearchs());
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

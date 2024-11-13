import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, put, patch } from "../apiInstance";
import { logoutAction } from "../auth/actions";
import Swal from "sweetalert2";

export const fetchUsers = createAsyncThunk(
  "Users/fetchUsers",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await get(`/users`);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error status:", error.response.status);
        if (error.response.status == 401) {
          Swal.fire(
            "Oh no",
            "Se ha vencido tu sesión, vuelve a iniciar seisión",
            "alert"
          );
          dispatch(logoutAction());
        }
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data || "An error occurred",
        });
      } else {
        // Si no hay respuesta del servidor
        console.error("Error:", error.message);
        return rejectWithValue({
          status: null,
          message: error.message || "Network error",
        });
      }
    }
  }
);

export const updateUsers = createAsyncThunk(
  "users/updateUser",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const url = `/ersities/${id}`;
      console.log(body);
      const response = await patch(url, body);
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error("Error updating ersity User status:", error);

      return rejectWithValue(
        error.response?.data?.message || "Unknown error occurred"
      );
    }
  }
);

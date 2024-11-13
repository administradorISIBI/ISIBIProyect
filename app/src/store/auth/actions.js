// authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../apiInstance";

import { setLoading, logout } from "./reducers";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    // console.log(data);
    try {
      const response = await post("/login", data);
      const { success, token, email, username, rol, message } = response.data;
      // console.log(response.data);
      if (!success) {
        return rejectWithValue(message);
      }

      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("rol", rol);

      return { token, user: { email, username, rol }, message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Could not login.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "/logout",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    console.log("logout action");
    try {
      // await post('auth/logout');
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("rol");
      dispatch(setLoading(false));
      dispatch(logout());
    } catch (error) {
      dispatch(setLoading(false));
      let errorMessage = "Could not logout.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }
      throw error;
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    // console.log(data);
    try {
      const response = await post("/register", data);
      const { success, message } = response.data;
      // console.log(response.data);
      if (success) {
        // dispatch(createUser({ created: true, message }));
        return { created: true, message };
      } else {
        // dispatch(createUser({ created: false, message }));
        return rejectWithValue({ created: false, message });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Could not login.";
      return rejectWithValue({ created: false, errorMessage });
    }
  }
);

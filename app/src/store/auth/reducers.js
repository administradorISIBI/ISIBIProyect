import { createSlice } from "@reduxjs/toolkit";
import { state } from "./states";
import { createUser, login } from "./actions";

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.rol = "invitado";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.message = "idle";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.rol = action.payload.user.rol;
        state.message = action.payload.message;
        state.isAuthenticated = !!action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.token = null;
        state.user = null;
        state.status = "Failed";
        state.loading = false;
        state.success = false;
        state.isAuthenticated = false;
        state.message = action.payload;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.message = "idle";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.created = action.payload.created;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.created = action.payload.created;
        state.message = action.payload.message;
        state.loading = false;
      });
  },
});
export const { setLoading, setLoginFailure, setLoginSuccess, logout } =
  authSlice.actions;
export default authSlice.reducer;

// reducers.jsx
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, updateUsers } from "./actions";
import { state } from "./states";

const usersSlice = createSlice({
  name: "users",
  initialState: state,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.status = "succeeded";
        state.mensaje = action.payload.mensaje;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.mensaje = action.error.mensaje || "Could not fetch users.";
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        const updateUsers = action.payload;
        console.log(updateUsers)
        const index = state.users.findIndex(user => user.nombre === updateUsers.nombre);
        if (index !== -1) {
          state.users[index] = updateUsers;
        }
        state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(updateUsers.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.message = action.error?.message || 'Could not change catalog status.';
        state.loading = false;
        state.status = 'failed';
      });
  },
});
export const { disableCatalog, setIsloading, resetLoading, loadSearch } =
  usersSlice.actions;
export default usersSlice.reducer;

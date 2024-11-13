// reducers.jsx
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCatalogSystems,
  deleteCatalogSystem,
  deleteAllCatalogSystem,
  createCatalogSystem,
} from "./actions";
import { state } from "./states";

const catalogsystemsSlice = createSlice({
  name: "CatalogSystems",
  initialState: state,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogSystems.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchCatalogSystems.fulfilled, (state, action) => {
        state.catalogsystems = action.payload.results;
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(fetchCatalogSystems.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.message = action.error.message || "Could not fetch catalogsystemes.";
      })
      .addCase(createCatalogSystem.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createCatalogSystem.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.message = "Extraido correctamente";
      })
      .addCase(createCatalogSystem.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.message = action.error.message || "Could not fetch catalogsystemes.";
      })
      //revisar de aquí para abajo
      .addCase(deleteCatalogSystem.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload.message;
        const id = action.payload.id;
        const index = state.catalogsystems.findIndex(
          (catalogsystem) => catalogsystem._id === id
        );
        if (index !== -1) {
          state.catalogsystems.splice(index, 1);
        }
      })
      .addCase(deleteCatalogSystem.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteCatalogSystem.rejected, (state, action) => {
        state.message = action.error?.message || "Could not delete catalogsystem.";
        state.loading = false;
        state.status = "failed";
      })
      .addCase(deleteAllCatalogSystem.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(deleteAllCatalogSystem.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteAllCatalogSystem.rejected, (state, action) => {
        state.message =
          action.error?.message || "Could not delete all catalogsystemes.";
        state.loading = false;
        state.status = "failed";
      });
  },
});

export default catalogsystemsSlice.reducer;

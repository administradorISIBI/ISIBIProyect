// reducers.jsx
import { createSlice } from "@reduxjs/toolkit";
import { createNewCatalog, fetchunivCatalogs, setAllCatalogs, updateunivCatalog } from "./actions";
import { state } from "./states";

const univCatalogsSlice = createSlice({
  name: "univCatalogs",
  initialState: state,
  reducers: {
    disableCatalog(state, action) {
      const catalogName = action.payload;
      const university = state.univCatalogs.find(
        (univ) => univ.nombre === catalogName
      );

      if (university) {
        university.status = false;
      }
    },
    setIsloading(state, action) {
      const catalogName = action.payload;
      const university = state.univCatalogs.find(
        (univ) => univ.nombre === catalogName
      );

      if (university) {
        university.loading = true;
      }
    },
    resetLoading(state, action) {
      const catalogName = action.payload;
      const university = state.univCatalogs.find(
        (univ) => univ.nombre === catalogName
      );

      if (university) {
        university.loading = false;
      }
    },
    //terminar
    loadSearch(state, action) {
      // console.log(action.payload);
      const catalogName = action.payload.university;
      const foundResources = action.payload.data.foundResources;
      const totalFound = action.payload.data.totalCount;

      const university = state.univCatalogs.find(
        (univ) => univ.nombre === catalogName
      );
      if (university) {
        university.foundResources = foundResources;
        if (
          totalFound === "No number found" ||
          totalFound === "No results count found"
        ) {
          university.totalFound = 0;
        } else {
          university.totalFound = totalFound;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchunivCatalogs.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchunivCatalogs.fulfilled, (state, action) => {
        state.univCatalogs = action.payload;
        state.loading = false;
        state.status = "succeeded";
        state.mensaje = action.payload.mensaje;
      })
      .addCase(fetchunivCatalogs.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.mensaje = action.error.mensaje || "Could not fetch univCatalogs.";
      })
      .addCase(updateunivCatalog.fulfilled, (state, action) => {
        const updateunivCatalog = action.payload;
        // console.log(updateunivCatalog)
        const index = state.univCatalogs.findIndex(univCatalog => univCatalog.nombre === updateunivCatalog.nombre);
        if (index !== -1) {
          state.univCatalogs[index] = updateunivCatalog;
        }
        state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(updateunivCatalog.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(updateunivCatalog.rejected, (state, action) => {
        state.message = action.error?.message || 'Could not change catalog status.';
        state.loading = false;
        state.status = 'failed';
      })
      .addCase(setAllCatalogs.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(setAllCatalogs.fulfilled, (state, action) => {
        state.univCatalogs = action.payload;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(setAllCatalogs.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.mensaje = action.error.mensaje || "No se pudo actualizar todos los estados";
      })
      .addCase(createNewCatalog.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createNewCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(createNewCatalog.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.mensaje = action.error.mensaje || "No se pudo actualizar todos los estados";
      })
  },
});
export const { disableCatalog, setIsloading, resetLoading, loadSearch } =
  univCatalogsSlice.actions;
export default univCatalogsSlice.reducer;

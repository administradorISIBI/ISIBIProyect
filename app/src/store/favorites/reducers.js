// reducers.jsx
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFavorites,
  deleteFavorite,
  deleteAllFavorite,
  createFavorite,
} from "./actions";
import { state } from "./states";

const favoritesSlice = createSlice({
  name: "Favorites",
  initialState: state,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload.results;
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.message = action.error.message || "Could not fetch favoritees.";
      })
      .addCase(createFavorite.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.message = "Extraido correctamente";
      })
      .addCase(createFavorite.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.message = action.error.message || "Could not fetch favoritees.";
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload.message;
        const id = action.payload.id;
        const index = state.favorites.findIndex(
          (favorite) => favorite._id === id
        );
        if (index !== -1) {
          state.favorites.splice(index, 1);
        }
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.message = action.error?.message || "Could not delete favorite.";
        state.loading = false;
        state.status = "failed";
      })
      .addCase(deleteAllFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(deleteAllFavorite.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteAllFavorite.rejected, (state, action) => {
        state.message =
          action.error?.message || "Could not delete all favoritees.";
        state.loading = false;
        state.status = "failed";
      });
  },
});

export default favoritesSlice.reducer;

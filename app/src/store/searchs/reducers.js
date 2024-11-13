// reducers.jsx
import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchs, deleteSearch, deleteAllSearch } from "./actions";
import { state } from "./states";

const searchsSlice = createSlice({
  name: "Searchs",
  initialState: state,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchs.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchSearchs.fulfilled, (state, action) => {
        state.searchs = action.payload.results;
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(fetchSearchs.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.message = action.error.message || "Could not fetch searches.";
      })
      .addCase(deleteSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload.message;
        const id = action.payload.id;
        const index = state.searchs.findIndex(
          (search) => search._id === id
        );
        if (index !== -1) {
          state.searchs.splice(index, 1);
        }
      })
      .addCase(deleteSearch.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteSearch.rejected, (state, action) => {
        state.message =
          action.error?.message || "Could not delete search.";
        state.loading = false;
        state.status = "failed";
      })
      .addCase(deleteAllSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(deleteAllSearch.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteAllSearch.rejected, (state, action) => {
        state.message =
          action.error?.message || "Could not delete all searches.";
        state.loading = false;
        state.status = "failed";
      });
  },
});

export default searchsSlice.reducer;

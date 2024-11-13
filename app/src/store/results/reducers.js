// reducers.jsx
import { createSlice } from "@reduxjs/toolkit";
import { state } from "./states";

const resultsSlice = createSlice({
  name: "results",
  initialState: state,
  reducers: {
    setSearchParamsState(state, action) {
      state.searchParam = action.payload;
    },
    setSelectedCatalog(state, action) {
      state.catalogSelected = action.payload;
    },
    setSearching(state, action) {
      state.searching = action.payload;
    },
  },
});
export const { setSearchParamsState, setSelectedCatalog, setSearching} =
  resultsSlice.actions;
export default resultsSlice.reducer;

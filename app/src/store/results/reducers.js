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
    resetSelected() {
      return state;
    },
  },
});
export const { setSearchParamsState, setSelectedCatalog, setSearching,resetSelected } =
  resultsSlice.actions;
export default resultsSlice.reducer;

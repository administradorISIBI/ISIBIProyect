// reducers.jsx
import { createSlice } from "@reduxjs/toolkit";

import { primaryColor } from "./states";
import { secondaryColor } from "./states";

const configSlice = createSlice({
  name: "config",
  initialState: primaryColor,
  reducers: {
    setNight() {
      return secondaryColor;
    },
    setNormal() {
      return primaryColor;
    },
    
  },
});
export const { setNight, setNormal } = configSlice.actions;
export default configSlice.reducer;

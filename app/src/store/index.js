import { configureStore } from "@reduxjs/toolkit";
import universityReducer from "./universities/reducers";
import resultsReducer from "./results/reducers";
import authReducer from "./auth/reducers";
import usersSlice from "./users/reducers";
import searchSlice from "./searchs/reducers";
import favoritesSlice from "./favorites/reducers";
import configSlice from "./config/reducers";
import catalogsystemsSlice from "./catalogsSystems/reducers";

export const store = configureStore({
  reducer: {
    univCatalogs: universityReducer,
    results: resultsReducer,
    auth: authReducer,
    users: usersSlice,
    searchs: searchSlice,
    favorites: favoritesSlice,
    config: configSlice,
    catalogsystems: catalogsystemsSlice
  },
});

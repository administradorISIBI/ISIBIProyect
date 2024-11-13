import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index";
import "./main.css";
import AppRoutes from "./routes/RoutesApp.jsx";
import { AppTheme } from './theme/AppTheme'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppTheme>
        <AppRoutes />
      </AppTheme>
    </Provider>
  </StrictMode>
);

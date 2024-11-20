import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@pages/home/HomePage";
import Resultados from "@pages/resultados/Resultados";
import AuthPage from "@pages/auth/AuthPage";
import Catalogs from "@pages/catalogsAdmin/Catalogs";
import PrivateRoute from "./PrivateRoute";
import { MainPageLayout } from "../layouts/MainPage-Layout";
import Users from "@pages/usersAdmin/Users";
import FavoritesPage from "@pages/favorites/FavoritesPage";
import HistorialPage from "@pages/historial/HistorialPage";
import {AdvancedSearchPage} from "@pages/advancedSearch/AdvancedSearchPage";
import NotFoundPage from "@pages/notFound/NotFoundPage";
import CatalogsSystem from "@pages/catalogsSystemAdmin/CatalogsSystem";
import FormCatalogs from "../components/forms/FormCatalogs";
import FormUsers from "../components/forms/FormUsers";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} /> {/* Ruta sin layout */}

        {/* Rutas que usan el MainPageLayout */}
        <Route element={<MainPageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/busqueda-avanzada" element={<AdvancedSearchPage />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route
            path="/historial"
            element={<PrivateRoute element={<HistorialPage />} />}
          />
          <Route
            path="/favoritos"
            element={<PrivateRoute element={<FavoritesPage />} />}
          />
          <Route
            path="/catalogos"
            element={<PrivateRoute element={<Catalogs />} />}
          />
          <Route
            path="/usuarios"
            element={<PrivateRoute element={<Users />} />}
          />
          <Route
            path="/catalogs-systems"
            element={<PrivateRoute element={<CatalogsSystem />} />}
          />
          <Route
            path="/catalogos/form/:nombre?"
            element={<PrivateRoute element={<FormCatalogs />} />}
          />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

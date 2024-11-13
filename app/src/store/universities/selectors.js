export const selectUnivCatalogs = (state) => state.univCatalogs;
export const selectUnivCatalogNames = (state) => 
    state.univCatalogs.univCatalogs.map((catalog) => catalog.nombre);
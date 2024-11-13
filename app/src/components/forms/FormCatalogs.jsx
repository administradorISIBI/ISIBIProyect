import { useEffect, useState } from 'react';
import { TextField, Button, Grid, Checkbox, FormControlLabel, Typography, Paper, Box, IconButton, CircularProgress, } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCatalogSystems } from '@store/catalogsSystems/selectors';
import { fetchCatalogSystems } from "@store/catalogsSystems/actions";
import { selectUnivCatalogs } from '@store/universities/selectors';
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
import { createNewCatalog, updateAllCatalog } from '@store/universities/actions';
import { fetchunivCatalogs } from '@store/universities/actions';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const FormCatalogs = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { catalogsystems, loading: catalogSystemsLoading } = useSelector(selectCatalogSystems);
    const { univCatalogs, loading: univCatalogsLoading } = useSelector(selectUnivCatalogs);

    const { nombre } = useParams();

    const [formData, setFormData] = useState({
        nombre: '',
        imagen: '',
        large_name: '',
        url: '',
        urlCatalogo: '',
        catalog_system: '',
        status: true,
        selectors: {
            selectors_data: [
                { nombre: 'Titulo', selector: '' },
                { nombre: 'Autor', selector: '' },
                { nombre: 'title_link', selector: '' },
                { nombre: 'Idioma', selector: '' },
                { nombre: 'Tipo de material', selector: '' },
                { nombre: 'Formato', selector: '' },
            ],
            num_results_element: ''
        }
    });

    useEffect(() => {
        if (Object.keys(catalogsystems).length === 0) {
            dispatch(fetchCatalogSystems());
        }
    }, [dispatch]);

    // Buscar catálogo en univCatalogs si nombre está presente
    useEffect(() => {
        if (nombre && univCatalogs.length > 0) {
            const catalog = univCatalogs.find(catalog => catalog.nombre === nombre);
            if (catalog) {
                setFormData({
                    ...formData,
                    id: catalog._id,
                    nombre: catalog.nombre,
                    imagen: catalog.imagen || '',
                    large_name: catalog.large_name || '',
                    url: catalog.url || '',
                    urlCatalogo: catalog.urlCatalogo || '',
                    catalog_system: catalog.catalog_system || '',
                    status: catalog.status !== undefined ? catalog.status : true, // Asegúrate de que 'status' esté en el objeto
                    selectors: catalog.selectors || formData.selectors,
                });
            }
        }
    }, [nombre, univCatalogs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "num_results_element") {
            setFormData({
                ...formData,
                selectors: { ...formData.selectors, num_results_element: value }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSelectorChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSelectorsData = [...formData.selectors.selectors_data];
        updatedSelectorsData[index][name] = value;
        setFormData({
            ...formData,
            selectors: { ...formData.selectors, selectors_data: updatedSelectorsData }
        });
    };

    const addSelector = () => {
        setFormData({
            ...formData,
            selectors: {
                ...formData.selectors,
                selectors_data: [
                    ...formData.selectors.selectors_data,
                    { nombre: '', selector: '' }
                ]
            }
        });
    };

    const removeSelector = (index) => {
        if (index >= 3) { 
            const updatedSelectorsData = formData.selectors.selectors_data.filter((_, i) => i !== index);
            setFormData({
                ...formData,
                selectors: { ...formData.selectors, selectors_data: updatedSelectorsData }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Deseas guardar los cambios?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: theme.palette.secondary.dark,
                cancelButtonColor: theme.palette.error.main,
                confirmButtonText: "Sí, Guardar Cambios",
                cancelButtonText: "Cancelar",
            });

            // Si el usuario confirma la acción
            if (result.isConfirmed) {
                if (nombre) {
                    const action = await dispatch(updateAllCatalog({ body: formData, catalogName: nombre }))

                    //falta comprobar fulfilled
                    if (action.type.endsWith("rejected")) {
                        console.error(action.payload)
                    } else {
                        if (action.payload.success) {
                            Swal.fire("Cambios realizados", "Se han guardado los cambios satisfactoriamente", "success");
                            clearFields()
                            dispatch(fetchunivCatalogs())
                            navigate("/catalogos")
                        }
                    }
                } else {
                    // Despachar la acción y esperar su resultado
                    const action = await dispatch(createNewCatalog(formData));

                    //falta comprobar fulfilled
                    if (action.payload.success) {
                        Swal.fire("Catálogo Agregado", action.payload.message, "success");
                        clearFields()
                        dispatch(fetchunivCatalogs())
                        navigate("/catalogos")

                    } else {
                        Swal.fire("Error", action.payload?.message || "error", "warning");
                    }
                }
            }
        } catch (error) {
            console.error("Error al guardar:", error);
            Swal.fire("Error", "Ocurrió un error al intentar guardar", "error");
        }
    };

    const handleReturn = () => {
        navigate(-1);
    };

    const clearFields = () => {
        setFormData({
            ...formData,
            nombre: '',
            imagen: '',
            large_name: '',
            url: '',
            urlCatalogo: '',
            catalog_system: '',
            status: true,
            selectors: {
                selectors_data: [
                    { nombre: 'Titulo', selector: '' },
                    { nombre: 'Autor', selector: '' },
                    { nombre: 'title_link', selector: '' },
                ],
                num_results_element: ''
            }
        });
    }

    return (
        <Paper sx={{ padding: '10px' }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                    <IconButton onClick={handleReturn}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
                <Box sx={{ padding: "10px" }}>
                    <Typography variant="h5">
                        {nombre ? `Editando el catálogo de ${nombre} ` : "Agrega un nuevo catálogo"}
                    </Typography>
                </Box>
            </Box>
            <form onSubmit={handleSubmit} style={{ padding: '50px' }}>
                <Grid container spacing={2}>
                    {formData.id &&
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="id"
                                value={formData.id}
                                sx={{ maxWidth: '600px' }}
                                disabled
                            />
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                            sx={{ maxWidth: '600px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Imagen URL"
                            variant="outlined"
                            fullWidth
                            name="imagen"
                            value={formData.imagen}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre Largo"
                            variant="outlined"
                            fullWidth
                            name="large_name"
                            value={formData.large_name}
                            onChange={handleInputChange}
                            required
                            sx={{ maxWidth: '600px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="URL de crawling"
                            variant="outlined"
                            fullWidth
                            name="url"
                            value={formData.url}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            label="URL del Catalogo"
                            variant="outlined"
                            fullWidth
                            name="urlCatalogo"
                            value={formData.urlCatalogo}
                            onChange={handleInputChange}
                            required
                        />

                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            color="primary"
                            onClick={() => window.open(formData.urlCatalogo, "_blank")}
                            disabled={!formData.urlCatalogo}
                        >
                            {univCatalogsLoading ? <CircularProgress size="25px" /> : <OpenInNewIcon />}
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Sistema de catálogo</Typography>
                        <TextField
                            select
                            variant="outlined"
                            fullWidth
                            name="catalog_system"
                            value={formData.catalog_system}
                            onChange={handleInputChange}
                            required
                            SelectProps={{
                                native: true,
                            }}
                            disabled={nombre ? true : false}
                        >
                            {catalogSystemsLoading ? (
                                <CircularProgress size="15px" />
                            ) : (
                                catalogsystems.map((system, index) => (
                                    <option key={index} value={system.nombre}>
                                        {system.nombre}
                                    </option>
                                ))
                            )}
                        </TextField>
                    </Grid>

                    {/* Condición para mostrar campos adicionales solo si el sistema es "PRIMO" */}
                    {formData.catalog_system === "PRIMO" && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    label="URL Full Display"
                                    variant="outlined"
                                    fullWidth
                                    name="urlFullDisplay"
                                    value={formData.urlFullDisplay}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="instCode"
                                    variant="outlined"
                                    fullWidth
                                    name="instCode"
                                    value={formData.instCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="vidCode"
                                    variant="outlined"
                                    fullWidth
                                    name="vidCode"
                                    value={formData.vidCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                        </>
                    )}

                    {/* Selectors dinámicos */}
                    <Grid item xs={12}>
                        <Box sx={{ border: "1px dotted gray", borderRadius: "8px", padding: '10px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <Typography variant='h6'>
                                    Selectores
                                </Typography>
                            </Box>
                            {formData.selectors.selectors_data.map((selector, index) => (
                                <Grid container spacing={2} key={index}>
                                    <Grid item xs={5}>
                                        <TextField
                                            label="Nombre del Selector"
                                            variant="outlined"
                                            fullWidth
                                            name="nombre"
                                            value={selector.nombre}
                                            onChange={(e) => handleSelectorChange(e, index)}
                                            required
                                            disabled={index < 3}
                                            sx={{ margin: '10px 0px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            label="Selector"
                                            variant="outlined"
                                            fullWidth
                                            name="selector"
                                            value={selector.selector}
                                            onChange={(e) => handleSelectorChange(e, index)}
                                            required
                                            sx={{ margin: '10px 0px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={2} alignSelf="center">
                                        {index >= 3 && (
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => removeSelector(index)}
                                            >
                                                Eliminar
                                            </Button>
                                        )}
                                    </Grid>
                                </Grid>
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Button variant="outlined" onClick={addSelector} color="primary">
                                    Agregar Selector
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Elemento para número de resultados"
                            variant="outlined"
                            fullWidth
                            name="num_results_element"
                            value={formData.selectors.num_results_element}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                                    name="status"
                                    color="primary"
                                />
                            }
                            label="Activo"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" color="primary">
                            {univCatalogsLoading ? <CircularProgress size="25px" /> : " Guardar Catálogo"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default FormCatalogs;

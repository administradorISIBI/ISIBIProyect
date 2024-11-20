import React, { useEffect, useState } from "react";
import {
    Box,
    Modal,
    TextField,
    Button,
    Grid,
    MenuItem,
    Typography,
    Backdrop,
    Fade,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUsers } from "@store/users/actions";
import Swal from "sweetalert2";

const FormUsersModal = ({ open, onClose, user }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: "",
        status: false,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
                role: user.role || "",
                status: user.status || false,
            });
        } else {
            setFormData({
                username: "",
                email: "",
                role: "",
                status: false,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStatusChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            status: e.target.checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos del formulario:", formData);
        const action = await dispatch(updateUsers(formData))
        if (action.type.endsWith("fulfilled")) {
            Swal.fire("Proceso exitoso", "Usuario Actualizado", "success");
            onClose();
            
        } else {
            Swal.fire("Error", "No se pudo actualizar", "success");
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        {user ? "Edit User" : "Create User"}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* Username */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nombre de usuario"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            {/* Email (solo lectura si se está editando) */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={!!user}
                                />
                            </Grid>
                            {/* Role */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Rol"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </TextField>
                            </Grid>
                            {/* Status */}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.status}
                                            onChange={handleStatusChange}
                                            name="status"
                                        />
                                    }
                                    label="Active"
                                />
                            </Grid>
                            {/* Botones */}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    {user ? "Actualizar Usuario" : "Crear Usuario"}
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={onClose}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default FormUsersModal;

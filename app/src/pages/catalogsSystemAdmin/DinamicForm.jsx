import React, { useState } from "react";
import { Box, TextField, Checkbox, Typography, Button, IconButton } from "@mui/material";
import { AddCircleOutline, DeleteOutline, Add } from "@mui/icons-material";
import cloneDeep from "lodash/cloneDeep";

const DynamicForm = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (path, value) => {
    const newFormData = { ...formData };
    let current = newFormData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setFormData(newFormData);
  };

  const handleKeyChange = (path, newKey) => {
    const newFormData = { ...formData };
    let current = newFormData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    const oldKey = path[path.length - 1];
    current[newKey] = current[oldKey];
    delete current[oldKey];
    setFormData(newFormData);
  };

  const handleAddField = (path, isChild = false) => {
    const newFormData = cloneDeep(formData);
    let current = newFormData;
    
    for (let i = 0; i < path.length; i++) {
      current = current[path[i]];
    }
    
    const newFieldKey = `nuevoCampo${Object.keys(current).length + 1}`;
    current[newFieldKey] = isChild ? {} : ""; 
    
    setFormData(newFormData);
  };
  

  const handleDeleteField = (path) => {
    const newFormData = { ...formData };
    let current = newFormData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    delete current[path[path.length - 1]];
    setFormData(newFormData);
  };

  const renderFields = (data, path = []) => {
    if (typeof data === "object" && data !== null) {
      return Object.entries(data).map(([key, value]) => (
        <Box key={key} sx={{ marginBottom: 2, marginLeft: path.length * 2 }}>
          <Box display="flex" alignItems="center">
            <TextField
              value={key}
              onChange={(e) => handleKeyChange([...path, key], e.target.value)}
              sx={{ marginRight: 1, width: "30%" }}
              label="Etiqueta"
            />
            {typeof value === "string" ? (
              <TextField
                fullWidth
                value={value}
                onChange={(e) => handleChange([...path, key], e.target.value)}
                sx={{ marginRight: 1 }}
                label="Valor"
              />
            ) : (
              <Typography sx={{ fontWeight: "bold", display: "block", marginRight: 1 }}>
                {renderFields(value, [...path, key])}
              </Typography>
            )}
            <IconButton onClick={() => handleDeleteField([...path, key])} color="error">
              <DeleteOutline />
            </IconButton>
            <IconButton
              onClick={() => handleAddField([...path, key], true)}
              color="primary"
              sx={{ marginLeft: 1 }}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
      ));
    } else if (typeof data === "boolean") {
      return (
        <Checkbox
          checked={data}
          onChange={(e) => handleChange(path, e.target.checked)}
          sx={{ marginLeft: path.length * 2 }}
        />
      );
    } else {
      return (
        <TextField
          fullWidth
          value={data || ""}
          onChange={(e) => handleChange(path, e.target.value)}
          sx={{ marginLeft: path.length * 2 }}
        />
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ padding: 2 }}>{renderFields(formData)}</Box>
      <Button
        onClick={() => handleAddField([])}
        variant="contained"
        startIcon={<AddCircleOutline />}
        sx={{ marginBottom: 2 }}
      >
        Añadir Campo
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Guardar
      </Button>
    </form>
  );
};

export default DynamicForm;

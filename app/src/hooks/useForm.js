import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  const setFormValues = (newValues) => {
    setValues({
      ...values,
      ...newValues,
    });
  };
  const areFieldsEmpty = () => {
    const { estado, ...rest } = values; 
    return Object.values(rest).every(
      (value) => value === "" || value === null || value === undefined
    );
  };

  return [values, handleChange, resetForm, setFormValues, areFieldsEmpty];
};

export default useForm;

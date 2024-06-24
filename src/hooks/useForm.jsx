import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function useForm(initialState) {
  const [form, setValues] = useState(initialState);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setValues({
      ...form,
      [name]: value,
    });
  };

  return [form, handleChangeInput, setValues];
}

useForm.propTypes = {
  initialState: PropTypes.object.isRequired, // initialState должен быть объектом и обязательным
};
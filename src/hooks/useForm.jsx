import React, { useState } from 'react'

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

import React, { useState, ChangeEvent } from 'react';

type TUseForm<T> = [
  form: T,
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void,
  setValues: (state: T) => void,
];

export function useForm<T>(initialState: T): TUseForm<T> {
  const [form, setValues] = useState<T>(initialState);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...form,
      [name]: value,
    });
  };

  return [form, handleChangeInput, setValues];
}


// [
//   T,
//   (event: ChangeEvent<HTMLInputElement>) => void,
//   React.Dispatch<React.SetStateAction<T>>
// ]
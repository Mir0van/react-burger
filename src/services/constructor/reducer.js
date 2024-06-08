import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [
  // {
  //   calories: 420,
  //   carbohydrates: 53,
  //   fat: 24,
  //   image: "https://code.s3.yandex.net/react/code/bun-02.png",
  //   image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  //   image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  //   name: "Краторная булка N-200i",
  //   price: 1255,
  //   proteins: 80,
  //   type: "bun",
  //   __v: 0,
  //   _id: "643d69a5c3f7b9001cfa093c",
  // },
  ]
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBunToConstructor: (state, action) => {
      state.bun = action.payload;
    },
    addIngredientsToConstructor: (state, action) => {
      state.ingredients.push(action.payload);
    },
    clearIngredientsConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addBunToConstructor,
  addIngredientsToConstructor,
  clearIngredientsConstructor
} = constructorSlice.actions
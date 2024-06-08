import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: []
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
    deleteIngredientFromConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter((ingredient) => ingredient.key !== action.payload);
    },
    moveIngredientCard: (state, action) => {
      state.ingredients = action.payload
    },
  },
});

export const {
  addBunToConstructor,
  addIngredientsToConstructor,
  clearIngredientsConstructor,
  deleteIngredientFromConstructor,
  moveIngredientCard
} = constructorSlice.actions
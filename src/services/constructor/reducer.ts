import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBurgerIngredient, TDragIngredient } from "../../utils/types";

type TInitialState = {
  bun: null | TBurgerIngredient;
  ingredients: TDragIngredient[];
}

const initialState: TInitialState = {
  bun: null,
  ingredients: []
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBunToConstructor: (state, action: PayloadAction<TBurgerIngredient>) => {
      state.bun = action.payload;
    },
    addIngredientsToConstructor: (state, action: PayloadAction<TDragIngredient>) => {
      state.ingredients.push(action.payload);
    },
    clearIngredientsConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    deleteIngredientFromConstructor: (state, action: PayloadAction<TDragIngredient['key']>) => {
      state.ingredients = state.ingredients.filter((ingredient) => ingredient.key !== action.payload);
    },
    moveIngredientCard: (state, action: PayloadAction<TDragIngredient[]>) => {
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
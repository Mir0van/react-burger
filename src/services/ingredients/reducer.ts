import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getIngredients,
} from "./actions"
import { TBurgerIngredient } from "../../utils/types";

type TInitialState = {
  ingredientsData: TBurgerIngredient[];
  error: string | null;
  isLoading: boolean;
  selectedIngredient: TBurgerIngredient | null;
  dragIngredientType: string | null;
};

export const initialState: TInitialState = {
  ingredientsData: [],
  error: null,
  isLoading: false,
  selectedIngredient: null,
  dragIngredientType: null,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addSelectedIngredient: (state, action: PayloadAction<TBurgerIngredient>) => {
      state.selectedIngredient = action.payload;
    },
    deleteSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    },
    addDragIngredient: (state, action: PayloadAction<string>) => {
      state.dragIngredientType = action.payload;
    },
    deleteDragIngredient: (state) => {
      state.dragIngredientType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action: PayloadAction<TBurgerIngredient[]>) => {
        state.ingredientsData = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
})

export const { 
  addSelectedIngredient, 
  deleteSelectedIngredient, 
  addDragIngredient, 
  deleteDragIngredient 
} = ingredientsSlice.actions;
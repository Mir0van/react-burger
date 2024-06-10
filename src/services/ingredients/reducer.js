import { createSlice } from "@reduxjs/toolkit";
import {
  getIngredients,
} from "./actions"

const initialState = {
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
    addSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    deleteSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    },
    addDragIngredient: (state, action) => {
      state.dragIngredientType = action.payload;
    },
    deleteDragIngredient: (state) => {
      state.dragIngredientType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsData = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
})

export const { addSelectedIngredient, deleteSelectedIngredient, addDragIngredient, deleteDragIngredient } = ingredientsSlice.actions;
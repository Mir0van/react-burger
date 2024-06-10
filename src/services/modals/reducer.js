import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOrderModalOpen: false,
  isIngredientModalOpen: false,
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openOrderModal: (state) => {
      state.isOrderModalOpen = true;
    },
    closeOrderModal: (state) => {
      state.isOrderModalOpen = false;
    },
    openIngredientModal: (state) => {
      state.isIngredientModalOpen = true;
    },
    closeIngredientModal: (state) => {
      state.isIngredientModalOpen = false;
    },
  },
});

export const {
  openOrderModal,
  closeOrderModal,
  openIngredientModal,
  closeIngredientModal,
} = modalsSlice.actions;
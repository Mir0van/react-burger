import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOrderModalOpen: false,
  isIngredientModalOpen: false,
  isLoaderModalOpen: false,
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
    openLoaderModal: (state) => {
      state.isLoaderModalOpen = true;
    },
    closeLoaderModal: (state) => {
      state.isLoaderModalOpen = false;
    },
    // openIngredientModal: (state) => {
    //   state.isIngredientModalOpen = true;
    // },
    // closeIngredientModal: (state) => {
    //   state.isIngredientModalOpen = false;
    // },
  },
});

export const {
  openOrderModal,
  closeOrderModal,
  openLoaderModal,
  closeLoaderModal,
  // openIngredientModal,
  // closeIngredientModal,
} = modalsSlice.actions;
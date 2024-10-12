import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  isOrderModalOpen: boolean;
  isIngredientModalOpen: boolean;
  isLoaderModalOpen: boolean;
}

export const initialState: TInitialState = {
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
  },
});

export const {
  openOrderModal,
  closeOrderModal,
  openLoaderModal,
  closeLoaderModal,
} = modalsSlice.actions;
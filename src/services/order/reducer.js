import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "./actions";

const initialState = {
  isLoading: false,
  error: null,
  orderNumber: null,
  orderName: ''
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload.order.number;
        state.orderName = action.payload.name;
      })
      .addCase(postOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});


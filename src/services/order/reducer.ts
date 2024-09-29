import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postOrder } from "./actions";
import { TOrder } from "../../utils/types";

type TInitialState = {
  isLoading: boolean;
  error: null | string;
  orderNumber: number | null;
  orderName: string;
}

const initialState: TInitialState = {
  isLoading: false,
  error: null,
  orderNumber: null,
  orderName: ''
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
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
        state.error = action.error.message ?? null;
      });
  }
});


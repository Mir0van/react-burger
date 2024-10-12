import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postOrder } from "./actions";
import { TOrder } from "../../utils/types";
import { TFeedOrder } from "../../utils/types";

type TInitialState = {
  isLoading: boolean;
  error: null | string;
  orderNumber: number | null;
  orderName: string;
  order: null | TFeedOrder
}

export const initialState: TInitialState = {
  isLoading: false,
  error: null,
  orderNumber: null,
  orderName: '',
  order: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSingleOrder: (state, action: PayloadAction<TFeedOrder>) => {
      state.order = action.payload;
    },
  },
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

export const {setSingleOrder} = orderSlice.actions 


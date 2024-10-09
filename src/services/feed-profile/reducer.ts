import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TWsData, WebsocketStatus } from "../../utils/types";

export type TInitialState = {
  status: WebsocketStatus;
  data: TWsData | null;
  connectionError: string | null;
};

const initialState: TInitialState = {
  status: WebsocketStatus.OFFLINE,
  data: null,
  connectionError: null,
};


export const feedProfileSlice = createSlice({
  name: 'feedProfile',
  initialState,
  reducers: {
    wsOrdersProfileConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsOrdersProfileOpen: (state) => {
      state.status = WebsocketStatus.ONLINE
    },
    wsOrdersProfileClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsOrdersProfileError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsOrdersProfileMessage: (state, action: PayloadAction<TWsData>) => {
      state.data = action.payload;
    }
  },
  selectors: {
    getWsProfileOrders: (state) => state.data,
    getWebsocketProfileStatus: (state) => state.status,
  }
});

export const { wsOrdersProfileConnecting, wsOrdersProfileOpen, wsOrdersProfileClose, wsOrdersProfileError, wsOrdersProfileMessage } = feedProfileSlice.actions;
export const { getWsProfileOrders, getWebsocketProfileStatus } = feedProfileSlice.selectors;
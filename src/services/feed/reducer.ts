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


export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsOrdersConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsOrdersOpen: (state) => {
      state.status = WebsocketStatus.ONLINE
    },
    wsOrdersClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsOrdersError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsOrdersMessage: (state, action: PayloadAction<TWsData>) => {
      state.data = action.payload;
    }
  },
  selectors: {
    getWsOrders: (state) => state.data,
    getWebsocketStatus: (state) => state.status,
  }
});

export const { wsOrdersConnecting, wsOrdersOpen, wsOrdersClose, wsOrdersError, wsOrdersMessage } = feedSlice.actions;
export const { getWsOrders, getWebsocketStatus } = feedSlice.selectors;
import { createAction } from "@reduxjs/toolkit";

export const wsOrdersProfileConnect = createAction<string, 'ORDERS_PROFILE_CONNECT'>('ORDERS_PROFILE_CONNECT');
export const wsOrdersProfileDisconnect = createAction('ORDERS_PROFILE_DISCONNECT');
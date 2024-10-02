import { createAction } from "@reduxjs/toolkit";

export const wsOrdersConnect = createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT');
export const wsOrdersDisconnect = createAction('ORDERS_DISCONNECT');
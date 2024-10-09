import { reducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { socketMiddleware } from "./middleware/ws-orders-middleware";
import { wsOrdersConnect, wsOrdersDisconnect } from "./feed/actions";
import { wsOrdersClose, wsOrdersConnecting, wsOrdersError, wsOrdersMessage, wsOrdersOpen } from "./feed/reducer";
import { wsOrdersProfileConnect, wsOrdersProfileDisconnect } from './feed-profile/actions';
import { wsOrdersProfileClose, wsOrdersProfileConnecting, wsOrdersProfileError, wsOrdersProfileMessage, wsOrdersProfileOpen } from "./feed-profile/reducer";
import { TWsData } from "../utils/types";


// import logger from 'redux-logger'

// -------------------------------
// для теста
// Кастомный middleware для логирования действий
// const actionLogger = store => next => action => {
//   // Выводим в консоль время события и его содержание
//   console.log(`${new Date().getTime()} | Action: ${JSON.stringify(action)}` );
//   // Передаём событие «по конвейеру» дальше
//   return next(action);
// };
// -------------------------------

const ordersMiddleware = socketMiddleware<unknown, TWsData>({
  connect: wsOrdersConnect,
  disconnect: wsOrdersDisconnect,
  onConnecting: wsOrdersConnecting,
  onOpen: wsOrdersOpen,
  onClose: wsOrdersClose,
  onError: wsOrdersError,
  onMessage: wsOrdersMessage,
})

const ordersProfileMiddleware = socketMiddleware<unknown, TWsData>({
  connect: wsOrdersProfileConnect,
  disconnect: wsOrdersProfileDisconnect,
  onConnecting: wsOrdersProfileConnecting,
  onOpen: wsOrdersProfileOpen,
  onClose: wsOrdersProfileClose,
  onError: wsOrdersProfileError,
  onMessage: wsOrdersProfileMessage,
}, true)

type TInitialState = Record<string, unknown>

export const configureAppStore = (initialState: TInitialState = {}) => {
  const store = configureStore({
    reducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    // для тестов
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, actionLogger),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ordersMiddleware, ordersProfileMiddleware),
  });

  return store;
}

type AppStore = ReturnType<typeof configureAppStore>;
type AppDispatch = AppStore['dispatch'];

// если сделать так то будет циклическая зависимость с мидлварой. оставил себе как напоминание.
// type RootState = ReturnType<AppStore['getState']>;
export type RootState = ReturnType<typeof reducer>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

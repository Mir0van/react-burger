import { reducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook,
} from "react-redux";

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

type TInitialState = Record<string, unknown>

export const configureAppStore = (initialState: TInitialState = {}) => {
  const store = configureStore({
    reducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, actionLogger),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  return store;
}

type AppStore = ReturnType<typeof configureAppStore>;
type AppDispatch = AppStore['dispatch'];
type TRootState = ReturnType<AppStore['getState']>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

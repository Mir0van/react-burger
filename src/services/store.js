// import { thunk } from "redux-thunk";
import { reducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'

// -------------------------------
// для теста
// Кастомный middleware для логирования действий
const actionLogger = store => next => action => {
  // Выводим в консоль время события и его содержание
  console.log(`${new Date().getTime()} | Action: ${JSON.stringify(action)}` );
  // Передаём событие «по конвейеру» дальше
  return next(action);
};
// -------------------------------


export const configureAppStore = (initialState) => {
  const store = configureStore({
    reducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, actionLogger),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  return store;
}

// export const configureStore = (initialState) => {
//   const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(),
//   );

//   return store;
// }


import { combineReducers } from "redux";
import { modalsSlice } from "./modals/reducer";
import { tabsSlice } from "./tabs/reducer";
import { ingredientsSlice } from "./ingredients/reducer";
import { constructorSlice } from "./constructor/reducer";

export const reducer = combineReducers({
  [tabsSlice.reducerPath]: tabsSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [modalsSlice.reducerPath]: modalsSlice.reducer,
  [constructorSlice.reducerPath]: constructorSlice.reducer,
})
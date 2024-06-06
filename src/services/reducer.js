import { combineReducers } from "redux";
import { reducer as modalsReducer } from "./modals/reducer";
import { reducer as tabsReducer } from "./tabs/reducer";
import { reducer as ingredientsReducer } from "./ingredients/reducer";

export const reducer = combineReducers({
  modals: modalsReducer,
  tabs: tabsReducer,
  ingredients: ingredientsReducer,
})
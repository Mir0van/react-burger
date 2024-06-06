import {
  ADD_SELECTED_INGREDIENT,
  INGREDIENTS_LOAD_SUCCESS,
  INGREDIENTS_ERROR,
  INGREDIENTS_LOADING,
} from "./actions"

const initialState = {
  ingredientsData: [],
  error: null,
  isLoading: false,
  selectedIngredient: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_LOAD_SUCCESS:
      return {
        ...state,
        ingredientsData: action.payload,
        isLoading: false, 
      };
    case INGREDIENTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case INGREDIENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ADD_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: action.payload,
      };
    default:
      return state;
  }
};
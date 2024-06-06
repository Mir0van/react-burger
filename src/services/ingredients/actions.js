import { getIngredients as getIngredientsApi } from "../../utils/burger-api";

export const INGREDIENTS_LOAD_SUCCESS = 'INGREDIENTS_LOAD_SUCCESS';
export const INGREDIENTS_LOADING = 'INGREDIENTS_LOADING';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';
export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: INGREDIENTS_LOADING,
  });

  return getIngredientsApi()
    .then(({ data }) => {
      dispatch({
        type: INGREDIENTS_LOAD_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: INGREDIENTS_ERROR,
        payload: error.message,
      });
      console.error("Error fetching ingredients:", error);
    });
};
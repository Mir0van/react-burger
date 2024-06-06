import {
  INGREDIENT_MODAL_CLOSE,
  INGREDIENT_MODAL_OPEN,
  ORDER_MODAL_CLOSE,
  ORDER_MODAL_OPEN
} from "./actions"

const initialState = {
  isOrderModalOpen: false,
  isIngredientModalOpen: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_MODAL_OPEN: {
      return {
        ...state,
        isOrderModalOpen: action.payload
      };
    }
    case ORDER_MODAL_CLOSE: {
      return {
        ...state,
        isOrderModalOpen: action.payload
      };
    }
    case INGREDIENT_MODAL_OPEN: {
      return {
        ...state,
        isIngredientModalOpen: action.payload
      };
    }
    case INGREDIENT_MODAL_CLOSE: {
      return {
        ...state,
        isIngredientModalOpen: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
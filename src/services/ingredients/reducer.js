import { createSlice } from "@reduxjs/toolkit";
import {
  // ADD_SELECTED_INGREDIENT,
  // INGREDIENTS_LOAD_SUCCESS,
  // INGREDIENTS_ERROR,
  // INGREDIENTS_LOADING,
  getIngredients,
} from "./actions"

const initialState = {
  ingredientsData: [],
  error: null,
  isLoading: false,
  selectedIngredient: null,
}

// export const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INGREDIENTS_LOAD_SUCCESS:
//       return {
//         ...state,
//         ingredientsData: action.payload,
//         isLoading: false, 
//       };
//     case INGREDIENTS_LOADING:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case INGREDIENTS_ERROR:
//       return {
//         ...state,
//         error: action.payload,
//         isLoading: false,
//       };
//     case ADD_SELECTED_INGREDIENT:
//       return {
//         ...state,
//         selectedIngredient: action.payload,
//       };
//     default:
//       return state;
//   }
// };

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsData = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
})

export const { addSelectedIngredient } = ingredientsSlice.actions;
// export const reducer = ingredientsSlice.reducer;
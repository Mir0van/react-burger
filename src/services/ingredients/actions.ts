import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients as getIngredientsApi } from "../../utils/burger-api";
import { TBurgerIngredient } from "../../utils/types";

export const getIngredients = createAsyncThunk<TBurgerIngredient[]>(
  'ingredients/getIngredients',
  async () => {
      const response = await getIngredientsApi();
      return response.data;
  }
)
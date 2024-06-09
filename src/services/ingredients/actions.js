import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients as getIngredientsApi } from "../../utils/burger-api";

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
      const response = await getIngredientsApi();
      return response.data;
  }
)
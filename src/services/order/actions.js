import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder as postOrderApi } from "../../utils/burger-api";
import { openOrderModal } from "../modals/reducer";

export const postOrder = createAsyncThunk(
  'constructor/postOrder',
  async (ingredientIds, {dispatch, thunkApi}) => {
    const response = await postOrderApi(ingredientIds);
    dispatch(openOrderModal());
    return response;
  }
)
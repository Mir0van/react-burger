import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder as postOrderApi } from "../../utils/burger-api";
import { openOrderModal } from "../modals/reducer";

export const postOrder = createAsyncThunk(
  'constructor/postOrder',
  async (ingredientIds, {dispatch, thunkApi}) => {
    try {
      const response = await postOrderApi(ingredientIds);
      dispatch(openOrderModal());
      return response;
    } 
    catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)
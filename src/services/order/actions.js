import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder as postOrderApi } from "../../utils/burger-api";
import { closeLoaderModal, openLoaderModal, openOrderModal } from "../modals/reducer";

export const postOrder = createAsyncThunk(
  'constructor/postOrder',
  async (ingredientIds, {dispatch, thunkApi}) => {
    dispatch(openLoaderModal());
    const response = await postOrderApi(ingredientIds);
    dispatch(closeLoaderModal());
    dispatch(openOrderModal());
    return response;
  }
)
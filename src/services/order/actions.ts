import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder as postOrderApi } from "../../utils/burger-api";
import { closeLoaderModal, openLoaderModal, openOrderModal } from "../modals/reducer";
import { TOrder, TBurgerIngredient } from "../../utils/types";

export const postOrder = createAsyncThunk<TOrder, TBurgerIngredient['_id'][]>(
  'constructor/postOrder',
  async (ingredientIds, {dispatch}) => {
    dispatch(openLoaderModal());
    const response = await postOrderApi(ingredientIds);
    dispatch(closeLoaderModal());
    dispatch(openOrderModal());
    return response;
  }
)
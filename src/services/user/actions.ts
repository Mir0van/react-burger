import { createAsyncThunk } from "@reduxjs/toolkit";
import { TUserData } from "../../utils/types";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  getUser as getUserApi,
  updateUserData as updateUserDataApi
} from "../../utils/burger-api";

type TUserResponseData = Omit<TUserData, 'password'>;

export const login = createAsyncThunk<TUserResponseData, Omit<TUserData, 'name'>>(
  'user/login',
  async (form) => {
    const response = await loginApi(form);
    return response.user;
  }
);

export const register = createAsyncThunk<TUserResponseData, TUserData>(
  'user/register',
  async (form) => {
    const response = await registerApi(form);
    return response.user;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const getUser = createAsyncThunk<Omit<TUserData, 'password'>>(
  'user/getUser',
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

export const updateUserData = createAsyncThunk<TUserResponseData, TUserData>(
  'user/updateUserData',
  async (form) => {
    const response = await updateUserDataApi(form);
    return response.user;
  }
);
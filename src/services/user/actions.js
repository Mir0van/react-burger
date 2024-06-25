import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  getUser as getUserApi,
  updateUserData as updateUserDataApi
} from "../../utils/burger-api";

export const login = createAsyncThunk(
  'user/login',
  async (form) => {
    const response = await loginApi(form);
    return response.user;
  }
);

export const register = createAsyncThunk(
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

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (form) => {
    const response = await updateUserDataApi(form);
    return response.user;
  }
);
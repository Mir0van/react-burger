import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  currentTab: string;
}

const initialState: TInitialState = {
  currentTab: 'bun',
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload
    }
  }
})

export const {
  setCurrentTab
} = tabsSlice.actions
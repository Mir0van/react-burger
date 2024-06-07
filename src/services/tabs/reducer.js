import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTab: 'bun',
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload
    }
  }
})

export const {
  setCurrentTab
} = tabsSlice.actions
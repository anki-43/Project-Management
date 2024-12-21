import { createSlice } from "@reduxjs/toolkit";

export const mainTabsStore = createSlice({
  name: "tabsStore",
  initialState: {
    tabName: 0,
  },
  reducers: {
    changeActiveTabname: (state, val) => {
      state.tabName = val.payload;
    },
  },
});

export const { changeActiveTabname } = mainTabsStore.actions;

export default mainTabsStore.reducer;

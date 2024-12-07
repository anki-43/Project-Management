import { createSlice } from "@reduxjs/toolkit";

export const mainTabsStore = createSlice({
  name: "tabsStore",
  initialState: {
    tabName: "todoList",
    loggedInUser: {
      username: "",
      email: "",
    },
  },
  reducers: {
    changeActiveTabname: (state, val) => {
      state.tabName = val.payload;
    },
    setLoggedInUser: (state, val) => {
      state.loggedInUser = {
        username: val.payload.username,
        email: val.payload.email,
      };
    },
  },
});

export const { changeActiveTabname, setLoggedInUser } = mainTabsStore.actions;

export default mainTabsStore.reducer;

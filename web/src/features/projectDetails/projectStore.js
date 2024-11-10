import { createSlice } from "@reduxjs/toolkit";

export const projectStore = createSlice({
  name: "projectStore",
  initialState: {
    projectList: [],
    currentProject: {},
    updateMode: false,
  },
  reducers: {
    addToProjectsList: (state, val) => {
      let id = state.projectList.findIndex((el) => el.id === val.payload.id);
      if (id === -1) {
        state.projectList = [...state.projectList, val.payload];
      } else {
        state.projectList[id] = val.payload;
      }
    },
    changeUpdateMode: (state, val) => {
      state.updateMode = val.payload;
    },
    updateCurrentProjectValue: (state, val) => {
      console.log(state.projectList);
      state.currentProject = val.payload;
    },
    deleteProject: (state, id) => {
      state.projectList = state.projectList.filter((el) => {
        return el.id !== id.payload;
      });
    },
    saveProjectList: (state, projectList)=>{
      state.projectList = projectList.payload
    }
  },
});

export const { addToProjectsList, changeUpdateMode, updateCurrentProjectValue, deleteProject, saveProjectList } = projectStore.actions;

export default projectStore.reducer;

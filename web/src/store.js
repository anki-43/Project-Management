import { configureStore } from "@reduxjs/toolkit";
import mainTabsStore from "./features/mainTabs/mainTabsStore";
import projectStore from "./features/projectDetails/projectStore";

export default configureStore({
  reducer: { mainTabsStore, projectStore },
});

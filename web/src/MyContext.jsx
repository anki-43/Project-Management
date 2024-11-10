// MyContext.js
import React, { createContext, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeUpdateMode } from "./features/projectDetails/projectStore";

// Create the context
const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  const [openProjectState, setOpenProjectState] = useState(false);
  const dispatch = useDispatch();

  const handleOpenProject = (newData, updateStatus) => {
    dispatch(changeUpdateMode(updateStatus));
    setOpenProjectState(newData);
  };

  return <MyContext.Provider value={{ openProjectState, handleOpenProject }}>{children}</MyContext.Provider>;
};

// Create a custom hook for easier consumption
export const useMyContext = () => {
  return useContext(MyContext);
};

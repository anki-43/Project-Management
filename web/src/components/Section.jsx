import { useSelector, useDispatch } from "react-redux";
import activity from "./sectionComponents/activity";
import calendar from "./sectionComponents/calendar";
import CommonHeader from "./sectionComponents/commonHeader";
import Box from "@mui/material/Box";
import { useState } from "react";
import CreateProject from "./createProject";
import { useMyContext } from "../MyContext";
import TodoList from "./sectionComponents/TodoList";

function Section() {
  const { openProjectState } = useMyContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: "10", mt: 6, mb: 6 }}>
      <CommonHeader className="headerClass"></CommonHeader>
      {openProjectState ? (
        <CreateProject> </CreateProject>
      ) : (
        <div className="section" style={{ overflowY: "auto" }}>
          <TodoList></TodoList>
        </div>
      )}
    </Box>
  );
}

export default Section;

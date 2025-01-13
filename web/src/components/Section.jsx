import Box from "@mui/material/Box";
import CreateProject from "./createProject";
import { useMyContext } from "../MyContext";
import TodoList from "./sectionComponents/TodoList";

function Section() {
  const { openProjectState } = useMyContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "10",
        marginY: "20px",
      }}
    >
      {openProjectState ? (
        <CreateProject> </CreateProject>
      ) : (
        <div className="section">
          <TodoList></TodoList>
        </div>
      )}
    </Box>
  );
}

export default Section;
